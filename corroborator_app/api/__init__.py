"""
api module for the corroborator app
we also declare our signal to create api keys for users on the post_save 
signal
"""
from django.contrib.auth.models import User
from django.db import models
from tastypie.models import create_api_key
from corroborator_app.api.ActorApi import ActorResource

models.signals.post_save.connect(create_api_key, sender=User)
