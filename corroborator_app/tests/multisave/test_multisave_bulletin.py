"""
Author: Cormac McGuire
Created: 09/10/2013
Test the multisave bulletin functionality
"""

import json

from django.test import TestCase, Client

from autofixture import AutoFixture

from corroborator_app.tests.test_utilities import TestUserUtility
from corroborator_app.models import Bulletin, Location, ActorRole


class MultiSaveBulletinTestCase(TestCase):
    '''
    verify that multiple bulletin updates are happening correctly
    '''
    fixtures = ['test_data_role.json', 'status_update', ]

    def setUp(self):
        '''
        initialisation for tests
        '''
        bulletin_fixture = AutoFixture(Bulletin)
        bulletin_fixture.create(5)
        bull = Bulletin.objects.get(id=1)
        bull.actors_role.clear()
        bull.save()
        location_fixture = AutoFixture(Location)
        location_fixture.create(1)
        self.test_user_util = TestUserUtility()
        self.user = self.test_user_util.user

    def tearDown(self):
        '''
        initialisation for tests
        '''
        Bulletin.objects.all().delete()
        Location.objects.all().delete()
        ActorRole.objects.all().delete()

    def test_bulletins_updated(self):
        '''
        basic test to ensure that end to end functionality is in place
        '''
        client = Client()
        client.login(username='user', password='password')
        post_data = create_bulletin_data()
        response = client.post(
            '/corroborator/bulletin/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        post_data = create_bulletin_data(empty_data=True)
        response = client.post(
            '/corroborator/bulletin/0/multisave/',
            post_data,
            content_type='application/json'
        )
        response_data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response_data[0]['most_recent_status_bulletin'], u'Updated')

    def test_statusless_update_fails(self):
        client = Client()
        post_data = create_bulletin_data(version_info=False)
        response = client.post(
            '/corroborator/bulletin/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 403)


def create_bulletin_data(empty_data=False, version_info=True):
    '''
    test data for bulletin creation
    '''
    bulletin_data = {
        "assigned_user": "",
        "bulletins": [
            "/api/v1/bulletin/1/",
            "/api/v1/bulletin/2/"
        ],
        "labels": [],
        "locations": [],
        "ref_bulletins": ["/api/v1/bulletin/3/"],
        "actors_role": ["/api/v1/actorRole/2/"],
        "sources": [],
        "username": "cormac",
        "comment": "comment",
        "status_uri": "/api/v1/status/3/"
    }
    if empty_data is True:
        bulletin_data['ref_bulletins'] = []
        bulletin_data['relatedActors'] = []

    if version_info is False:
        bulletin_data['status_uri'] = ""
        bulletin_data['comment'] = ""

    return json.dumps(bulletin_data)
