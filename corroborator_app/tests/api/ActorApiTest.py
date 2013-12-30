from tastypie.models import ApiKey
from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture

from corroborator_app.models import Actor, Comment
from corroborator_app.tests.test_utilities import TestUserUtility, id_from_uri
import json


class ActorTestCase(ResourceTestCase):
    '''
    test the actor tastypie api
    '''
    fixtures = ['test_data_role.json', 'status_update', ]

    def setUp(self):
        super(ActorTestCase, self).setUp()
        self.test_user_util = TestUserUtility()
        self.user = self.test_user_util.user
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
        User.objects.all().delete()

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
            'comment': 'created'
        }
        url = '/api/v1/actor/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)
        # test that a comment get added
        new_actor_dict = json.loads(response.content)
        new_actor = Actor(id=new_actor_dict['id'])
        actor_comments = new_actor.actor_comments.all()
        self.assertEqual(len(actor_comments), 1)
        self.assertEqual(actor_comments[0].status.status_en, 'Human Created')

    def test_actor_put(self):
        '''
        create and actor and attach a comment to it, then send a put to create
        a new one. check that the comment get's appended and that for
        data-analyst users it can only be updated
        '''

        self.test_user_util.add_user_to_group('data-analyst')
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
        actor_comments = [comment_uri, ]
        put_data = create_put_data(1, actor_comments)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Updated')

    def test_senior_data_analyst_put(self):
        self.test_user_util.add_user_to_group('senior-data-analyst')
        precreated_actor = Actor.objects.all()[0]
        url = '/api/v1/actor/{0}/?format=json{1}'.format(
            precreated_actor.id, self.auth_string)

        put_data = create_put_data(4)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Reviewed')

    def test_chief_data_analyst_put(self):
        self.test_user_util.add_user_to_group('chief-data-analyst')
        precreated_actor = Actor.objects.all()[0]
        url = '/api/v1/actor/{0}/?format=json{1}'.format(
            precreated_actor.id, self.auth_string)

        put_data = create_put_data(5)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Finalized')

    def test_finalized_is_not_updated(self):
        precreated_actor = Actor.objects.all()[0]
        comment = Comment(
            assigned_user_id=1,
            comments_en='comment',
            status_id=5
        )
        comment.save()
        precreated_actor.actor_comments.add(comment)
        url = '/api/v1/actor/{0}/?format=json{1}'.format(
            precreated_actor.id, self.auth_string)

        put_data = create_put_data(4)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 403)


def create_put_data(status_id, actor_comments=[]):
    return {
        'fullname_en': "Test Actor",
        'fullname_ar': "Test Actor Arabic",
        'nickname_en': "Nickname en",
        'nickname_ar': "Nickname Arabic",
        'comment': 'Review',
        'status_uri': '/api/v1/statusUpdate/' + str(status_id) + '/',
        'actor_comments': actor_comments
    }


def retrieve_last_comment_status(response):
    content = json.loads(response.content)
    len_comments = len(content['actor_comments'])
    return Comment.objects.get(
        id=id_from_uri(content['actor_comments'][len_comments - 1])
    ).status.status_en
