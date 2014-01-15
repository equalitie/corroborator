import json
from django.test import TestCase
from django.contrib.auth.models import User
from corroborator_app.tests.test_utilities import TestUserUtility
from corroborator_app.reporting.user_reporting import UserReportingApi
from corroborator_app.models import (
    UserLog,
    VersionStatus,
)
from autofixture import AutoFixture

from corroborator_app.tests.user_log_utilities import(
    generate_start_end_times
)


class ReportingTestCase(TestCase):
    '''
    Test the reporting view and it's supporting json ajax views
    '''
    fixtures = ['bulletin', ]

    def setUp(self):
        self.test_util = TestUserUtility()
        fixture = AutoFixture(VersionStatus, generate_fk=True)
        fixture.create(10)
        #fixture = AutoFixture(UserLog, generate_fk=True)
        #fixture.create(10)
        fixture = AutoFixture(User)
        fixture.create(1)

    def tearDown(self):
        User.objects.all().delete()
        UserLog.objects.all().delete()

    def test_reporting_page_loads(self):
        '''
        does the reporting view displays correctly
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        client = self.test_util.client_login()
        response = client.get('/corroborator/reporting/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'reporting.html')

    def test_unauthorized_access_prevented(self):
        '''
        ensure unauthorized groups return a 404
        '''
        self.test_util.add_user_to_group([
            'data-entry',
            'data-analyst'
        ])
        client = self.test_util.client_login()
        response = client.get('/corroborator/reporting/')
        self.assertEqual(response.status_code, 404)

    #####################################################################
    # i took the liberty of DRYing up the tests
    #####################################################################
    def test_graphs_respond(self):
        '''
        check the graph views respond with a 200
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()
        graph_codes = [
            'user_login_time', 'user_average_updates', 'user_created_items',
            'user_edited_items', 'user_edited_items',
            'user_deleted_edited_created',
        ]
        url_tpl = '/corroborator/graphs/user/{0}/'
        for graph_code in graph_codes:
            url = url_tpl.format(graph_code)
            response = self.client.get(url)
            self.assertEqual(response.status_code, 200)

    def test_graphs_with_user_id_respond(self):
        '''
        check the graph views that require a user_id respond with a 200
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()
        user_id = User.objects.all()[0].id
        graph_codes = [
            'user_login_per_day', 'user_assigned_items_by_status',
        ]
        url_tpl = '/corroborator/graphs/user/{0}/{1}/'
        for graph_code in graph_codes:
            url = url_tpl.format(graph_code, user_id)
            response = self.client.get(url)
            self.assertEqual(response.status_code, 200)

    #####################################################################
    # tests below can now skip the login bit and test the data generation
    # directly
    # this will hopefully speed up the tests
    # I've included an example of directly testing the formatting code
    #####################################################################
    def test_user_login_time(self):
        '''
        Test correct return of user login time json
        '''
        user = User.objects.all()[0]
        total = generate_start_end_times(user)
        expected_response = json.dumps({
            'values': [
                {
                    'value': total,
                    'label': 'user'
                }
            ],
            'title': 'Total login time by User'
        })
        ura = UserReportingApi()
        json_response = json.loads(ura.total_user_login_time())
        expected_response = json.loads(expected_response)
        self.assertEqual(expected_response, json_response)

    def test_user_login_per_day(self):
        '''
        Test correct return of user login
        time per day json
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()

        user = User.objects.all()
        user_id = user[0].id

        url = '/corroborator/graphs/user/user_login_per_day/{0}/'.format(user_id)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_user_average_update(self):
        '''
        Test correct return of user
        average updates json
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()

        url = '/corroborator/graphs/user/user_average_updates/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_user_assigned_items_by_status(self):
        '''
        Test correct return of user assigned
        items by status json
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()

        user = User.objects.all()
        user_id = user[0].id

        url = '/corroborator/graphs/user/user_assigned_items_by_status/{0}/'.format(user_id)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_user_deleted_items(self):
        '''
        Test correct return of user deleted items
        json
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()

        url = '/corroborator/graphs/user/user_deleted_items/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_user_created_items(self):
        '''
        Test correct return of user created items
        json
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()

        url = '/corroborator/graphs/user/user_created_items/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_user_edited_items(self):
        '''
        Test correct return of user edited items
        json
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()

        url = '/corroborator/graphs/user/user_edited_items/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_user_deleted_edited_created(self):
        '''
        Test correct return of CRUD data as json
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()

        url = '/corroborator/graphs/user/user_deleted_edited_created/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
