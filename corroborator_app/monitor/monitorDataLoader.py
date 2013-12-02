from django.conf import settings
import json
import os

class MonitorDataLoader:

    def __init__(self):
        """
        get initial json data for monitor elements
        """
        self.importer_config = self.get_importer_config()
        self.scraper_config = self.get_scraper_config()
        self.importer_stats = self.get_importer_stats()

    def get_importer_config(self):
        """
        Get current config for importer
        """
        importer_config_file = settings.IMPORTER_CONF_FILE
        return self.get_config(importer_config_file)

    def get_scraper_config(self):
        """
        Get current config for importer
        """
        scraper_config_file = settings.SCRAPER_CONF_FILE
        return self.get_config(scraper_config_file)

    def overwrite_scraper_config(self, data):
        """
        Update config file
        """
        scraper_config_file = settings.SCRAPER_CONF_FILE
        return self.overwrite_config(data, scraper_config_file)

    def overwrite_importer_config(self, data):
        """
        Update config file
        """
        importer_config_file = settings.IMPORTER_CONF_FILE
        return self.overwrite_config(data, importer_config_file)

    def get_importer_stats(self):
        """
        Get current config for importer
        """
        importer_stats_file = settings.MONITOR_JOB_FILE
        return self.get_config(importer_stats_file)

    def get_config(self, config_file):
        """
        Get the config as JSON for the specified file
        """

        CONFIG_FILE = os.path.join(
            os.path.dirname(__file__), 
            config_file    
        )

        config_data = open(CONFIG_FILE)
        config = json.load(config_data)
        config_data.close()
        return config

    def overwrite_config(self, data, config_file):
        """
        Write the specified json out to the given config file
        """
        CONFIG_FILE = os.path.join(
            os.path.dirname(__file__), 
            config_file    
        )
        try:
            with open(CONFIG_FILE, 'w') as outfile:
                json.dump(data, outfile)

            return {"result": "success"}
        except Exception, e:
            return {"error": e}


