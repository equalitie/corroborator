from tastypie.models import ApiKey
from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from autofixture import AutoFixture
from corroborator_app.models import Bulletin, Media, Location, \
    Actor, ActorRole, Comment, TimeInfo, StatusUpdate, Label, \
    Source, SourceType
import json
from corroborator_app.tests.test_utilities import TestUserUtility, id_from_uri
#from django.utils.timezone import utc


class BulletinTestCase(ResourceTestCase):

    fixtures = ['status_update', ]

    def setUp(self):
        super(BulletinTestCase, self).setUp()
        self.test_user_util = TestUserUtility()
        self.user = self.test_user_util.user
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
            status_id=3,
            comments_en='test comment'
        )
        self.comment.save()

        self.media = Media(
            media_type='Video',
            name_en='test media',
            media_file=''
        )
        self.media.save()

        fixture = AutoFixture(Bulletin, generate_m2m={1, 5})
        fixture.create(10)

        try:
            self.api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            self.api_key = ApiKey.objects.create(user=self.user)
        self.auth_string = '&username={0}&api_key={1}'.format(
            self.user.username, self.api_key.key)

    def tearDown(self):
        User.objects.all().delete()
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

    def test_bulletin_post(self):
        post_data = {
            'title_en': "Test Bulletin",
            'description_ar': "description Arabic",
            'confidence_score': 73,
            'sources': ['/api/v1/source/1/', ],
            'bulletin_imported_comments': ['/api/v1/comment/1/', ],
            'assigned_user': '/api/v1/user/1/',
            'actors_role': [],
            'times': [],
            'medias': [],
            'locations': [],
            'labels': [],
            'ref_bulletins': [],
            'comment': 'new bulletin',
        }
        url = '/api/v1/bulletin/?format=json{}'.format(self.auth_string)
        response = self.api_client.post(url, data=post_data)
        self.assertEqual(response.status_code, 201)
        new_bulletin_dict = json.loads(response.content)
        new_bulletin = Bulletin(id=new_bulletin_dict['id'])
        bulletin_comments = new_bulletin.bulletin_comments.all()
        self.assertEqual(len(bulletin_comments), 1)

    def test_bulletin_put(self):
        b = Bulletin.objects.all()[0]
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            b.id,
            self.auth_string
        )
        put_data = create_put_data(5)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Updated')

    def test_senior_data_analyst_put(self):
        self.test_user_util.add_user_to_group('senior-data-analyst')
        b = Bulletin.objects.all()[0]
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            b.id,
            self.auth_string
        )
        put_data = create_put_data(4)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Reviewed')

    def test_chief_data_analyst_put(self):
        self.test_user_util.add_user_to_group('chief-data-analyst')
        b = Bulletin.objects.all()[0]
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            b.id,
            self.auth_string
        )
        put_data = create_put_data(5)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Finalized')

    def test_finalized_is_not_updated(self):
        precreated_bulletin = Bulletin.objects.all()[0]
        comment = Comment(
            assigned_user_id=1,
            comments_en='comment',
            status_id=5
        )
        comment.save()
        precreated_bulletin.bulletin_comments.add(comment)
        url = '/api/v1/bulletin/{0}/?format=json{1}'.format(
            precreated_bulletin.id, self.auth_string)

        put_data = create_put_data(4)
        response = self.api_client.put(url, data=put_data)
        self.assertEqual(response.status_code, 202)
        self.assertEqual(retrieve_last_comment_status(response), 'Finalized')


def create_put_data(status_id, bulletin_comments=[]):
    return {
        'title_en': "Test Bulletin",
        'title_ar': "Test Bulletin Arabic",
        'description_en': "description en",
        'description_ar': "description Arabic",
        'confidence_score': 73,
        'sources': ['/api/v1/source/1/', ],
        'bulletin_comments': ['/api/v1/comment/1/', ],
        'assigned_user': '/api/v1/user/1/',
        'actors_role': [],
        'times': [],
        'medias': [],
        'locations': [],
        'labels': [],
        'ref_bulletins': [],
        'comment': 'comment',
        'status_uri': '/api/v1/statusUpdate/' + str(status_id) + '/'
    }


def retrieve_last_comment_status(response):
    content = json.loads(response.content)
    len_comments = len(content['bulletin_comments'])
    return Comment.objects.get(
        id=id_from_uri(content['bulletin_comments'][len_comments - 1])
    ).status.status_en
