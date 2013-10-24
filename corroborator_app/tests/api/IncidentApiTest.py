from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Incident, CrimeCategory, Location, Actor, \
    ActorRole, Comment, TimeInfo, StatusUpdate, Incident, Label
import datetime
from django.utils.timezone import utc

class IncidentTestCase(ResourceTestCase):
    def setUp(self):
        super(IncidentTestCase, self).setUp()

        now = datetime.datetime.utcnow().replace(tzinfo=utc)
        self.from_datetime = now.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        self.to_datetime = now.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        
        self.location = Location(name_en='test location', loc_type='Village')
        self.location.save()
        
        self.actor = Actor(fullname_en='Test Actor',fullname_ar='Test name ar',nickname_en='nick name',nickname_ar='nick name')
        self.actor.save()
        self.role = ActorRole(role_status='Detained', actor_id=self.actor.pk)
        self.role.save()

        self.statusUpdate = StatusUpdate(status_en='test status')
        self.statusUpdate.save()

        self.crimeCategory = CrimeCategory(name_en='test crime category',
        level=1, description_en='test source incident_details')
        self.crimeCategory.save()
        self.label = Label(name_en='test label')
        self.label.save()
        
        self.comment = Comment(assigned_user_id=self.user.pk, status_id=self.statusUpdate.pk,comments_en='test comment')
        self.comment.save()
        
        self.timeinfo = TimeInfo(confidence_score=1, time_from=self.from_datetime, time_to=self.to_datetime, event_name_en='test event')
        self.timeinfo.save()
        
        fixture = AutoFixture(Incident, generate_m2m={1, 5})
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
            'confidence_score':11,
            'assigned_user': '/api/v1/user/1/',
            'incident_comments': ['/api/v1/comment/1/',],
            'bulletins': [],
            'actors_role': [],
            'crimes': [],
            'labels': [],
            'times': [],
            'locations': [],
            'ref_incidents': [],
            'status': 'Updated',
            'comment': 'Comment',
        }
        url = '/api/v1/incident/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_incident_put(self):
        i = Incident.objects.all()[0]
        url = '/api/v1/incident/{0}/?format=json{1}'.format(i.id, self.auth_string)
        put_data = {
            'title_en': "Test Incident",
            'title_ar': "Test Incident Arabic",
            'incident_details_en': "incident_details en",
            'incident_details_ar': "incident_details Arabic",
            'confidence_score':11,
            'assigned_user': '/api/v1/user/1/',
            'incident_comments': ['/api/v1/comment/1/',],
            'bulletins': [],
            'actors_role': [],
            'crimes': [],
            'labels': [],
            'times': [],
            'locations': [],
            'ref_incidents': [],
            'status': 'Updated',
            'comment': 'Comment',
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        
    def test_incident_patch_update(self):
        url = '/api/v1/incident/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'id': '1',
                    'resource_uri': '/api/v1/incident/1/',
                    'title_en': "Test Incident",
                    'title_ar': "Test Incident Arabic",
                    'incident_details_en': "incident_details en",
                    'incident_details_ar': "incident_details Arabic",
                    'confidence_score':11,
                    'assigned_user': '/api/v1/user/1/',
                    'incident_comments': ['/api/v1/comment/1/',],
                    'bulletins': [],
                    'actors_role': [],
                    'crimes': [],
                    'labels': [],
                    'times': [],
                    'locations': [],
                    'ref_incidents': [],
                    'status': 'Updated',
                    'comment': 'Comment',
                },
                {
                    'id': '2',
                    'resource_uri': '/api/v1/incident/2/',
                    'title_en': "Test Incident",
                    'title_ar': "Test Incident Arabic",
                    'incident_details_en': "incident_details en",
                    'incident_details_ar': "incident_details Arabic",
                    'confidence_score':11,
                    'incident_comments': ['/api/v1/comment/1/',],
                    'bulletins': [],
                    'actors_role': [],
                    'crimes': [],
                    'labels': [],
                    'times': [],
                    'locations': [],
                    'ref_incidents': [],
                    'status': 'Updated',
                    'comment': 'Comment',
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
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
                    'confidence_score':11,
                    'assigned_user': '/api/v1/user/1/',
                    'incident_comments': ['/api/v1/comment/1/',],
                    'bulletins': [],
                    'actors_role': [],
                    'crimes': [],
                    'labels': [],
                    'times': [],
                    'locations': [],
                    'ref_incidents': [],
                    'status': 'Updated',
                    'comment': 'Comment',
                },
                {
                    'title_en': "Test Incident",
                    'title_ar': "Test Incident Arabic",
                    'incident_details_en': "incident_details en",
                    'incident_details_ar': "incident_details Arabic",
                    'confidence_score':11,
                    'incident_comments': ['/api/v1/comment/1/',],
                    'bulletins': [],
                    'actors_role': [],
                    'crimes': [],
                    'labels': [],
                    'times': [],
                    'locations': [],
                    'ref_incidents': [],
                    'status': 'Updated',
                    'comment': 'Comment',
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        
