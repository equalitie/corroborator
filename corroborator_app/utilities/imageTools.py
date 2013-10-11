"""
This utility class generates and augments image using
the PIL library.

Bill Doran
2013/08/09
"""

import StringIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile


class Thumbnailer():
    '''
    create thumbnails
    '''
    def __init__(self):
        self._size = (90, 90)
        self._suffix = '_thumb.jpg'

    @property
    def size(self):
        ''' size of the thumbnail '''
        return self._size

    @size.setter
    def size(self, value):
        self._size = value

    @property
    def suffix(self):
        ''' size of the thumbnail '''
        return self._suffix

    @suffix.setter
    def suffix(self, value):
        self._suffix = value

    def calculate_offset(self, image):
        '''
        calculate the size of the letterboxing
        '''
        image_size = image.size
        offset_x = max((self.size[0] - image_size[0]) / 2, 0)
        offset_y = max((self.size[1] - image_size[1]) / 2, 0)
        offset_tuple = (offset_x, offset_y)
        return offset_tuple

    def read_image_from_file(self, inbound_file):
        '''
        read the image in from a file stream
        '''
        string_data = ""
        for chunk in inbound_file.chunks():
            string_data += chunk

        stream = StringIO.StringIO(string_data)
        image = Image.open(stream)
        return image

    def name_thumbnail(self, uploaded_file):
        '''
        assign a name
        '''
        def name_concatenator(name, part):
            return name + part

        filename_parts = uploaded_file.name.split('.')
        filename_parts.pop(len(filename_parts)-1)
        filename = reduce(name_concatenator, filename_parts, '')
        return filename + self.suffix

    def create_thumbnail_file_string(self, image, offset_tuple):
        '''
        take the PIL image, thumbnail it and write it to a string
        '''
        image.thumbnail(self.size, Image.ANTIALIAS)
        background = Image.new('RGBA', self.size, (208, 208, 208, 1))
        background.paste(
            image,
            offset_tuple
        )
        tempfile_io = StringIO.StringIO()
        background.save(tempfile_io, format='JPEG')
        return tempfile_io

    def construct_thumb_from_image(self, inbound_file):
        """
        This function return a thumbnail version of the original file
        to be saved for later display
        """
        image = self.read_image_from_file(inbound_file)
        offset_tuple = self.calculate_offset(image)
        thumb_name = self.name_thumbnail(inbound_file)
        tempfile_io = self.create_thumbnail_file_string(image, offset_tuple)

        media_thumb_file = InMemoryUploadedFile(
            tempfile_io,
            None,
            thumb_name,
            'image/jpeg',
            tempfile_io.len,
            None
        )
        return media_thumb_file
