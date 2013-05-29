from corroborator.settings.common import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'corroborator',                      # Or path to database file if using sqlite3.
        'USER': 'django',                      # Not used with sqlite3.
        'PASSWORD': 'pe2ua8Yahp7fainoop7U',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}
