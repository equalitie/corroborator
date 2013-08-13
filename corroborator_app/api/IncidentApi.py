"""
Author: Cormac McGuire
Date: 29-05-2013
Create api for Incident model, requires apikey auth
tests in tests/api/tests.py
"""

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import ApiKeyAuthentication
from tastypie import fields

from corroborator_app.api.UserApi import UserResource
from corroborator_app.api.SourceApi import SourceResource
from corroborator_app.api.LabelApi import LabelResource
from corroborator_app.api.ActorRoleApi import ActorRoleResource
from corroborator_app.api.CommentApi import CommentResource
from corroborator_app.api.TimeInfoApi import TimeInfoResource
from corroborator_app.api.BulletinApi import BulletinResource
from corroborator_app.api.LocationApi import LocationResource
from corroborator_app.api.MediaApi import MediaResource
from corroborator_app.api.CrimeCategoryApi import CrimeCategoryResource
from corroborator_app.index_meta_prep.incidentPrepIndex import IncidentPrepMeta

from corroborator_app.tasks import update_object

from corroborator_app.models import Incident

__all__ = ('IncidentResource', )

class IncidentResource(ModelResource):
    """
    tastypie api implementation for Incident model
    """
    # foreign key fields
    assigned_user = fields.ForeignKey(UserResource, 'assigned_user', null=True)
    incident_comments = fields.ManyToManyField(
        CommentResource,
        'incident_comments',
        null=True
    )
    actors_role = fields.ManyToManyField(
        ActorRoleResource, 
        'actors_role',
        null=True
    )
    crimes = fields.ManyToManyField(CrimeCategoryResource, 'crimes', null=True)
    labels = fields.ManyToManyField(LabelResource, 'labels', null=True)
    times = fields.ManyToManyField(TimeInfoResource, 'times', null=True)
    locations = fields.ManyToManyField(LocationResource, 'locations', null=True)
    ref_incidents = fields.ManyToManyField('self', 'ref_incidents', null=True)
    ref_bulletins = fields.ManyToManyField(
        BulletinResource,
        'ref_bulletins',
        null=True
    )
    class Meta:
        queryset = Incident.objects.all()
        resource_name = 'incident'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True

    def obj_update(self, bundle, **kwargs):
        bundle = super( IncidentResource, self )\
            .obj_delete( bundle, **kwargs )
        update_object.apply_async()
        return bundle
 
    def obj_update(self, bundle, **kwargs):
        bundle = super( IncidentResource, self )\
            .obj_update( bundle, **kwargs )
        update_object.apply_async()
        return bundle

    def obj_create(self, bundle, **kwargs):
        bundle = super( IncidentResource, self )\
            .obj_create( bundle, **kwargs )
        update_object.apply_async()
        return bundle
        
    def dehydrate(self, bundle):
        bundle.data['incident_locations'] = IncidentPrepMeta()\
            .prepare_incident_locations(bundle.obj)
        bundle.data['incident_labels'] = IncidentPrepMeta()\
            .prepare_incident_labels(bundle.obj) 
        bundle.data['incident_times'] = IncidentPrepMeta()\
            .prepare_incident_times(bundle.obj) 
        bundle.data['incident_crimes'] = IncidentPrepMeta()\
            .prepare_incident_crimes(bundle.obj) 
        #bundle.data[''] = IncidentPrepMeta()\
        #    .prepare_incident_assigned_user(bundle.obj) 
        bundle.data['most_recent_status_incident'] = \
            IncidentPrepMeta()\
            .prepare_most_recent_status_incident(bundle.obj) 
        bundle.data['count_actors'] = IncidentPrepMeta()\
            .prepare_count_actors(bundle.obj)
        bundle.data['count_bulletins'] = IncidentPrepMeta()\
            .prepare_count_bulletins(bundle.obj)
        bundle.data['count_incidents'] = IncidentPrepMeta()\
            .prepare_count_incidents(bundle.obj)

        return bundle
