from tastypie.models import ApiKey
from django.contrib.auth.models import User
from django.test.client import Client
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Comment

class CommentTestCase(ResourceTestCase):
    def setUp(self):
        super(CommentTestCase, self).setUp()
        self.statusUpdate = StatusUpdate(status_en="Test Status", description_en="Test description")
        self.status.save()
        self.user = User(username='user', password='password', email='1@2.com')
        self.user.save()
        fixture = AutoFixture(comment)
        comments = fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        Comment.objects.all().delete()

    def test_comment_get(self):
        url = '/api/v1/comment/?format=json{}'.format(self.auth_string)
        response = self.api_client.get(url)
        self.assertEqual(response.statusUpdate_code, 200)
        unauth_url = '/api/v1/comment/?format=json'
        response = self.api_client.get(unauth_url)
        self.assertEqual(response.statusUpdate_code, 401)

    def test_comment_post(self):
        post_data = {
            'assigned_user': "/api/v1/user/{0}/".format(self.user.pk),
            'statusUpdate': "/api/v1/statusUpdate/{0}/".format(self.statusUpdate.pk),
            'comments_en': "Test comment",
            'comments_ar': "Test comment",
        }
        url = '/api/v1/comment/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.statusUpdate_code, 201)

    def test_comment_put(self):
        url = '/api/v1/comment/1/?format=json{}'.format(self.auth_string)
        put_data = {
            'assigned_user': "/api/v1/user/{0}/".format(self.user.pk),
            'statusUpdate': "/api/v1/statusUpdate/{0}/".format(self.statusUpdate.pk),
            'comments_en': "Test comment",
            'comments_ar': "Test comment",
        }
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.statusUpdate_code, 202)
        
    def test_comment_patch(self):
        url = '/api/v1/comment/?format=json{}'.format(self.auth_string)
        patch_data = {
            'objects': [
                {
                    'assigned_user': "/api/v1/user/{0}/".format(self.user.pk),
                    'statusUpdate': "/api/v1/statusUpdate/{0}/".format(self.statusUpdate.pk),
                    'comments_en': "Test comment",
                    'comments_ar': "Test comment",
                },
                {
                    'assigned_user': "/api/v1/user/{0}/".format(self.user.pk),
                    'statusUpdate': "/api/v1/statusUpdate/{0}/".format(self.statusUpdate.pk),
                    'comments_en': "Test comment",
                    'comments_ar': "Test comment",
                }
            ]
        }
        response = self.api_client.patch(url, data=patch_data)
        self.assertEqual(response.statusUpdate_code, 202)
        
