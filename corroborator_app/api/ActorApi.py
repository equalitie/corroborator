"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for actor model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.api.LocationApi import LocationResource
from corroborator_app.api.MediaApi import MediaResource
from corroborator_app.api.ActorRelationshipApi import ActorRelationshipResource 

from corroborator_app.models import Actor

__all__ = ('ActorResource', )


class ActorResource(ModelResource):
    """
    tastypie api implementation
    """
    # foreign key fields
    POB = fields.ForeignKey(LocationResource, 'POB', null=True)
    current_location = fields.ForeignKey(
        LocationResource,
        'current_location',
        null=True
    )
    media = fields.ForeignKey(MediaResource, 'media', null=True)
    actor_relationships = fields.ManyToManyField(
        ActorRelationshipResource, 
        'actor_relationships',
        null=True
    )
    class Meta:
        queryset = Actor.objects.all()
        resource_name = 'actor'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
