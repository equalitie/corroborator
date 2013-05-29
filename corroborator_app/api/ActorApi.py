"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for actor model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import actor

__all__ = ('ActorResource', )

class ActorResource(ModelResource):
    """
    tastypie api implementation
    """
    class Meta:
        queryset = actor.objects.all()
        resource_name = 'actor'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
