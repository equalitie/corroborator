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
from corroborator_app.api.UserApi import UserResource
from corroborator_app.api.SourceApi import SourceResource
from corroborator_app.api.LabelApi import LabelResource
from corroborator_app.api.ActorRoleApi import ActorRoleResource
from corroborator_app.api.CommentApi import CommentResource
from corroborator_app.api.TimeInfoApi import TimeInfoResource
from corroborator_app.api.LocationApi import LocationResource
from corroborator_app.api.MediaApi import MediaResource

__all__ = ('BulletinResource')

class BulletinResource(ModelResource):
    # foreign key fields
    assigned_user = fields.ForeignKey(UserResource, 'assigned_user', null=True)
    # ManyToManyFields
    sources = fields.ManyToManyField(SourceResource, 'sources', null=True)
    bulletin_comments = fields.ManyToManyField(
        CommentResource,
        'bulletin_comments',
        null=True
    )
    actors_role = fields.ManyToManyField(
        ActorRoleResource, 
        'actors_role',
        null=True
    )
    times = fields.ManyToManyField(TimeInfoResource, 'times', null=True)
    medias = fields.ManyToManyField(MediaResource, 'medias',null=True)
    locations = fields.ManyToManyField(LocationResource, 'locations',null=True)
    labels = fields.ManyToManyField(LabelResource, 'labels',null=True)
    ref_bulletins = fields.ManyToManyField('self', 'ref_bulletins',null=True)

    """
    tastypie api implementation for Bulletin model
    """
    class Meta:
        queryset = Bulletin.objects.all()
        resource_name = 'bulletin'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
    
