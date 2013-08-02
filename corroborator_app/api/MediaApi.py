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

from corroborator_app.models import Media

__all__ = ('MediaResource', )

class MediaResource(ModelResource):
    """
    tastypie api implementation for media model
    """
    media_file = fields.FileField(
        attribute='media_file',
        null=True,
        blank=True
    )

    class Meta:
        queryset = Media.objects.all()
        resource_name = 'media'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
