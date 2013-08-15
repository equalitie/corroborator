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
from corroborator_app.index_meta_prep.bulletinPrepIndex import BulletinPrepMeta
from corroborator_app.tasks import update_object

__all__ = ('BulletinResource')

class BulletinResource(ModelResource):
    """
    tastypie api implementation for Bulletin model
    """

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
    medias = fields.ManyToManyField(
        MediaResource, 
        'medias', 
        null=True
    )
    locations = fields.ManyToManyField(
        LocationResource, 
        'locations',
        null=True
    )
    labels = fields.ManyToManyField(
        LabelResource, 
        'labels',
        null=True
    )
    ref_bulletins = fields.ManyToManyField(
        'self', 
        'ref_bulletins',
        null=True
    )

    class Meta:
        queryset = Bulletin.objects.all()
        resource_name = 'bulletin'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

    def obj_delete(self, bundle, **kwargs):
        bundle = super( BulletinResource, self )\
            .obj_delete( bundle, **kwargs )
        username = bundle.request.GET['username']
        update_object.delay(user)    
        return bundle
 
    def obj_update(self, bundle, **kwargs):
        bundle = super( BulletinResource, self )\
            .obj_update( bundle, **kwargs )
        username = bundle.request.GET['username']
        update_object.delay(user)    
        return bundle
 
    def obj_create(self, bundle, **kwargs):
        bundle = super( BulletinResource, self )\
            .obj_create( bundle, **kwargs )
        username = bundle.request.GET['username']
        update_object.delay(user)    
        return bundle
    """
    def obj_delete(self, bundle, **kwargs):
        bundle.data['deleted'] = True
        self.obj_update(bundle, **kwargs)
    """

    def dehydrate(self, bundle):
        bundle.data['bulletin_locations'] = BulletinPrepMeta()\
            .prepare_bulletin_locations(bundle.obj)
        bundle.data['bulletin_labels'] = BulletinPrepMeta()\
            .prepare_bulletin_labels(bundle.obj) 
        bundle.data['bulletin_times'] = BulletinPrepMeta()\
            .prepare_bulletin_times(bundle.obj) 
        bundle.data['bulletin_sources'] = BulletinPrepMeta()\
            .prepare_bulletin_sources(bundle.obj) 
        #bundle.data[''] = BulletinPrepMeta()\
        #    .prepare_bulletin_assigned_user(bundle.obj) 
        bundle.data['most_recent_status_bulletin'] = \
            BulletinPrepMeta()\
            .prepare_most_recent_status_bulletin(bundle.obj) 
        bundle.data['count_actors'] = BulletinPrepMeta()\
            .prepare_count_actors(bundle.obj)

        return bundle
