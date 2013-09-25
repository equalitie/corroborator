"""
This utility class generates and augments image using 
the PIL library.

Bill Doran
2013/08/09
"""

import StringIO
from PIL import Image, ImageChops
from django.core.files.uploadedfile import InMemoryUploadedFile
from corroborator.settings import common
from django.core.cache import cache

class Thumbnailer():
    def construct_thumb(self, inbound_file, filename):
        """
        This function return a thumbnail version of the original file
        to be saved for later display
        """
        size = (80, 80)
        string_data = ""
        for chunk in inbound_file.chunks():
            string_data += chunk

        stream = StringIO.StringIO(string_data)
        image = Image.open(stream)
        image.thumbnail(size, Image.ANTIALIAS)
        #image = image.convert('1')
        image_size = image.size
        offset_x = max( (size[0] - image_size[0]) / 2, 0 )
        offset_y = max( (size[1] - image_size[1]) / 2, 0 )
        offset_tuple = (offset_x, offset_y)

        background = Image.new('RGBA', size, (208, 208, 208, 1))
        background.paste(
            image,
            offset_tuple
        )
        thumb_name = filename + '_thumb' + '.jpg'
        tempfile_io = StringIO.StringIO()
        background.save(tempfile_io, format='JPEG')
        #thumb.save(tempfile_io, format='JPEG')

        cache.set(thumb_name, tempfile_io, common.CACHE_TIME)

        media_thumb_file = InMemoryUploadedFile(
                        tempfile_io, 
                        None,
                        thumb_name,
                        'image/jpeg',
                        tempfile_io.len, 
                        None
                        )
        return media_thumb_file
