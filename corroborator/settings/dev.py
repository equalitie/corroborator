from settings.common import *

DJANGO_PROJECTS_ROOT = '/Users/cormac/work/programming/python/djangodev'
LOCKING = {'time_until_expiration': 120, 'time_until_warning': 60}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', 
        'NAME': DJANGO_PROJECTS_ROOT + '/db/corroborator.sql',
        'USER': '', # Not used with sqlite3.
        'PASSWORD': '',# Not used with sqlite3.
        'HOST': '',# Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',# Set to empty string for default. Not used with sqlite3.
    }
}

INSTALLED_APPS += (
    'autofixture',
    'interntest',
    'debug_toolbar',
    'django_socketio',
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

MIDDLEWARE_CLASSES += (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)

#Haystack backend configuration
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'


# This is the path where files are paged out to when requested from the cache
CACHE_PATH = DJANGO_PROJECTS_ROOT + "/corroborator/static/cache/"

# This is the URL to use when returning cached URLs
CACHE_URL = "http://corroborator.mac.com/static/cache/"


CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        # Where the intermediate cache is stored
        # this folder should be owned by celeryd's user.
        'LOCATION': DJANGO_PROJECTS_ROOT + '/cache/corrob-cache',
    }
}

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.solr_backend.SolrEngine',
        'URL': 'http://127.0.0.1:8983/solr',
        # ...or for multicore...
    },
}

STATIC_URL = '/static/'

STATIC_ROOT = DJANGO_PROJECTS_ROOT + '/corroborator/static/'
