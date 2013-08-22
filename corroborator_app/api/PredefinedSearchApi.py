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

from corroborator_app.api.UserApi import UserResource
from corroborator_app.models import PredefinedSearch
from corroborator_app.views import format_filters_for_tastypie


__all__ = ('PredefinedSearchResource', )

class PredefinedSearchResource(ModelResource):
    """
    tastypie api implementation
    """
    user = fields.ForeignKey(UserResource, 'user', null=True)
    class Meta:
        queryset = PredefinedSearch.objects.all()
        resource_name = 'predefinedSearch'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

    def dehydrate(self, bundle):
        bundle.data['incident_filters'] =\
            format_filters_for_tastypie(bundle.data['incident_filters'])  
        bundle.data['bulletin_filters'] =\
            format_filters_for_tastypie(bundle.data['bulletin_filters'])  
        bundle.data['actor_filters'] =\
            format_filters_for_tastypie(bundle.data['actor_filters'])  
        return bundle
