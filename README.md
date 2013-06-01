corroborator
============

Case management with data validation, corroboration, omission and duplication checking

Installation
============

virtualenv should be used for package management
To install virtualenv
[sudo] pip install virtualenv

### Install local python environment
From the root folder run:
virtualenv --python=python2.7 env --no-site-packages

### Install required packages
env/bin/pip install -r requirements.txt

### pull in git submodules
git submodule init
git submodule update --recursive

### Initial db sync
env/bin/python manage.py migrate --settings=[local settings]

