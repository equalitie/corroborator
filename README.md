corroborator
============

Case management with data validation, corroboration, omission and duplication checking

Installation
============



virtualenv should be used for package management
To install virtualenv
[sudo] pip install virtualenv

#### Install local python environment
From the root folder run:

virtualenv --python=python2.7 env --no-site-packages

#### Install required packages
env/bin/pip install -r requirements.txt

#### Set up system celeryd install
On Debian, the configuration file for celeryd exists in /etc/default/celeryd

#### pull in git submodules
git submodule init

git submodule update --recursive

#### Initial db sync
env/bin/python manage.py migrate --settings=[local settings]

#### Cache setup
Create and define CACHE_URL, CACHE_PATH AND CACHES. 

In CACHES, LOCATION should be a directory that is owned by the user celeryd runs as. On Debian this is "celeryd". This is the intermediary cache. 

CACHE_URL should point to the remote location of CACHE_PATH. This directory is where files will be paged out to when requested from the cache. 