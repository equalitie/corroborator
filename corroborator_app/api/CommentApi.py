"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for Comment model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import Comment

__all__ = ('CommentResource', )

class CommentResource(ModelResource):
    """
    tastypie api implementation for Comment model
    """
    class Meta:
        queryset = Comment.objects.all()
        resource_name = 'comment'
        authorization = Authorization()
        #authentication = ApiKeyAuthentication()
        always_return_data = True
