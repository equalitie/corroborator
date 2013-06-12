from settings.common import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', 
        'NAME': '/Users/cormac/work/programming/python/djangodev/db/corroborator.sql', # Or path to database file if using sqlite3.
        'USER': '', # Not used with sqlite3.
        'PASSWORD': '',# Not used with sqlite3.
        'HOST': '',# Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',# Set to empty string for default. Not used with sqlite3.
    }
}

INSTALLED_APPS += (
    'autofixture',
    'interntest',
)

#Haystack backend configuration
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.solr_backend.SolrEngine',
        'URL': 'http://127.0.0.1:8983/solr',
        # ...or for multicore...
    },
}
