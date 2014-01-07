from django.test import TestCase

from corroborator_app.tests.test_utilities import TestUserUtility


class ReportingTestCase(TestCase):
    '''
    Test the reporting view and it's supporting json ajax views
    '''
    fixtures = ['bulletin', ]

    def setUp(self):
        self.test_util = TestUserUtility()

    def tearDown(self):
        pass

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
