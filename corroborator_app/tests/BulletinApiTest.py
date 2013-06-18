from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Bulletin, Location, Actor, ActorRole, Comment, TimeInfo, StatusUpdate, Incident, Label, Source, SourceType
import datetime

class BulletinTestCase(ResourceTestCase):
    def setUp(self):
        super(BulletinTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        
        self.location = Location(name_en='test location', loc_type='Village')
        self.location.save()
        
        self.actor = Actor(title_en='test actor', description_en='test description')
        self.actor.save()
        self.role = ActorRole(role_status='Detained', actor=self.actor.pk)
        self.role.save()

        self.statusUpdate = StatusUpdate(status_en='test status')
        self.statusUpdate.save()

        self.sourceType = SourceType(source_type='test source type', description='test source description')
        self.sourceType.save()
        self.source = Source(name_en='test source', source_type=self.sourceType.pk)
        self.source.save()
        self.label = Label(name_en='test label')
        self.label.save()
        
        self.comment = Comment(assigned_user_id=self.user.pk, status_id=self.statusUpdate.pk,comments_en='test comment')
        self.comment.save()
        
        self.timeinfo = TimeInfo(time_from=datetime.now(), time_to=datetime.now(),event_name_en='test event')
        self.timeinfo.save()
        
        self.media = Media(media_type='Video', name_en='test media',media_file='')
        self.media.save()
        
        fixture = AutoFixture(bulletin)
        bulletins = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        Bulletin.objects.all().delete()
        Actor.objects.all().delete()
        ActorRole.objects.all().delete()
        Location.objects.all().delete()
        TimeInfo.objects.all().delete()
        Media.objects.all().delete()
        Comment.objects.all().delete()
        StatusUpdate.objects.all().delete()
        CrimeCategory.objects.all().delete()
    def test_bulletin_get(self):
        url = '/api/v1/bulletin/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/bulletin/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_bulletin_post(self):
        post_data = {
            'title_en': "Test Bulletin",
            'description_ar': "description Arabic",
        }
        url = '/api/v1/bulletin/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_bulletin_put(self):
        url = '/api/v1/bulletin/1/?format=json{}'.format(self.auth_string)
        put_data = {
            'title_en': "Test Bulletin",
            'title_ar': "Test Bulletin Arabic",
            'description_en': "description en",
            'description_ar': "description Arabic",
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        
    def test_bulletin_patch(self):
        url = '/api/v1/bulletin/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'title_en': "Test Bulletin",
                    'title_ar': "Test Bulletin Arabic",
                    'description_en': "description en",
                    'description_ar': "description Arabic",
                },
                {
                    'title_en': "Test Bulletin",
                    'title_ar': "Test Bulletin Arabic",
                    'description_en': "description en",
                    'description_ar': "description Arabic",
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        