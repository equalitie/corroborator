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
from corroborator_app.utilities.imageTools import Thumbnailer
__all__ = ('MediaResource', )

class MultipartResource(object):
    def deserialize(self, request, data, format=None):

        if not format:
            format = request.META.get('CONTENT_TYPE', 'application/json')

        if format == 'application/x-www-form-urlencoded':
            return request.POST

        if format.startswith('multipart'):
            data = request.POST.copy()
            data.update(request.FILES)
            return data

        return super(MultipartResource, self).deserialize(request, data, format)

class MediaResource(MultipartResource, ModelResource):
    """
    tastypie api implementation for media model
    """
    media_file = fields.FileField(
        attribute='media_file',
        null=True,
        blank=True
    )
    media_thumb_file = fields.FileField(
        attribute='media_thumb_file',
        null=True,
        blank=True
    )


    class Meta:
        queryset = Media.objects.all()
        resource_name = 'media'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

    def obj_create(self, bundle, **kwargs):

        if 'image' in bundle.data['media_file'].content_type:
            media_file = bundle.data['media_file']
            filename = bundle.data['name_en']
            
            media_thumb_file = Thumbnailer()\
                .construct_thumb(media_file, filename)
            bundle.data['media_thumb_file'] = media_thumb_file

        parts = media_file.name.split('.')
        media_file_type = parts[len(parts)-1]
        bundle.data['media_file_type'] = media_file_type        
        bundle = super( MediaResource, self )\
            .obj_create( bundle, **kwargs )
        return bundle
