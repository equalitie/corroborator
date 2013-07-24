"""
This file handles the construction of Solr entities based on the existing MySQL
database model using Django Haystacks as an interface.
"""
from haystack import indexes
from corroborator_app.models import Bulletin, Location, Incident, Label, Actor, Media

class ActorIndex(indexes.SearchIndex, indexes.Indexable):
    """
    This class manages the construction of the Actor Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    lives_in = indexes.CharField(model_attr='current_location', null=True)
    dob = indexes.DateField(model_attr='DOB', null=True)
    pob = indexes.CharField(model_attr='POB', null=True)
    fullname_en = indexes.CharField(model_attr='fullname_en', null=True)
    fullname_ar = indexes.CharField(model_attr='fullname_ar', null=True)
    nickname_en = indexes.CharField(model_attr='nickname_en', null=True)
    nickname_ar = indexes.CharField(model_attr='nickname_ar', null=True)
    age_en = indexes.CharField(model_attr='age_en', faceted=True, null=True)
    age_ar = indexes.CharField(model_attr='age_ar', null=True)
    sex_en = indexes.CharField(model_attr='sex_en', faceted=True, null=True)
    sex_ar = indexes.CharField(model_attr='sex_ar', null=True)
    civilian_en = indexes.CharField(model_attr='civilian_en', \
    faceted=True, null=True)
    civilian_ar = indexes.CharField(model_attr='civilian_ar', null=True)
    occupation_en = indexes.CharField(model_attr='occupation_en', null=True)
    occupation_ar = indexes.CharField(model_attr='occupation_ar', null=True)
    nationality_en = indexes.CharField(model_attr='nationality_en', \
    faceted=True, null=True)
    nationality_ar = indexes.CharField(model_attr='nationality_ar', null=True)
    position_en = indexes.CharField(model_attr='position_en', null=True)
    position_ar = indexes.CharField(model_attr='position_ar', null=True)
    ethnicity_en = indexes.CharField(model_attr='ethnicity_en', null=True)
    ethnicity_ar = indexes.CharField(model_attr='ethnicity_ar', null=True)
    religion_en = indexes.CharField(model_attr='religion_en', null=True)
    religion_ar = indexes.CharField(model_attr='religion_ar', null=True)
    spoken_dialect_en = indexes.CharField(model_attr='spoken_dialect_en',
    null=True)
    spoken_dialect_ar = indexes.CharField(model_attr='spoken_dialect_ar',
    null=True)
    count_incidents = indexes.MultiValueField()
    count_bulletins = indexes.MultiValueField()
    actor_created = indexes.DateTimeField(model_attr='actor_created', \
    faceted=True, null=True)
    media_uri = indexes.MultiValueField()

    def get_model(self):
        return Actor
    def prepare_media_uri(self, object):
        """
        Returns media uri of image associated with given Actor
        """
        if object.media != None:
            return object.media.media_file.name
        else:
            return ''
    def prepare_count_incidents(self, object):
        """
        Returns count of incident objects associated with a given Actor
        """
        roles = object.actorrole_set.all()
        return Incident.objects.filter(actors_role__in=roles).count()
    def prepare_count_bulletins(self, object):
        """
        Returns count of bulletin objects associated with a given Actor
        """
        roles = object.actorrole_set.all()
        return Bulletin.objects.filter(actors_role__in=roles).count()

#class LabelIndex(indexes.SearchIndex, indexes.Indexable):
    #"""
    #This document handles the construction of the Label Solr document.
    #"""
    #text = indexes.CharField(document=True, use_template=True)
    #name_en = indexes.CharField(model_attr='name_en', null=True)
    #name_ar = indexes.CharField(model_attr='name_ar', null=True)
    #description_en = indexes.CharField(model_attr='description_en', null=True)
    #description_ar = indexes.CharField(model_attr='description_ar', null=True)

    #def get_model(self):
        #return Label

class MediaIndex(indexes.SearchIndex, indexes.Indexable):
    """
    This document handles the construction of the Media Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name_en', null=True)
    uri = indexes.MultiValueField()

    def get_model(self):
        return Media
    def prepare_uri(self,object):
        """
        Returns URI of a given Media
        """
        return object.get_uri()


class IncidentIndex(indexes.SearchIndex, indexes.Indexable):
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
    null=True)
    actors_role = indexes.MultiValueField()
    crimes = indexes.MultiValueField(faceted=True)
    incident_times = indexes.MultiValueField(faceted=True)
    locations = indexes.MultiValueField()
    incident_labels = indexes.MultiValueField(faceted=True)
    count_actors = indexes.MultiValueField()
    count_bulletins = indexes.MultiValueField()
    count_incidents = indexes.MultiValueField()
    incident_assigned = indexes.CharField(model_attr='assigned_user',
    faceted=True, null=True)
    most_recent_status_incident = indexes.MultiValueField(faceted=True)
    incident_created = indexes.DateTimeField(model_attr='incident_created',
    faceted=True, null=True)

    def get_model(self):
        return Incident
    def prepare_most_recent_status_incident(self,object):
        """
        Returns moste recent status associated with a given Incident
        """
        status = object.incident_comments.values('status__status_en').order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''

    def prepare_incident_labels(self, object):
        """
        Returns set of label objects associated with a given Incident
        """
        return [label.name_en for label in object.labels.all()]

    def prepare_count_actors(self, object):
        """
        Returns count of Actor objects associated with a given Incident
        """
        return object.actors_role.count()
    def prepare_count_incidents(self, object):
        """
        Returns count of Incident objects associated with a given Incident
        """
        return object.ref_incidents.count()

    def prepare_count_bulletins(self, object):
        """
        Returns count of Bulletin objects associated with a given Incident
        """
        return object.bulletins.count()

    def prepare_locations(self, object):
        """
        Returns set of location objects associated with a given Incident
        """
        return [location.name_en for location in object.locations.all()]

    def prepare_incident_times(self, object):
        """
        Returns set of time objects associated with a given Incident
        """
        return [time.time_from for time in object.times.all()]

    def prepare_crimes(self, object):
        """
        Returns set of crime objects associated with a given incident
        """
        return [crime.name_en for crime in object.crimes.all()]


class BulletinIndex(indexes.SearchIndex, indexes.Indexable):
    """
    This document handles the construction of the Bulletin Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    description_en = indexes.CharField(model_attr='description_en', null=True)
    description_ar = indexes.CharField(model_attr='description_ar', null=True)
    title_en = indexes.CharField(model_attr='title_en', null=True)
    title_ar = indexes.CharField(model_attr='title_ar', null=True)
    confidence_score = indexes.IntegerField(model_attr='confidence_score',
    null=True)
    type = indexes.CharField(model_attr='type', null=True)
    bulletin_times = indexes.MultiValueField(faceted=True, null=True)
    locations = indexes.MultiValueField()
    bulletin_labels = indexes.MultiValueField(faceted=True, null=True)
    sources = indexes.MultiValueField(faceted=True, null=True)
    count_actors = indexes.MultiValueField()
    actors_role = indexes.MultiValueField()
    medias = indexes.MultiValueField()
    bulletin_assigned = indexes.CharField(model_attr='assigned_user', \
    faceted=True, null=True)
    most_recent_status_bulletin = indexes.MultiValueField(faceted=True,
    null=True)
    bulletin_created = indexes.DateTimeField(model_attr='bulletin_created', \
    faceted=True, null=True)

    #bulletins = indexes.MultiValueField()
    def get_model(self):
        return Bulletin
    def prepare_most_recent_status_bulletin(self, object):
        """
        Returns most recently created status update associated with a given Bulletin
        """
        status = object.bulletin_comments.values('status__status_en').order_by('comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''

    def prepare_medias(self, object):
        """
        Returns set of media objects associated with a given Bulletin
        """
        return [media.name_en for media in object.medias.all()]

    def prepare_bulletin_labels(self, object):
        """
        Returns set of label objects associated with a given Bulletin
        """
        return [label.name_en for label in object.labels.all()]

    def prepare_count_actors(self, object):
        """
        Returns count of Actor objects associated with a given Bulletin
        """
        return object.actors_role.count()

    def prepare_sources(self, object):
        """
        Returns set of Source objects associated with a given Bulletin
        """
        return [source.name_en for source in object.sources.all()]

    def prepare_locations(self, object):
        """
        Returns set of location objects associated with a given Bulletin
        """
        return [location.name_en for location in object.locations.all()]

    def prepare_bulletin_times(self, object):
        """
        Returns set of time objects associated with a given Bulletin
        """
        return [time.time_from for time in object.times.all()]


class LocationIndex(indexes.SearchIndex, indexes.Indexable):
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
