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

