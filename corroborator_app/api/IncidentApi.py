"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for Incident model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import Incident

__all__ = ('IncidentResource', )

class IncidentResource(ModelResource):
    """
    tastypie api implementation for Incident model
    """
    class Meta:
        queryset = Incident.objects.all()
        resource_name = 'incident'
        authorization = Authorization()
        #authentication = ApiKeyAuthentication()
        always_return_data = True
