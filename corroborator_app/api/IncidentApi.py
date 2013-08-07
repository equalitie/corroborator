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
from corroborator_app.api.LocationApi import LocationResource
from corroborator_app.api.MediaApi import MediaResource
from corroborator_app.api.BulletinApi import BulletinResource
from corroborator_app.api.CrimeCategoryApi import CrimeCategoryResource

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
    bulletins = fields.ManyToManyField(BulletinResource, 'bulletins', null=True)
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

    class Meta:
        queryset = Incident.objects.all()
        resource_name = 'incident'
        authorization = Authorization()
        authentication = ApiKeyAuthentication()
        always_return_data = True
