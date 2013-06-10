from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Media

class MediaTestCase(ResourceTestCase):
    def setUp(self):
        super(MediaTestCase, self).setUp()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(media)
        medias = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        Media.objects.all().delete()

    def test_media_get(self):
        url = '/api/v1/media/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.status_code, 200)
        unauth_url = '/api/v1/media/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.status_code, 401)

    def test_media_post(self):
        post_data = {
            'fullname_en': "Test Media",
            'fullname_ar': "Test Media Arabic",
            'nickname_en': "Nickname en",
            'nickname_ar': "Nickname Arabic",
        }
        url = '/api/v1/media/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)

    def test_media_put(self):
        url = '/api/v1/media/1/?format=json{}'.format(self.auth_string)
        put_data = {
            'fullname_en': "Test Media",
            'fullname_ar': "Test Media Arabic",
            'nickname_en': "Nickname en",
            'nickname_ar': "Nickname Arabic",
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        
    def test_media_patch(self):
        url = '/api/v1/media/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'fullname_en': "Test Media",
                    'fullname_ar': "Test Media Arabic",
                    'nickname_en': "Nickname en",
                    'nickname_ar': "Nickname Arabic",
                },
                {
                    'fullname_en': "Test Media",
                    'fullname_ar': "Test Media Arabic",
                    'nickname_en': "Nickname en",
                    'nickname_ar': "Nickname Arabic",
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.status_code, 202)
        
