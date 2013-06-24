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

from corroborator_app.models import ActorRole

__all__ = ('ActorRoleResource', )

class ActorRoleResource(ModelResource):
    """
    tastypie api implementation
    """
    class Meta:
        queryset = ActorRole.objects.all()
        resource_name = 'actorRole'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
