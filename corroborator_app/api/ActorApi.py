"""
Author: Bill Doran
Date: 05-06-2013
Create api for actor relationship model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.models import ActorRelationship
from corroborator_app.models import Actor, ActorRole, VersionStatus
from corroborator_app.api.LocationApi import LocationResource
from corroborator_app.api.MediaApi import MediaResource
from corroborator_app.index_meta_prep.actorPrepIndex import ActorPrepMeta
from corroborator_app.tasks import update_object

import reversion

import sys
__all__ = ('ActorRelationshipResource', 'ActorResource', 'ActorRoleResource', )

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
    actors_role = fields.ManyToManyField(
        'corroborator_app.api.ActorRoleResource', 
        'actors_role',
        null=True
    )

    class Meta:
        queryset = Actor.objects.all()
        resource_name = 'actor'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

    def obj_delete(self, bundle, **kwargs):
        with reversion.create_revision():
            bundle = super( ActorResource, self )\
                .obj_delete( bundle, **kwargs )
            reversion.set_comment(bundle.data['comment'])    
            reversion.add_meta(
                VersionStatus, 
                status=bundle.data['status']
            )
        username = bundle.request.GET['username']
        update_object.delay(username)    
        return bundle
 
    def obj_update(self, bundle, **kwargs):
        with reversion.create_revision():
            bundle = super( ActorResource, self )\
                .obj_update( bundle, **kwargs )
            reversion.set_comment(bundle.data['comment'])    
            reversion.add_meta(
                VersionStatus, 
                status=bundle.data['status']
            )
            #reversion.set_comment("test meta class")    
        username = bundle.request.GET['username']
        update_object.delay(username)    
        return bundle
 
    def obj_create(self, bundle, **kwargs):
        with reversion.create_revision():
            bundle = super( ActorResource, self )\
                .obj_create( bundle, **kwargs )
            reversion.add_meta(
                VersionStatus, 
                status=bundle.data['status']
            )    
            reversion.set_comment(bundle.data['comment'])    
        username = bundle.request.GET['username']
        update_object.delay(username)    
        return bundle

    def dehydrate(self, bundle):
        bundle.data['count_incidents'] = ActorPrepMeta()\
            .prepare_count_incidents(bundle.obj)        
        bundle.data['count_bulletins'] = ActorPrepMeta()\
            .prepare_count_bulletins(bundle.obj)        
        bundle.data['roles'] = ActorPrepMeta()\
            .prepare_roles(bundle.obj)
        bundle.data['actors_role'] = ActorPrepMeta()\
            .prepare_actors_role(bundle.obj)
        bundle.data['actors'] = ActorPrepMeta()\
            .prepare_actors(bundle.obj)
        return bundle


class ActorRoleResource(ModelResource):
    actor = fields.ForeignKey(ActorResource, 'actor', null=True)
    """
    tastypie api implementation
    """
    class Meta:
        queryset = ActorRole.objects.all()
        resource_name = 'actorRole'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

class ActorRelationshipResource(ModelResource):
    """
    tastypie api implementation for actor relationship model
    """
    actor = fields.ForeignKey(ActorResource, 'actor', null=True)

    class Meta:
        queryset = ActorRelationship.objects.all()
        resource_name = 'actorRelationship'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
