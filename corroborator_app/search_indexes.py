from haystack import indexes
from django.db.models import Min, Max
from corroborator_app.models import Bulletin, Location, Incident, Label, Actor, Media

class ActorIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    lives_in = indexes.CharField(model_attr='current_location',null=True)
    dob = indexes.DateField(model_attr='DOB',null=True)
    pob = indexes.CharField(model_attr='POB',null=True)
    fullname_en = indexes.CharField(model_attr='fullname_en')
    fullname_ar = indexes.CharField(model_attr='fullname_ar')
    nickname_en = indexes.CharField(model_attr='nickname_en')
    nickname_ar = indexes.CharField(model_attr='nickname_ar')
    age_en = indexes.CharField(model_attr='age_en',faceted=True)
    age_ar = indexes.CharField(model_attr='age_ar')
    sex_en = indexes.CharField(model_attr='sex_en',faceted=True)
    sex_ar = indexes.CharField(model_attr='sex_ar')
    civilian_en = indexes.CharField(model_attr='civilian_en', faceted=True)
    civilian_ar = indexes.CharField(model_attr='civilian_ar')
    occupation_en = indexes.CharField(model_attr='occupation_en')
    occupation_ar = indexes.CharField(model_attr='occupation_ar')
    nationality_en = indexes.CharField(model_attr='nationality_en', faceted=True)
    nationality_ar = indexes.CharField(model_attr='nationality_ar')
    position_en = indexes.CharField(model_attr='position_en')
    position_ar = indexes.CharField(model_attr='position_ar')
    ethnicity_en = indexes.CharField(model_attr='ethnicity_en')
    ethnicity_ar = indexes.CharField(model_attr='ethnicity_ar')
    religion_en = indexes.CharField(model_attr='religion_en')
    religion_ar = indexes.CharField(model_attr='religion_ar')
    spoken_dialect_en = indexes.CharField(model_attr='spoken_dialect_en')
    spoken_dialect_ar = indexes.CharField(model_attr='spoken_dialect_ar')
    count_incidents = indexes.MultiValueField()
    count_bulletins = indexes.MultiValueField()
    actor_created = indexes.DateTimeField(model_attr='actor_created', faceted=True)
    media_uri = indexes.MultiValueField()

    def get_model(self):
        return Actor

    def prepare_media_uri(self, object):
        if object.media is not None:
            return object.media.media_file.name
        else:
            return ''

    def prepare_count_incidents(self, object):
        roles = object.role_set.all()
        return Incident.objects.filter(actors_role__in=roles).count()

    def prepare_count_bulletins(self, object):
        roles = object.role_set.all()
        return Bulletin.objects.filter(actors_role__in=roles).count()


class LabelIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    name_en = indexes.CharField(model_attr='name_en')
    name_ar = indexes.CharField(model_attr='name_ar')
    description_en = indexes.CharField(model_attr='description_en')
    description_ar = indexes.CharField(model_attr='description_ar')

    def get_model(self):
        return Label


class MediaIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name_en')
    uri = indexes.MultiValueField()

    def get_model(self):
        return Media

    def prepare_uri(self, object):
        return object.get_uri()


class IncidentIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    incident_details_en = indexes.CharField(model_attr='incident_details_en')
    incident_details_ar = indexes.CharField(model_attr='incident_details_ar')
    title_en = indexes.CharField(model_attr='title_en')
    title_ar = indexes.CharField(model_attr='title_ar')
    confidence_score = indexes.IntegerField(model_attr='confidence_score')
    actors_role = indexes.MultiValueField()
    crimes = indexes.MultiValueField(faceted=True)
    incident_times = indexes.MultiValueField(faceted=True)
    locations = indexes.MultiValueField()
    incident_labels = indexes.MultiValueField(faceted=True)
    count_actors = indexes.MultiValueField()
    count_bulletins = indexes.MultiValueField()
    count_incidents = indexes.MultiValueField()
    incident_assigned = indexes.CharField(model_attr='assigned_user', faceted=True)
    most_recent_status_incident = indexes.MultiValueField(faceted=True)
    incident_created = indexes.DateTimeField(model_attr='incident_created', faceted=True)

    def get_model(self):
        return Incident

    def prepare_most_recent_status_incident(self, object):
        status = object.incident_comments.values('status__status_en').order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''

    def prepare_incident_labels(self, object):
        return [label.name_en for label in object.labels.all()]

    def prepare_count_actors(self, object):
        return object.actors_role.count()

    # TODO - find out why this is here twice
    def prepare_count_bulletins(self, object):
        return object.ref_incidents.count()

    def prepare_count_bulletins(self, object):
        return object.bulletins.count()

    def prepare_locations(self, object):
        return [location.name_en for location in object.locations.all()]

    def prepare_incident_times(self, object):
        return [time.time_from for time in object.times.all()]

    def prepare_crimes(self, object):
        return [crime.category_en for crime in object.crimes.all()]


class BulletinIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    description_en = indexes.CharField(model_attr='description_en')
    description_ar = indexes.CharField(model_attr='description_ar')
    title_en = indexes.CharField(model_attr='title_en')
    title_ar = indexes.CharField(model_attr='title_ar')
    confidence_score = indexes.IntegerField(model_attr='confidence_score')
    type = indexes.CharField(model_attr='type')
    bulletin_times = indexes.MultiValueField(faceted=True)
    locations = indexes.MultiValueField()
    bulletin_labels = indexes.MultiValueField(faceted=True)
    sources = indexes.MultiValueField(faceted=True)
    count_actors = indexes.MultiValueField()
    actors_role = indexes.MultiValueField()
    medias = indexes.MultiValueField()
    bulletin_assigned = indexes.CharField(model_attr='assigned_user', faceted=True)
    most_recent_status_bulletin = indexes.MultiValueField(faceted=True)
    bulletin_created = indexes.DateTimeField(model_attr='bulletin_created', faceted=True)

    #bulletins = indexes.MultiValueField()
    def get_model(self):
        return Bulletin

    def prepare_most_recent_status_bulletin(self, object):
        status = object.bulletin_comments.values('status__status_en').order_by('comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''

    def prepare_medias(self, object):
        return [media.name_en for media in object.medias.all()]

    def prepare_bulletin_labels(self, object):
        return [label.name_en for label in object.labels.all()]

    def prepare_count_actors(self, object):
        return object.actors_role.count()

    def prepare_sources(self, object):
        return [source.name_en for source in object.sources.all()]

    def prepare_locations(self, object):
        return [location.name_en for location in object.locations.all()]

    def prepare_bulletin_times(self, object):
        return [time.time_from for time in object.times.all()]


class LocationIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name_en')
    location_type = indexes.CharField(model_attr='loc_type')
    parent_text = indexes.CharField(model_attr='parent_text')
    location = indexes.LocationField(model_attr='get_location')

    def get_model(self):
        return Location
