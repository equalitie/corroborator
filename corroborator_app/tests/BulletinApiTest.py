from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Bulletin, Media, Location, \
    Actor, ActorRole, Comment, TimeInfo, StatusUpdate, Incident, Label, \
    Source, SourceType
#import datetime
#from django.utils.timezone import utc

class BulletinTestCase(ResourceTestCase):
    def setUp(self):
        super(BulletinTestCase, self).setUp()
        #now = datetime.datetime.utcnow().replace(tzinfo=utc)
        #self.from_datetime = now.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        #self.to_datetime = now.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        
        self.location = Location(name_en='test location', loc_type='Village')
        self.location.save()
        
        self.actor = Actor(
            fullname_en='Test Actor',
            fullname_ar='Test name ar',
            nickname_en='nick name',
            nickname_ar='nick name'
        )
        self.actor.save()
        self.role = ActorRole(role_status='Detained', actor_id=self.actor.pk)
        self.role.save()

        self.statusUpdate = StatusUpdate(status_en='test status')
        self.statusUpdate.save()

        self.sourceType = SourceType(
            source_type='test source type',
            description='test source description'
        )

        self.sourceType.save()
        self.source = Source(
            reliability_score=0,
            name_en='test source',
            source_type_id=self.sourceType.pk
        )

        self.source.save()
        self.source = Source(
            reliability_score=0,
            name_en='test source 2',
            source_type_id=self.sourceType.pk
        )

        self.source.save()
        self.label = Label(name_en='test label')
        self.label.save()
        
        self.comment = Comment(
            assigned_user_id=self.user.pk,
            status_id=self.statusUpdate.pk,
            comments_en='test comment'
        )
        self.comment.save()
        
        #self.timeinfo = TimeInfo(
            #confidence_score=1,
            #time_from=self.from_datetime,
            #time_to=self.to_datetime,
            #event_name_en='test event'
        #)
        #self.timeinfo.save()
        
        self.media = Media(
            media_type='Video',
            name_en='test media',
            media_file=''
        )
        self.media.save()
        
        fixture = AutoFixture(Bulletin, generate_m2m={1, 5})
        bulletins = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        Actor.objects.all().delete()
        ActorRole.objects.all().delete()
        Location.objects.all().delete()
        TimeInfo.objects.all().delete()
        Media.objects.all().delete()
        Comment.objects.all().delete()
        StatusUpdate.objects.all().delete()
        Bulletin.objects.all().delete()

    def test_bulletin_get(self):
        url = '/api/v1/bulletin/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/bulletin/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_bulletin_mass_update(self):
        b = Bulletin.objects.all()[0]
        url = '/corroborator/bulletin/0/multisave/?format=json{1}'\
              .format(b.id, self.auth_string)
        put_data = {
            'bulletins':['/api/v1/bulletin/1/','/api/v1/bulletin/2/',],
            'username': 'user',
            'confidence_score':11,
            'assigned_user': '/api/v1/user/1/',
            'actorsRoles':[{'actor':'/api/v1/actor/1/','role_en':'Killed','role_status':'K',},],
            'sources': ['/api/v1/source/1/',],
            'labels': ['/api/v1/label/1/',],
            'locations': ['/api/v1/location/1/',],
            'ref_bulletins': ['/api/v1/bulletin/1/',],
            'ref_incidents': ['/api/v1/incident/1/',],
            'locations': ['/api/v1/location/1/',],
        }

        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 200)


    def test_bulletin_post(self):
        post_data = {
            'title_en': "Test Bulletin",
            'description_ar': "description Arabic",
            'confidence_score': 73,
            'sources': ['/api/v1/source/1/',],
            'bulletin_comments': ['/api/v1/comment/1/',],
            'assigned_user': '/api/v1/user/1/',
            'actors_role': [],
            'times': [],
            'medias': [],
            'locations': [],
            'labels': [],
            'ref_bulletins': [],
            'status': 'Updated',
            'comment': 'Updated',
        }
        url = '/api/v1/bulletin/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_bulletin_put(self):
        b = Bulletin.objects.all()[0]
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            b.id,
            self.auth_string
        )
        put_data = {
            'title_en': "Test Bulletin",
            'title_ar': "Test Bulletin Arabic",
            'description_en': "description en",
            'description_ar': "description Arabic",
            'confidence_score': 73,
            'sources': ['/api/v1/source/1/',],
            'bulletin_comments': ['/api/v1/comment/1/',],
            'assigned_user': '/api/v1/user/1/',
            'actors_role': [],
            'times': [],
            'medias': [],
            'locations': [],
            'labels': [],
            'ref_bulletins': [],
            'status': 'Updated',
            'comment': 'Updated',
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        
    def test_bulletin_patch_update(self):
        
        url = '/api/v1/bulletin/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'id': '1',
                    'resource_uri': '/api/v1/bulletin/1/',
                    'title_en': "Test Bulletin",
                    'title_ar': "Test Bulletin Arabic",
                    'description_en': "description en",
                    'description_ar': "description Arabic",
                    'confidence_score': 73,
                    #'sources': [],
                    'bulletin_comments': ['/api/v1/comment/1/',],
                    'assigned_user': '/api/v1/user/1/',
                    'actors_role': [],
                    #'times': [],
                    'medias': [],
                    'locations': [],
                    'labels': [],
                    'ref_bulletins': [],
                    'status': 'Updated',
                    'comment': 'Updated',
                },
                {
                    'id': '2',
                    'resource_uri': '/api/v1/bulletin/2/',
                    'title_en': "Test Bulletin",
                    'title_ar': "Test Bulletin Arabic",
                    'description_en': "description en",
                    'description_ar': "description Arabic",
                    'confidence_score': 73,
                    #'sources': ['/api/v1/source/1/',],
                    'bulletin_comments': ['/api/v1/comment/1/',],
                    'assigned_user': '/api/v1/user/1/',
                    'actors_role': [],
                    'times': [],
                    'medias': [],
                    'locations': [],
                    'labels': [],
                    'ref_bulletins': [],
                    'status': 'Updated',
                    'comment': 'Updated',
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
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
                    'confidence_score': 73,
                    #'sources': [],
                    'bulletin_comments': ['/api/v1/comment/1/',],
                    'assigned_user': '/api/v1/user/1/',
                    'actors_role': [],
                    #'times': [],
                    'medias': [],
                    'locations': [],
                    'labels': [],
                    'ref_bulletins': [],
                    'status': 'Updated',
                    'comment': 'Updated',
                },
                {
                    'title_en': "Test Bulletin",
                    'title_ar': "Test Bulletin Arabic",
                    'description_en': "description en",
                    'description_ar': "description Arabic",
                    'confidence_score': 73,
                    #'sources': ['/api/v1/source/1/',],
                    'bulletin_comments': ['/api/v1/comment/1/',],
                    'assigned_user': '/api/v1/user/1/',
                    'actors_role': [],
                    'times': [],
                    'medias': [],
                    'locations': [],
                    'labels': [],
                    'ref_bulletins': [],
                    'status': 'Updated',
                    'comment': 'Updated',
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        
