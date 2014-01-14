from django.test import TestCase, Client
from django.contrib.auth.models import User
from corroborator_app.tests.test_utilities import TestUserUtility
from corroborator_app.models import (Actor, UserLog, VersionStatus,
Bulletin, Incident )
from autofixture import AutoFixture
import reversion

class ReportingTestCase(TestCase):
    '''
    Test the reporting view and it's supporting json ajax views
    '''
    fixtures = ['bulletin', ]

    def setUp(self):
        self.test_util = TestUserUtility()
        fixture = AutoFixture(VersionStatus, generate_fk=True)
        fixture.create(10)
        vs = VersionStatus.objects.all()
        print vs[0]
        fixture = AutoFixture(UserLog, generate_fk=True)
        fixture.create(10)
    def tearDown(self):
        pass

    def test_user_login_time(self):
        '''
        Test correct return of user login time
        json
        '''
        self.test_util.add_user_to_group('senior-data-analyst')
        self.client = self.test_util.client_login()

        url = '/corroborator/graphs/user/user_login_time/'
        response = self.client.get(url)
        user = User.objects.all()
        self.assertEqual(response.status_code, 200) 

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
