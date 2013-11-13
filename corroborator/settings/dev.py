"""
Author: Cormac McGuire
Dev settings
"""
from settings.common import *

DEBUG = True
ALLOWED_HOSTS = ['*']

ROOT_PATH = '/Users/cormac/work/programming/python/djangodev/corroborator/'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ROOT_PATH + '../db/corroborator-latest.sql',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}

#DATABASES = {
    #'default': {
    #'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
    #'NAME': 'corroborator',                      # Or path to database file if using sqlite3.
    #'USER': 'root',                      # Not used with sqlite3.
    #'PASSWORD': 'F4QsJfHj9Rw47cAB',                  # Not used with sqlite3.
    #'HOST': '127.0.0.1',                      # Set to empty string for localhost. Not used with sqlite3.
    #'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
                                                                #}
#}


INSTALLED_APPS += (
    'autofixture',
    'debug_toolbar',
    #'django_socketio',
)

INTERNAL_IPS = ('127.0.0.1',)

DEBUG_TOOLBAR_PANELS = (
    'debug_toolbar.panels.version.VersionDebugPanel',
    'debug_toolbar.panels.timer.TimerDebugPanel',
    'debug_toolbar.panels.settings_vars.SettingsVarsDebugPanel',
    'debug_toolbar.panels.headers.HeaderDebugPanel',
    'debug_toolbar.panels.request_vars.RequestVarsDebugPanel',
    'debug_toolbar.panels.template.TemplateDebugPanel',
    'debug_toolbar.panels.sql.SQLDebugPanel',
    'debug_toolbar.panels.signals.SignalDebugPanel',
    'debug_toolbar.panels.logger.LoggingPanel',
)
DEBUG_TOOLBAR_CONFIG = {
    'INTERCEPT_REDIRECTS': False
}

MIDDLEWARE_CLASSES += (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
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

STATIC_URL = '/static/'

STATIC_ROOT = ROOT_PATH + 'static/'

TIME_ZONE = 'Europe/Dublin'
