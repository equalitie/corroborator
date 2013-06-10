"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for media model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import Bulletin

__all__ = ('BulletinResource', )

class BulletinResource(ModelResource):
    """
    tastypie api implementation for Bulletin model
    """
    class Meta:
        queryset = Bulletin.objects.all()
        resource_name = 'bulletin'
        authorization = Authorization()
        #authentication = ApiKeyAuthentication()
        always_return_data = True
