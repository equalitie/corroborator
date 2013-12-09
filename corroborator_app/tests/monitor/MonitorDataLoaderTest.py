from django.test import TestCase, Client
from django.http import HttpRequest
from django.contrib.auth import authenticate
from corroborator_app.monitor.monitorDataLoader import MonitorDataLoader
from corroborator_app.tests.test_utilities import TestUserUtility
import json

class MonitorDataLoaderTestCase(TestCase):

    def setUp(self):
        """
        Setup initial tools
        """
        self.mdl = MonitorDataLoader()

    def test_overwrite_importer_config(self):
        """
        Test that the importer config is correctly written
        """
        data = {
            "_HEADER": {
                "modified": "2013/10/10",
                "author": "Bill Doran"
            },
            "actors_dir": "/tmp/actors_csv/",
            "bulletins_dir": "/tmp/bulletins_csv",
            "mysql_dir": "",
            "media_params": {
                "media_dir": "/tmp/media/",
                "file_meta_type": ".yaml",
                "file_types": {
                    "image": [
                        "jpg",
                        "png",
                        "gif"
                    ],
                    "video": [
                        "mp4"
                    ]
                }
            },
        }
        result = self.mdl.overwrite_importer_config(data)
        test_result = result['result']
        self.assertEqual(test_result,'success') 

    def test_overwrite_scraper_config(self):
        """
        Test that the scraper config is correctly written
        """
        data = {
            "_HEADER": {
                "modified": "2013/10/10",
                "author": "Bill Doran"
            },
            "vdc": False,
            "csrsy": False,
            "documents-sy": True,
            "syrianshuhada": False
        }
        result = self.mdl.overwrite_scraper_config(data)
        test_result = result['result']
        self.assertEqual(test_result,'success') 

    def test_read_scraper_config(self):
        """
        Test that the scraper config is correctly read
        """
        scraper_conf = self.mdl.get_scraper_config()
        self.assertEqual(
            scraper_conf['_HEADER']['modified'],
            '2013/10/10'
        ) 

    def test_validate_ext(self):
        """
        Test file extenson validation check
        """
        test_file_ext = '.yaml'
        result = self.mdl.validate_ext(test_file_ext)
        self.assertEqual(result['success'], 'true')

    def test_read_importer_config(self):
        """
        Test that the importer config can be correctly read
        """
        importer_conf = self.mdl.get_importer_config()
        self.assertEqual(
            importer_conf['_HEADER']['modified'],
            '2013/10/10'
        )
    def test_read_importer_stats(self):
        """
        Test reading of the importer stats
        """
        importer_stats = self.mdl.get_importer_stats()
        self.assertEqual(
            importer_stats['_HEADER']['modified'],
            '2013/10/10'
        )

