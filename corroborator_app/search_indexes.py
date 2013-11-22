"""
This file handles the construction of Solr entities based on the existing MySQL
database model using Django Haystacks as an interface.
"""
from haystack import indexes
from corroborator_app.models import Bulletin, Location, \
    Incident, Actor, Media, SolrUpdate, PredefinedSearch
from celery_haystack.indexes import CelerySearchIndex
from django.conf import settings

from corroborator_app.index_meta_prep.actorPrepIndex import ActorPrepMeta
from corroborator_app.index_meta_prep.bulletinPrepIndex import BulletinPrepMeta
from corroborator_app.index_meta_prep.incidentPrepIndex import IncidentPrepMeta


class ActorIndex(CelerySearchIndex, indexes.Indexable):
    """
    This class manages the construction of the Actor Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    dob = indexes.DateField(model_attr='DOB', null=True, faceted=True)
    fullname_en = indexes.CharField(model_attr='fullname_en', null=True)
    fullname_ar = indexes.CharField(model_attr='fullname_ar', null=True)
    nickname_en = indexes.CharField(model_attr='nickname_en', null=True)
    nickname_ar = indexes.CharField(model_attr='nickname_ar', null=True)
    age_en = indexes.CharField(model_attr='age_en', faceted=True, null=True)
    age_ar = indexes.CharField(model_attr='age_ar', null=True, faceted=True)
    sex_en = indexes.CharField(model_attr='sex_en', faceted=True, null=True)
    sex_ar = indexes.CharField(model_attr='sex_ar', null=True, faceted=True)
    civilian_en = indexes.CharField(
        model_attr='civilian_en', faceted=True, null=True)
    civilian_ar = indexes.CharField(
        model_attr='civilian_ar', null=True, faceted=True)
    occupation_en = indexes.CharField(
        model_attr='occupation_en', null=True, faceted=True)
    occupation_ar = indexes.CharField(
        model_attr='occupation_ar', null=True, faceted=True)
    nationality_en = indexes.CharField(
        model_attr='nationality_en', faceted=True, null=True)
    nationality_ar = indexes.CharField(
        model_attr='nationality_ar', null=True, faceted=True)
    position_en = indexes.CharField(
        model_attr='position_en', null=True, faceted=True)
    position_ar = indexes.CharField(
        model_attr='position_ar', null=True, faceted=True)
    ethnicity_en = indexes.CharField(
        model_attr='ethnicity_en', null=True, faceted=True)
    ethnicity_ar = indexes.CharField(
        model_attr='ethnicity_ar', null=True, faceted=True)
    religion_en = indexes.CharField(
        model_attr='religion_en', null=True, faceted=True)
    religion_ar = indexes.CharField(
        model_attr='religion_ar', null=True, faceted=True)
    spoken_dialect_en = indexes.CharField(
        model_attr='spoken_dialect_en', null=True, faceted=True)
    spoken_dialect_ar = indexes.CharField(
        model_attr='spoken_dialect_ar', null=True, faceted=True)
    count_incidents = indexes.IntegerField()
    count_bulletins = indexes.IntegerField()
    actor_created = indexes.DateTimeField(
        model_attr='actor_created', faceted=True, null=True)
    media = indexes.CharField()
    resource_uri = indexes.CharField()
    POB = indexes.CharField(faceted=True)
    current_location = indexes.CharField(faceted=True)
    roles = indexes.MultiValueField()
    actor_roles_status = indexes.MultiValueField()
    actors_role = indexes.MultiValueField()
    actors = indexes.MultiValueField()
    deleted = indexes.BooleanField()
    thumbnail_url = indexes.CharField()

    actor_comments = indexes.MultiValueField()

    def get_model(self):
        return Actor

    def get_updated_field(self):
        return "actor_modified"

    def prepare_actor_roles_status(self, object):
        """
        Returns a list of all roles and relationships associated with this
        Actor instance
        """
        return ActorPrepMeta().prepare_actor_actor_roles(object)

    def prepare_roles(self, object):
        """
        Returns a list of all roles and relationships associated with this
        Actor instance
        """
        return ActorPrepMeta().prepare_roles(object)

    def prepare_actors(self, object):
        """
        Returns an array of tastypi uris related to the Actor's
        associated actors
        """
        return ActorPrepMeta().prepare_actors(object)

    def prepare_actors_role(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ActorPrepMeta().prepare_actors_role(object)

    def prepare_POB(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        return ActorPrepMeta().prepare_POB(object)

    def prepare_current_location(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        return ActorPrepMeta().prepare_current_location(object)

    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        return ActorPrepMeta().prepare_resource_uri(object)

    def prepare_media(self, object):
        """
        Returns media uri of image associated with given Actor
        """
        return ActorPrepMeta().prepare_media(object)

    def prepare_thumbnail_url(self, object):
        """
        Returns thumbnail AWS url
        """
        return ActorPrepMeta().prepare_thumbnail_url(object)

    def prepare_actor_comments(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        return ActorPrepMeta().prepare_actor_comments(object)
 
    def prepare_count_incidents(self, object):
        """
        Returns count of incident objects associated with a given Actor
        """
        return ActorPrepMeta().prepare_count_incidents(object)

    def prepare_count_bulletins(self, object):
        """
        Returns count of bulletin objects associated with a given Actor
        """
        return ActorPrepMeta().prepare_count_bulletins(object)


class MediaIndex(CelerySearchIndex, indexes.Indexable):
    """
    This document handles the construction of the Media Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    name_en = indexes.CharField(model_attr='name_en', null=True)
    name_ar = indexes.CharField(model_attr='name_en', null=True)
    media_type =  indexes.CharField(model_attr='media_type', null=True)
    media_created = indexes.DateTimeField(model_attr='media_created',
    faceted=True, null=True)
    media_file = indexes.CharField()
    resource_uri = indexes.CharField()
    media_thumb_file = indexes.CharField()
    media_file_type = indexes.CharField(model_attr="media_file_type", null=True)

    def get_model(self):
        return Media
    def get_updated_field(self):
        return "media_created"

    def prepare_media_file(self, object):
        """
        Returns URI of a given Media
        """
        #return object.get_uri()

        if object.media_file.name != '' and object.media_file.name != None:
            return settings.S3_URL + '/' + object.media_file.name
        else:
            ''
    def prepare_media_thumb_file(self, object):
        #return object.get_thumb_uri()
        if object.media_thumb_file.name != '' and object.media_thumb_file.name != None:
            return settings.S3_URL + '/' + object.media_thumb_file.name
        else:
            ''
    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this media instance
        for the tastypie api
        """
        return '/api/v1/media/{0}/'.format(object.id)


class IncidentIndex(CelerySearchIndex, indexes.Indexable):
    """
    This document handles the construction of the Incident Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    incident_details_en = indexes.CharField(model_attr='incident_details_en',
    null=True)
    incident_details_ar = indexes.CharField(model_attr='incident_details_ar',
    null=True)
    title_en = indexes.CharField(model_attr='title_en', null=True)
    title_ar = indexes.CharField(model_attr='title_ar', null=True)
    confidence_score = indexes.IntegerField(model_attr='confidence_score',
    null=True, faceted=True)
    incident_times = indexes.MultiValueField(faceted=True)
    incident_locations = indexes.MultiValueField(faceted=True)
    incident_labels = indexes.MultiValueField(faceted=True)
    count_actors = indexes.IntegerField()
    count_bulletins = indexes.IntegerField()
    count_incidents = indexes.IntegerField()
    incident_assigned_user = indexes.CharField(default='unassigned',model_attr='assigned_user',
    faceted=True, null=True)
    assigned_user = indexes.CharField()
    most_recent_status_incident = indexes.CharField(faceted=True)
    incident_created = indexes.DateTimeField(model_attr='incident_created',
    faceted=True, null=True)
    incident_comments_text = indexes.MultiValueField()
    deleted = indexes.BooleanField()


    resource_uri = indexes.CharField()
    actors_role = indexes.MultiValueField()
    actors = indexes.MultiValueField()

    incident_crimes = indexes.MultiValueField(faceted=True)
    ref_incidents = indexes.MultiValueField()
    labels = indexes.MultiValueField()
    ref_bulletins = indexes.MultiValueField()
    actor_roles_status = indexes.MultiValueField()
    crimes = indexes.MultiValueField()
    incident_comments = indexes.MultiValueField()
    times = indexes.MultiValueField()

    def get_model(self):
        return Incident
    def get_updated_field(self):
        return "incident_modified"

    def prepare_assigned_user(self, object):
        return IncidentPrepMeta().prepare_assigned_user(object)

    def prepare_times(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return IncidentPrepMeta().prepare_times(object)
    def prepare_ref_incidents(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return IncidentPrepMeta().prepare_ref_incidents(object)

    def prepare_labels(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return IncidentPrepMeta().prepare_labels(object)
    def prepare_ref_bulletins(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return IncidentPrepMeta().prepare_ref_bulletins(object)

    def prepare_actor_roles_status(self, object):
        """
        Returns a list of all roles and relationships associated with this
        Actor instance
        """
        return IncidentPrepMeta().prepare_incident_actor_roles(object)

    def prepare_actors(self, object):
        """
        Returns an array of tastypi uris related to the Actor's
        associated actors
        """
        return ActorPrepMeta().prepare_actors(object)
    def prepare_actors_role(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ActorPrepMeta().prepare_actors_role(object)


    def prepare_crimes(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return IncidentPrepMeta().prepare_crimes(object)
    def prepare_incident_comments(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return IncidentPrepMeta().prepare_incident_comments(object)
    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return IncidentPrepMeta().prepare_resource_uri(object)
    def prepare_most_recent_status_incident(self,object):
        """
        Returns moste recent status associated with a given Incident
        """
        return IncidentPrepMeta().prepare_most_recent_status_incident(object)

    def prepare_incident_labels(self, object):
        """
        Returns set of label objects associated with a given Incident
        """
        return IncidentPrepMeta().prepare_incident_labels(object)

    def prepare_count_actors(self, object):
        """
        Returns count of Actor objects associated with a given Incident
        """
        return IncidentPrepMeta().prepare_count_actors(object)
    def prepare_count_incidents(self, object):
        """
        Returns count of Incident objects associated with a given Incident
        """
        return IncidentPrepMeta().prepare_count_incidents(object)

    def prepare_count_bulletins(self, object):
        """
        Returns count of Bulletin objects associated with a given Incident
        """
        return IncidentPrepMeta().prepare_count_bulletins(object)

    def prepare_incident_locations(self, object):
        """
        Returns set of location objects associated with a given Incident
        """
        return IncidentPrepMeta().prepare_locations(object)

    def prepare_incident_times(self, object):
        """
        Returns set of time objects associated with a given Incident
        """
        return IncidentPrepMeta().prepare_incident_times(object)

    def prepare_incident_crimes(self, object):
        """
        Returns set of crime objects associated with a given incident
        """
        return IncidentPrepMeta().prepare_incident_crimes(object)


class BulletinIndex(CelerySearchIndex, indexes.Indexable):
    """
    This document handles the construction of the Bulletin Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    description_en = indexes.CharField(model_attr='description_en', null=True)
    description_ar = indexes.CharField(model_attr='description_ar', null=True)
    title_en = indexes.CharField(model_attr='title_en', null=True)
    title_ar = indexes.CharField(model_attr='title_ar', null=True)
    confidence_score = indexes.IntegerField(model_attr='confidence_score',
    null=True, faceted=True)
    type = indexes.CharField(model_attr='type', null=True)
    bulletin_times = indexes.MultiValueField(faceted=True, null=True)
    bulletin_locations = indexes.MultiValueField(faceted=True)
    bulletin_labels = indexes.MultiValueField(faceted=True, null=True)
    bulletin_sources = indexes.MultiValueField(faceted=True, null=True)
    count_actors = indexes.IntegerField()
    bulletin_assigned_user = indexes.CharField(default="unassigned", model_attr='assigned_user', \
    faceted=True, null=True)
    assigned_user = indexes.CharField()
    most_recent_status_bulletin = indexes.CharField(faceted=True,
    null=True)
    bulletin_created = indexes.DateTimeField(model_attr='bulletin_created', \
    faceted=True, null=True)

    resource_uri = indexes.CharField()
    ref_bulletins = indexes.MultiValueField()
    medias = indexes.MultiValueField()
    labels = indexes.MultiValueField()
    actors_role = indexes.MultiValueField()
    actor_roles_status = indexes.MultiValueField()
    actors = indexes.MultiValueField()

    sources = indexes.MultiValueField()
    bulletin_comments = indexes.MultiValueField()
    bulletin_imported_comments = indexes.MultiValueField()
    times = indexes.MultiValueField()

    def get_model(self):
        return Bulletin

    def get_updated_field(self):
        return "bulletin_modified"

    def prepare_assigned_user(self, object):
        return BulletinPrepMeta().prepare_assigned_user(object)

    def prepare_times(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return BulletinPrepMeta().prepare_times(object)

    def prepare_ref_bulletins(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return BulletinPrepMeta().prepare_ref_bulletins(object)
    def prepare_labels(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return BulletinPrepMeta().prepare_labels(object)
    def prepare_actor_roles_status(self, object):
        """
        Returns a list of all roles and relationships associated with this
        Actor instance
        """
        return BulletinPrepMeta().prepare_bulletin_actor_roles(object)
    def prepare_actors(self, object):
        """
        Returns an array of tastypi uris related to the Actor's
        associated actors
        """
        return ActorPrepMeta().prepare_actors(object)
    def prepare_actors_role(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ActorPrepMeta().prepare_actors_role(object)

    def prepare_sources(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return BulletinPrepMeta().prepare_sources(object)
    def prepare_bulletin_comments(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return BulletinPrepMeta().prepare_bulletin_comments(object)
    
    def prepare_bulletin_imported_comments(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return BulletinPrepMeta().prepare_bulletin_imported_comments(object)

    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return BulletinPrepMeta().prepare_resource_uri(object)
    def prepare_most_recent_status_bulletin(self, object):
        """
        Returns most recently created status update associated with a given Bulletin
        """
        return BulletinPrepMeta().prepare_most_recent_status_bulletin(object)

    def prepare_medias(self, object):
        """
        Returns set of media objects associated with a given Bulletin
        """
        return BulletinPrepMeta().prepare_medias(object)

    def prepare_bulletin_labels(self, object):
        """
        Returns set of label objects associated with a given Bulletin
        """
        return BulletinPrepMeta().prepare_bulletin_labels(object)

    def prepare_count_actors(self, object):
        """
        Returns count of Actor objects associated with a given Bulletin
        """
        return BulletinPrepMeta().prepare_count_actors(object)

    def prepare_bulletin_sources(self, object):
        """
        Returns set of Source objects associated with a given Bulletin
        """
        return BulletinPrepMeta().prepare_bulletin_sources(object)

    def prepare_bulletin_locations(self, object):
        """
        Returns set of location objects associated with a given Bulletin
        """
        return BulletinPrepMeta().prepare_locations(object)

    def prepare_bulletin_times(self, object):
        """
        Returns set of time objects associated with a given Bulletin
        """
        return BulletinPrepMeta().prepare_bulletin_times(object)

class LocationIndex(CelerySearchIndex, indexes.Indexable):
    """
    This document handles the construction of the Location Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name_en', null=True)
    location_type = indexes.CharField(model_attr='loc_type', null=True)
    parent_text = indexes.CharField(model_attr='parent_text', null=True)
    location = indexes.LocationField(model_attr='get_location', null=True)

    def get_model(self):
        return Location
    def get_updated_field(self):
        return "location_modified"

