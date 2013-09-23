from corroborator.settings.common import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'corroborator_dev',                      # Or path to database file if using sqlite3.
        'USER': 'django',                      # Not used with sqlite3.
        'PASSWORD': 'pe2ua8Yahp7fainoop7U',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}
INSTALLED_APPS += (
    'autofixture',
    'interntest',
)
#Haystack backend configuration
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'

# This is the path where files are paged out to when requested from the cache
CACHE_PATH = "/opt/corroborator/dev/static/cache/"
# This is the URL to use when returning cached URLs
CACHE_URL = "http://corroborator.org/static/cache/"

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        # Where the intermediate cache is stored
        # this folder should be owned by celeryd's user.
        'LOCATION': '/opt/corroborator/dev/cache',
    }
}


HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.solr_backend.SolrEngine',
        'URL': 'https://sjac.rightscase.org/solr'
        # ...or for multicore...
        # 'URL': 'http://127.0.0.1:8983/solr/mysite',
    },
}
