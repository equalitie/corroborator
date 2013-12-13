from tastypie.models import ApiKey
from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Actor
import json


class ActorTestCase(ResourceTestCase):
    def setUp(self):
        super(ActorTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(Actor)
        fixture.create(10)
        self.actor = Actor(
            fullname_en='Test Actor',
            fullname_ar='Test name ar',
            nickname_en='nick name',
            nickname_ar='nick name'
        )
        self.actor.save()

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        Actor.objects.all().delete()

    def test_actor_get(self):
        url = '/api/v1/actor/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/actor/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_actor_post(self):
        post_data = {
            'fullname_en': "Test Actor",
            'fullname_ar': "Test Actor Arabic",
            'nickname_en': "Nickname en",
            'nickname_ar': "Nickname Arabic",
            'status': 'Updated',
            'comment': 'Updated',
            'status_uri': '/api/v1/statusUpdate/1/'
        }
        url = '/api/v1/actor/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)
        # test that a comment get added
        new_actor_dict = json.loads(response.content)
        new_actor = Actor(id=new_actor_dict['id'])
        actor_comments = new_actor.actor_comments.all()
        self.assertEqual(len(actor_comments), 1)

    def test_actor_put(self):
        post_data = {
            'assigned_user': '/api/v1/user/1/',
            'comments_en': "Test Comment",
            'comments_ar': "Test Comment Arabic",
        }
        url = '/api/v1/comment/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        
        comment_uri = json.loads(response.content)['resource_uri']

        precreated_actor = Actor.objects.all()[0]
        url = '/api/v1/actor/{0}/?format=json{1}'.format(
            precreated_actor.id, self.auth_string)
        put_data = {
            'fullname_en': "Test Actor",
            'fullname_ar': "Test Actor Arabic",
            'nickname_en': "Nickname en",
            'nickname_ar': "Nickname Arabic",
            'status': 'Updated',
            'comment': 'Updated',
            'status_uri': '/api/v1/statusUpdate/1/',
            'actor_comments': [
                comment_uri
            ]
        }
        response = self.api_client.put(url, data=put_data)
        content = json.loads(response.content)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(len(content['actor_comments']), 2)

        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_actor_patch(self):
        url = '/api/v1/actor/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'fullname_en': "Test Actor",
                    'fullname_ar': "Test Actor Arabic",
                    'nickname_en': "Nickname en",
                    'nickname_ar': "Nickname Arabic",
                    'status': 'Updated',
                    'comment': 'Updated',
                    'status_uri': '/api/v1/statusUpdate/1/'
                },
                {
                    'fullname_en': "Test Actor",
                    'fullname_ar': "Test Actor Arabic",
                    'nickname_en': "Nickname en",
                    'nickname_ar': "Nickname Arabic",
                    'status': 'Updated',
                    'comment': 'Updated',
                    'status_uri': '/api/v1/statusUpdate/1/'
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
