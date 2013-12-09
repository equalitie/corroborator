"""
Tests for the multisave of actors
Author: Cormac McGuire
03/10/2013
"""
#import ipdb

from django.test import TestCase, Client
from django.http import HttpRequest

from autofixture import AutoFixture

from corroborator_app.multisave import multi_save_actors, extract_ids, \
    update_entities, process_actor_data
from corroborator_app.models import Actor, Location, ActorRole
from corroborator_app.tests.test_utilities import TestUserUtility
import json


class MultiSaveActorTestCase(TestCase):
    '''
    test the updating of multiple actors
    '''
    fixtures = ['test_data_role.json', 'status_update', ]

    def setUp(self):
        '''
        initialisation for tests
        '''
        location_fixture = AutoFixture(Location)
        location_fixture.create(1)
        self.test_user_util = TestUserUtility()
        self.user = self.test_user_util.user

    def tearDown(self):
        '''
        cleanup for tests
        '''
        Actor.objects.all().delete()
        Location.objects.all().delete()
        ActorRole.objects.all().delete()

    def test_actors_updated(self):
        '''
        broad test to verify that actors are getting updated
        '''
        client = Client()
        post_data = create_actor_data()
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        post_data = create_actor_data(empty_data=True)
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_extract_ids(self):
        '''
        test that actor ids are returned correctly
        TODO: move to common test suite
        '''
        json_dict = json.loads(create_actor_data())
        actor_ids = extract_ids(json_dict, 'actors')
        self.assertEqual(actor_ids, ['1', '2', ])

    def test_actor_update_from_query_dict(self):
        '''
        test that the actor gets updated correctly from the query dict
        passed in the request
        '''
        json_dict = json.loads(create_actor_data())
        json_dict = process_actor_data(json_dict)
        actor_ids = extract_ids(json_dict, 'actors')
        actor = Actor.objects.get(id=1)
        actor.position_en = u'position'
        actor.save()
        actor_objects = Actor.objects.filter(
            id__in=actor_ids
        )
        update_entities(json_dict, actor_objects, [])
        actor_1 = Actor.objects.get(id=1)
        actor_2 = Actor.objects.get(id=2)
        self.assertEqual(actor_1.occupation_en, 'Farmer')
        self.assertEqual(actor_1.position_en, 'position')
        self.assertEqual(actor_1.current_location.id, 1)
        self.assertEqual(actor_2.occupation_en, 'Farmer')

    def test_actor_role_update(self):
        '''
        test that actor roles are getting updated correctly
        '''
        json_dict = json.loads(create_actor_data())
        request = HttpRequest()
        multi_save_actors(request, json_dict, self.user.username)

        actor_1 = Actor.objects.get(id=1)
        actor_2 = Actor.objects.get(id=2)
        actor_role_1 = actor_1.actors_role.all()[0]
        self.assertEqual(actor_role_1.role_status, 'T')
        self.assertEqual(len(actor_2.actors_role.all()), 1)

    def test_version_update(self):
        '''
        test that the version get's updated for all actors
        and fails if not present
        '''
        client = Client()
        post_data = create_actor_data(version_info=False)
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 403)
        post_data = create_actor_data()
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_content_returned(self):
        '''
        test that we are returning the correct content
        '''
        client = Client()
        post_data = create_actor_data()
        response = client.post(
            '/corroborator/actor/0/multisave/',
            post_data,
            content_type='application/json'
        )
        response_data = json.loads(response.content)
        self.assertEqual(response_data[0]['occupation_en'], u'Farmer')
        self.assertEqual(response.status_code, 200)


def actor_query_string(version_info=True):
    '''
    create a query string to mimic request from a client
    '''
    query = "actors=/api/v1/actor/1/&actors=/api/v1/actor/2/&sex_en=Male&" +\
        "age_en=&civilian_en=&current_location=/api/v1/location/1/&" +\
        "occupation_en=Farmer&occupation_ar=&position_en=&position_ar=&" +\
        "ethnicity_en=&ethnicity_ar=&nationality_en=&nationality_ar=&" +\
        "religion_en=&religion_ar=&spoken_dialect_en=&spoken_dialect_ar=&" +\
        "actors_role=/api/v1/actorRole/1/&sex_ar=&age_ar=&civilian_ar=&"
    if version_info is True:
        query += "username=admin""&comment=updated" +\
            "&status=/api/v1/statusUpdate/3/"
    else:
        query += "username=admin""&comment=" +\
            "&status="

    return query


def create_actor_data(empty_data=False, version_info=True):
    location_id = Location.objects.all()[0].id
    '''
    test data for the actor
    '''
    actor_data = {
        "actors": ["/api/v1/actor/1/", "/api/v1/actor/2/"],
        "sex_en": "Male",
        "age_en": "",
        "civilian_en": "",
        "current_location": "/api/v1/location/" + str(location_id) + "/",
        "occupation_en": "Farmer",
        "occupation_ar": "",
        "position_en": "",
        "position_ar": "",
        "ethnicity_en": "",
        "ethnicity_ar": "",
        "nationality_en": "",
        "nationality_ar": "",
        "religion_en": "",
        "religion_ar": "",
        "spoken_dialect_en": "",
        "spoken_dialect_ar": "",
        "actors_role": ["/api/v1/actorRole/1/"],
        "sex_ar": "",
        "age_ar": "",
        "civilian_ar": "",
        "username": "admin",
    }
    if version_info:
        actor_data.update({
            "status": "Updated",
            "status_uri": "/api/v1/status/3/",
            "comment": "comment"
        })
    else:
        actor_data.update({
            "status": "",
            "comment": ""
        })

    if empty_data is True:
        actor_data.pop('actors_role')
        actor_data['current_location'] = ""

    return json.dumps(actor_data)
