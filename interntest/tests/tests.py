"""
Author: Cormac McGuire
Date: 01/06/2013
Test that our test views load - meta or wha!

"""
from utilities.test import CBVTestCase
from interntest.views.views import JsTestView


class TestJsTestView(CBVTestCase):
    view = JsTestView()
    def setUp(self):
        super(TestJsTestView, self).setUp()


    def test_page_displays(self):
        """
        test we get a page

        """
        response = self.dispatch_request(self.request)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'client.html')
