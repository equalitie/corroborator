from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Incident, Location, Actor, ActorRole, Comment, TimeInfo, StatusUpdate, Incident, Label, Source, SourceType
import datetime

class IncidentTestCase(ResourceTestCase):
    def setUp(self):
        super(IncidentTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        
        self.location = Location(name_en='test location', loc_type='Village')
        self.location.save()
        
        self.actor = Actor(title_en='test actor', incident_details_en='test incident_details')
        self.actor.save()
        self.role = ActorRole(role_status='Detained', actor=self.actor.pk)
        self.role.save()

        self.statusUpdate = StatusUpdate(status_en='test status')
        self.statusUpdate.save()

        self.crimeCategory = CrimeCategory(crime_category_en='test crime category', level=1, incident_details_en='test source incident_details')
        self.crimeCategory.save()
        self.label = Label(name_en='test label')
        self.label.save()
        
        self.comment = Comment(assigned_user_id=self.user.pk, status_id=self.statusUpdate.pk,comments_en='test comment')
        self.comment.save()
        
        self.timeinfo = TimeInfo(time_from=datetime.now(), time_to=datetime.now(),event_name_en='test event')
        self.timeinfo.save()
        
        self.media = Media(media_type='Video', name_en='test media',media_file='')
        self.media.save()
        
        fixture = AutoFixture(incident)
        incidents = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        Incident.objects.all().delete()
        Actor.objects.all().delete()
        ActorRole.objects.all().delete()
        Location.objects.all().delete()
        TimeInfo.objects.all().delete()
        Media.objects.all().delete()
        Comment.objects.all().delete()
        StatusUpdate.objects.all().delete()
        CrimeCategory.objects.all().delete()
    def test_incident_get(self):
        url = '/api/v1/incident/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/incident/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_incident_post(self):
        post_data = {
            'title_en': "Test Incident",
            'incident_details_ar': "incident_details Arabic",
        }
        url = '/api/v1/incident/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_incident_put(self):
        url = '/api/v1/incident/1/?format=json{}'.format(self.auth_string)
        put_data = {
            'title_en': "Test Incident",
            'title_ar': "Test Incident Arabic",
            'incident_details_en': "incident_details en",
            'incident_details_ar': "incident_details Arabic",
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        
    def test_incident_patch(self):
        url = '/api/v1/incident/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'title_en': "Test Incident",
                    'title_ar': "Test Incident Arabic",
                    'incident_details_en': "incident_details en",
                    'incident_details_ar': "incident_details Arabic",
                },
                {
                    'title_en': "Test Incident",
                    'title_ar': "Test Incident Arabic",
                    'incident_details_en': "incident_details en",
                    'incident_details_ar': "incident_details Arabic",
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        
