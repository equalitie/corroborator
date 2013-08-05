"""
This file handles the construction of Solr entities based on the existing MySQL
database model using Django Haystacks as an interface.
"""
from haystack import indexes
from corroborator_app.models import Bulletin, Location, \
    Incident, Actor, Media


class ActorIndex(indexes.SearchIndex, indexes.Indexable):
    """
    This class manages the construction of the Actor Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    current_location = indexes.CharField(model_attr='current_location', null=True)
    dob = indexes.DateField(model_attr='DOB', null=True, faceted=True)
    pob = indexes.CharField(model_attr='POB', null=True)
    fullname_en = indexes.CharField(model_attr='fullname_en', null=True)
    fullname_ar = indexes.CharField(model_attr='fullname_ar', null=True)
    nickname_en = indexes.CharField(model_attr='nickname_en', null=True)
    nickname_ar = indexes.CharField(model_attr='nickname_ar', null=True)
    age_en = indexes.CharField(model_attr='age_en', faceted=True, null=True)
    age_ar = indexes.CharField(model_attr='age_ar', null=True, faceted=True)
    sex_en = indexes.CharField(model_attr='sex_en', faceted=True, null=True)
    sex_ar = indexes.CharField(model_attr='sex_ar', null=True, faceted=True)
    civilian_en = indexes.CharField(model_attr='civilian_en', \
    faceted=True, null=True)
    civilian_ar = indexes.CharField(model_attr='civilian_ar', null=True,
    faceted=True)
    occupation_en = indexes.CharField(model_attr='occupation_en',
    null=True, faceted=True)
    occupation_ar = indexes.CharField(model_attr='occupation_ar', null=True, faceted=True)
    nationality_en = indexes.CharField(model_attr='nationality_en', \
    faceted=True, null=True)
    nationality_ar = indexes.CharField(model_attr='nationality_ar', null=True, faceted=True)
    position_en = indexes.CharField(model_attr='position_en', null=True, faceted=True)
    position_ar = indexes.CharField(model_attr='position_ar', null=True, faceted=True)
    ethnicity_en = indexes.CharField(model_attr='ethnicity_en', null=True, faceted=True)
    ethnicity_ar = indexes.CharField(model_attr='ethnicity_ar', null=True, faceted=True)
    religion_en = indexes.CharField(model_attr='religion_en', null=True, faceted=True)
    religion_ar = indexes.CharField(model_attr='religion_ar', null=True, faceted=True)
    spoken_dialect_en = indexes.CharField(model_attr='spoken_dialect_en',
    null=True, faceted=True)
    spoken_dialect_ar = indexes.CharField(model_attr='spoken_dialect_ar',
    null=True, faceted=True)
    count_incidents = indexes.IntegerField()
    count_bulletins = indexes.IntegerField()
    actor_created = indexes.DateTimeField(model_attr='actor_created', \
    faceted=True, null=True)
    media = indexes.CharField()
    resource_uri = indexes.CharField()
    POB = indexes.CharField()
    current_location = indexes.CharField()

    def get_model(self):
        return Actor
    def prepare_POB(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        if object.POB != None:
            return '/api/v1/location/{0}/'.format(object.POB.id)
        else:
            return ''
    def prepare_current_location(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        if object.current_location != None:
            return '/api/v1/location/{0}/'.format(object.current_location.id)
        else:
            return ''
    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        return '/api/v1/actor/{0}/'.format(object.id)
    def prepare_media(self, object):
        """
        Returns media uri of image associated with given Actor
        """
        if object.media != None:
            #return object.media.media_file.name
            return '/api/v1/media/{0}/'.format(object.media.id)
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


class MediaIndex(indexes.SearchIndex, indexes.Indexable):
    """
    This document handles the construction of the Media Solr document.
    """
    text = indexes.CharField(document=True, use_template=True)
    name_en = indexes.CharField(model_attr='name_en', null=True)
    name_ar = indexes.CharField(model_attr='name_en', null=True)
    media_type =  indexes.CharField(model_attr='media_type', null=True)
    media_created = indexes.DateTimeField(model_attr='media_created',
    faceted=True, null=True)
    uri = indexes.MultiValueField()
    resource_uri = indexes.CharField()

    def get_model(self):
        return Media
    def prepare_uri(self,object):
        """
        Returns URI of a given Media
        """
        return object.get_uri()
    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this media instance
        for the tastypie api
        """
        return '/api/v1/media/{0}/'.format(object.id)


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
    null=True, faceted=True)
    incident_times = indexes.MultiValueField(faceted=True)
    incident_locations = indexes.MultiValueField()
    incident_labels = indexes.MultiValueField(faceted=True)
    count_actors = indexes.IntegerField()
    count_bulletins = indexes.IntegerField()
    count_incidents = indexes.IntegerField()
    incident_assigned_user = indexes.CharField(model_attr='assigned_user',
    faceted=True, null=True)
    assigned_user = indexes.CharField()
    most_recent_status_incident = indexes.MultiValueField(faceted=True)
    incident_created = indexes.DateTimeField(model_attr='incident_created',
    faceted=True, null=True)
    incident_comments_text = indexes.MultiValueField()


    resource_uri = indexes.CharField()
    actors_role = indexes.MultiValueField()
    incident_crimes = indexes.MultiValueField(faceted=True)
    ref_incidents = indexes.MultiValueField()
    locations = indexes.MultiValueField()
    labels = indexes.MultiValueField()
    bulletins = indexes.MultiValueField()
    incident_actors_role = indexes.MultiValueField()
    crimes = indexes.MultiValueField()
    incident_comments = indexes.MultiValueField()

    def get_model(self):
        return Incident
    def prepare_assigned_user(self, object):
        if object.assigned_user != None:
            return '/api/v1/user/{0}/'.format(object.assigned_user.id)
        else:
            return ''

    def prepare_ref_incidents(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/incident/{0}/'.format(incident.id) for incident in object.ref_incidents.all()]
    def prepare_locations(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/location/{0}/'.format(location.id) for location in object.locations.all()]
    def prepare_labels(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/label/{0}/'.format(label.id) for label in object.labels.all()]
    def prepare_bulletins(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/bulletin/{0}/'.format(bulletin.id) for bulletin in object.bulletins.all()]
    def prepare_actors_role(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/actorRole/{0}/'.format(actor_role.id) for actor_role in object.actors_role.all()]
    def prepare_crimes(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/crimeCategory/{0}/'.format(crime.id) for crime in object.crimes.all()]
    def prepare_incident_comments(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/comment/{0}/'.format(comment.id) for comment in object.incident_comments.all()]
    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return '/api/v1/incident/{0}/'.format(object.id)
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

    def prepare_incident_locations(self, object):
        """
        Returns set of location objects associated with a given Incident
        """
        return [location.name_en for location in object.locations.all()]

    def prepare_incident_times(self, object):
        """
        Returns set of time objects associated with a given Incident
        """
        return [time.time_from for time in object.times.all()]

    def prepare_incident_crimes(self, object):
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
    null=True, faceted=True)
    type = indexes.CharField(model_attr='type', null=True)
    bulletin_times = indexes.MultiValueField(faceted=True, null=True)
    bulletin_locations = indexes.MultiValueField()
    bulletin_labels = indexes.MultiValueField(faceted=True, null=True)
    bulletin_sources = indexes.MultiValueField(faceted=True, null=True)
    count_actors = indexes.IntegerField()
    bulletin_assigned_user = indexes.CharField(model_attr='assigned_user', \
    faceted=True, null=True)
    assigned_user = indexes.CharField()
    most_recent_status_bulletin = indexes.MultiValueField(faceted=True,
    null=True)
    bulletin_created = indexes.DateTimeField(model_attr='bulletin_created', \
    faceted=True, null=True)
    
    resource_uri = indexes.CharField()
    ref_bulletins = indexes.MultiValueField()
    medias = indexes.MultiValueField()
    locations = indexes.MultiValueField()
    labels = indexes.MultiValueField()
    actors_role = indexes.MultiValueField()
    sources = indexes.MultiValueField()
    bulletin_comments = indexes.MultiValueField()
    times = indexes.MultiValueField()

    def get_model(self):
        return Bulletin

    def prepare_assigned_user(self, object):
        if object.assigned_user != None:
            return '/api/v1/user/{0}/'.format(object.assigned_user.id)
        else:
            return ''
    def prepare_times(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/timeInfo/{0}/'.format(timeinfo.id) for timeinfo in
        object.times.all()]
 
    def prepare_ref_bulletins(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/bulletin/{0}/'.format(bulletin.id) for bulletin in
        object.ref_bulletins.all()]
    def prepare_locations(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/location/{0}/'.format(location.id) for location in object.locations.all()]
    def prepare_labels(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/label/{0}/'.format(label.id) for label in object.labels.all()]
    def prepare_actors_role(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/actorRole/{0}/'.format(actor_role.id) for actor_role in object.actors_role.all()]
    def prepare_sources(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/source/{0}/'.format(source.id) for source in object.sources.all()]
    def prepare_bulletin_comments(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/comment/{0}/'.format(comment.id) for comment in object.bulletin_comments.all()]

    def prepare_resource_uri(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return '/api/v1/bulletin/{0}/'.format(object.id)
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
        return ['/api/v1/media/{0}/'.format(media.id) for media in object.medias.all()]

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

    def prepare_bulletin_sources(self, object):
        """
        Returns set of Source objects associated with a given Bulletin
        """
        return [source.name_en for source in object.sources.all()]

    def prepare_bulletin_locations(self, object):
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
