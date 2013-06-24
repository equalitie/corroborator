"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for PredefinedSearch model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import PredefinedSearch

__all__ = ('PredefinedSearchResource', )

class PredefinedSearchResource(ModelResource):
    """
    tastypie api implementation
    """
    class Meta:
        queryset = PredefinedSearch.objects.all()
        resource_name = 'predefinedSearch'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
