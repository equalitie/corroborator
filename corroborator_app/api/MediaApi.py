"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for media model, requires apikey auth
tests in tests/api/tests.py
"""

import StringIO
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from corroborator_app.models import Media

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

        if bundle.data['media_type'] == 'Picture':
            media_file = bundle.data['media_file']
            filename = bundle.data['name_en']
            
            media_thumb_file = self.construct_thumb(media_file, filename)

            bundle.data['media_thumb_file'] = media_thumb_file
        
        bundle = super( MediaResource, self ).obj_create( bundle, **kwargs )
        return bundle

    def construct_thumb(self, inbound_file, filename):
        """
        This function return a thumbnail version of the original file
        to be saved for later display
        """
        size = (36, 36)
        string_data = ""
        for chunk in inbound_file.chunks():
            string_data += chunk

        stream = StringIO.StringIO(string_data)
        image = Image.open(stream)
        image.thumbnail(size, Image.ANTIALIAS)
        background = Image.new('RGBA', size, (255, 255, 255, 0))
        background.paste(
            image,
            ((size[0] - image.size[0]) / 2, (size[1] - image.size[1])/ 2)
        )

        thumb_name = filename + '_thumb' + '.jpg'
        tempfile_io = StringIO.StringIO()
        background.save(tempfile_io, format='JPEG')
        media_thumb_file = InMemoryUploadedFile(
                        tempfile_io, 
                        None,
                        thumb_name,
                        'image/jpeg',
                        tempfile_io.len, 
                        None
                        )
        return media_thumb_file
