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
import reversion

from corroborator_app.models import Bulletin, VersionStatus, Comment
from corroborator_app.api.UserApi import UserResource
from corroborator_app.api.SourceApi import SourceResource
from corroborator_app.api.LabelApi import LabelResource
from corroborator_app.api.ActorRoleApi import ActorRoleResource
from corroborator_app.api.CommentApi import CommentResource
from corroborator_app.api.TimeInfoApi import TimeInfoResource
from corroborator_app.api.LocationApi import LocationResource
from corroborator_app.api.MediaApi import MediaResource
from corroborator_app.index_meta_prep.bulletinPrepIndex import BulletinPrepMeta
from corroborator_app.index_meta_prep.actorPrepIndex import ActorPrepMeta
from corroborator_app.tasks import update_object
from django.contrib.auth.models import User
__all__ = ('BulletinResource')

class BulletinResource(ModelResource):
    """
    tastypie api implementation for Bulletin model
    """

    # foreign key fields
    assigned_user = fields.ForeignKey(UserResource, 'assigned_user', null=True)
    # ManyToManyFields
    sources = fields.ManyToManyField(SourceResource, 'sources', null=True)
    bulletin_imported_comments = fields.ManyToManyField(
        CommentResource,
        'bulletin_imported_comments',
        null=True
    )

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
        username = bundle.request.GET['username']
        bundle = super( BulletinResource, self )\
            .obj_delete( bundle, **kwargs )

        """
        user = User.objects.filter(username=username)[0]
        with reversion.create_revision():
            bundle = super( BulletinResource, self )\
                .obj_delete( bundle, **kwargs )
            reversion.set_comment(bundle.data['comment'])    
            reversion.set_user(user)
            reversion.add_meta(
                VersionStatus, 
                status=bundle.data['status']
            )
        """
        update_object.delay(username)    
        return bundle

    def create_comment(self, comment, status_id, user):
        
        comment = Comment(
            assigned_user_id = user.id,
            comments_en = comment,
            status_id = status_id
        )
        comment.save()
        comment_uri = '/api/v1/comment/{0}/'.format(comment.id)

        return comment_uri

    def obj_update(self, bundle, **kwargs):
        username = bundle.request.GET['username']
        user = User.objects.filter(username=username)[0]
        status_id = bundle.data['status_uri'].split('/')[4]
        comment_uri = self.create_comment(
            bundle.data['comment'],
            status_id,
            user
        )
        bundle.data['bulletin_comments'].append( comment_uri )

        with reversion.create_revision():
            bundle = super( BulletinResource, self )\
                .obj_update( bundle, **kwargs )
            reversion.add_meta(
                VersionStatus, 
                status=bundle.data['status']
            )
            reversion.set_user(user)
            reversion.set_comment(bundle.data['comment'])    
        update_object.delay(username)    
        return bundle
 
    def obj_create(self, bundle, **kwargs):
        username = bundle.request.GET['username']
        user = User.objects.filter(username=username)[0]
        status_id = bundle.data['status_uri'].split('/')[4]
        comment_uri = self.create_comment(
            bundle.data['comment'],
            status_id,
            user
        )
        bundle.data['bulletin_comments'] = [
            comment_uri
        ]

        with reversion.create_revision():
            bundle = super( BulletinResource, self )\
                .obj_create( bundle, **kwargs )
            reversion.set_user(user)
            reversion.set_comment(bundle.data['comment'])    
            reversion.add_meta(
                VersionStatus, 
                status=bundle.data['status']
            )
        update_object.delay(username)    
        return bundle

    def dehydrate(self, bundle):
        bundle.data['bulletin_comments'] = BulletinPrepMeta()\
            .prepare_bulletin_comments(bundle.obj)
        bundle.data['bulletin_imported_comments'] = BulletinPrepMeta()\
            .prepare_bulletin_imported_comments(bundle.obj)
        bundle.data['bulletin_locations'] = BulletinPrepMeta()\
            .prepare_bulletin_locations(bundle.obj)
        bundle.data['bulletin_labels'] = BulletinPrepMeta()\
            .prepare_bulletin_labels(bundle.obj) 
        bundle.data['bulletin_times'] = BulletinPrepMeta()\
            .prepare_bulletin_times(bundle.obj) 
        bundle.data['bulletin_sources'] = BulletinPrepMeta()\
            .prepare_bulletin_sources(bundle.obj) 
        bundle.data['most_recent_status_bulletin'] = \
            BulletinPrepMeta()\
            .prepare_most_recent_status_bulletin(bundle.obj) 
        bundle.data['count_actors'] = BulletinPrepMeta()\
            .prepare_count_actors(bundle.obj)
        bundle.data['actor_roles_status'] = BulletinPrepMeta()\
            .prepare_bulletin_actor_roles(bundle.obj)
        bundle.data['actors'] = ActorPrepMeta()\
            .prepare_actors(bundle.obj)
        bundle.data['actors_role'] = ActorPrepMeta()\
            .prepare_actors_role(bundle.obj)
        
        if bundle.data['confidence_score'] == None:
            bundle.data['confidence_score'] = ''


        return bundle
