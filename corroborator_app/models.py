"""
This file describes the Model entities and their relations for the Corroborator
application.

Author: Bill Doran
2013/02/01
"""

from haystack.utils.geo import Point
from django.db import models
from django.db.models import Min,  Max
from django.contrib.auth.models import User
from queued_storage.backends import QueuedStorage

from reversion.models import Revision


class VersionStatus(models.Model):
    """
    TODO - add docstring
    """
    revision = models.OneToOneField(Revision)  # This is required
    status = models.CharField(max_length=255)


class SolrUpdate(models.Model):
    """
    Store most recent solr index update
    used by the UI to poll for newest updates
    """
    user = models.ForeignKey(User)
    update_timestamp = models.DateTimeField(auto_now=True)


class PredefinedSearch(models.Model):
    """
    This object stores past searches for a given user as a URL string
    that represents all filters applied for a given search type.
    """
    user = models.ForeignKey(User, null=True, blank=True)
    search_title = models.TextField(null=True, blank=True)
    search_string = models.TextField(null=True, blank=True)
    actor_filters = models.TextField(null=True, blank=True)
    incident_filters = models.TextField(null=True, blank=True)
    bulletin_filters = models.TextField(null=True, blank=True)
    make_global = models.BooleanField()


class StatusUpdate(models.Model):
    """
    This object represents a comment status update. It records the
    the change in state of a Bulletin or Incident based on a user's
    actions.
    """
    status_en = models.CharField(max_length=255)
    status_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, null=True, blank=True)

    def __unicode__(self):
        return self.status_en

    class Meta:
        permissions = (
            ("can_update_to_finalized", "Can finalize an entity"),
            ("can_update", "Can update"),
            ("can_update_to_reviewed", "Can review and entity"),
        )


class Comment(models.Model):
    """
    This object represents a system comment and acts as part of the
    systems audit trail. It can be related to either Bulletins or Incidents.
    """
    assigned_user = models.ForeignKey(User)
    status = models.ForeignKey(StatusUpdate, blank=True, null=True)
    comments_en = models.TextField(blank=True)
    comments_ar = models.TextField(blank=True, null=True)
    comment_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        """
        This class is used by Django Haystack in construction of
        the Solr index to determine sort order for returned results.
        """
        ordering = ['comment_created']
    #def __unicode__(self):
        #desc = self.comments_en
        #return desc
        #print self.status
        #if self.status:
            #desc = '[0] - [1]'.format(self.comments_en, self.status.status_en)

        #return desc


class TimeInfo(models.Model):
    """
    This object captures the time aspect of an event for
    either a Bulletin or Incident/
    """
    time_from = models.DateTimeField(blank=True, null=True)
    time_to = models.DateTimeField(blank=True, null=True)
    comments_en = models.TextField(blank=True, null=True)
    comments_ar = models.TextField(blank=True, null=True)
    event_name_en = models.CharField(
        'event name en', max_length=255, blank=True, null=True)
    event_name_ar = models.CharField(
        'event name ar', max_length=255, blank=True, null=True)
    confidence_score = models.IntegerField(null=True, blank=True, max_length=3)

    def __unicode__(self):
        return self.event_name_en


class Location(models.Model):
    """
    This object represents a geographical location. It is possible for
    locations to be linked together as a hierarchical chain in order
    to represent sub regions,  provinces,  towns,  cities,  etc.
    """
    LOC_TYPE = (
        ('G', 'Governates'),
        ('D', 'Districts'),
        ('S', 'Subdistricts'),
    )
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    loc_type = models.CharField(
        'location type', max_length=25, choices=LOC_TYPE)
    parent_text = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)
    parent_location = models.ForeignKey(
        'self', max_length=255, blank=True, null=True)
    location_created = models.DateTimeField(auto_now_add=True, null=True)
    location_modified = models.DateTimeField(auto_now=True, null=True)

    def __unicode__(self):
        return self.name_en

    def get_location(self):
        """
        This method is utilised by Django Haystack in
        construction of the Solr index.
        It is responsible for converting the lat/long into a single
        geo point.
        """
        return Point(self.longitude,  self.latitude)


class Label(models.Model):
    """
    This object represents a label tag. it can be applied to either
    a Bulletin or Incident. Multiple labels can be interlinked as
    a chained hierarchy.
    """
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)
    ref_label = models.ForeignKey('self', blank=True, null=True)

    def __unicode__(self):
        return self.name_en


class CrimeCategory(models.Model):
    """
    This object represents a crime category. Multiple crime categories
    can be interlinked as an hierarchical chain.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    level = models.IntegerField(blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, null=True)
    ref_crime = models.ForeignKey('self', blank=True, null=True)
    parent = models.CharField(max_length=255, blank=True, null=True)

    def __unicode__(self):
        return self.name_en


class SourceType(models.Model):
    """
    This object stores the type of a given source.
    """
    source_type = models.CharField('source type', max_length=255)
    description = models.TextField(blank=True, null=True)

    def __unicode__(self):
        return self.source_type


class Source(models.Model):
    """
    This object identifies a Bulletin's source. This can be of multiple types
    news media, social media, witness statements etc.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    reliability_score = models.IntegerField(
        'reliability score', blank=True, max_length=3)
    source_type = models.ForeignKey(SourceType, blank=True, null=True)
    comments_en = models.TextField(blank=True, null=True)
    comments_ar = models.TextField(blank=True, null=True)
    ref_source = models.ForeignKey('self', blank=True, null=True)

    def __unicode__(self):
        return self.name_en


class Dialect(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Dialects for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)


class Position(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Positions for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)


class Occupation(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Occupations for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)


class Ethnicity(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Ethnicities for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)


class Religion(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Religions for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)


class Nationality(models.Model):
    """
    Currently unused.
    Provides means to capture a set of available Nationalities for selection
    by users.
    """
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_ar = models.CharField(max_length=255, blank=True, null=True)


class Media(models.Model):
    """
    The Media object captures represents and individual piece of
    media evidence that can be related to Bulletins.
    """
    #Setup Boto AWS storage access system
    queued_s3storage = QueuedStorage(
        'django.core.files.storage.FileSystemStorage',
        'storages.backends.s3boto.S3BotoStorage')

    TYPE = (
        ('Video', 'video'),
        ('Picture', 'picture'),
        ('Document', 'document'),
    )
    name_en = models.CharField(max_length=255, blank=True, null=True)
    name_ar = models.CharField(max_length=255, blank=True, null=True)
    media_file = models.FileField(upload_to='media', storage=queued_s3storage)
    media_thumb_file = models.FileField(
        upload_to='media',
        #storage=queued_s3storage,
        null=True
    )
    media_type = models.CharField('type', max_length=25, choices=TYPE)
    media_created = models.DateTimeField(auto_now_add=True)
    media_file_type = models.CharField(max_length=255, blank=True, null=True)
    media_created = models.DateTimeField(auto_now_add=True)

    def get_uri(self):
        """
        Return AWS Media file URL.
        This method is primarily used by Django Haystack
        when populating the Solr index.
        """

        return self.media_file.url

    def get_thumb_uri(self):
        """
        Return AWS Media file URL.
        This method is primarily used by Django Haystack
        when populating the Solr index.
        """
        if self.media_thumb_file.name:
            return self.media_thumb_file.url
        else:
            return ''


class Actor(models.Model):
    """
    This object captures the unique properties of an individual Actor
    """
    AGE_TYPE_AR = (
        ('Adult', 'adult'),
        ('Child', 'child'),
    )
    SEX_TYPE_AR = (
        ('Female', 'female'),
        ('Male', 'male'),
    )
    CIVILIAN_TYPE_AR = (
        ('Adult', 'adult'),
        ('Child', 'child'),
    )
    AGE_TYPE_EN = (
        ('Adult', 'adult'),
        ('Child', 'child'),
    )
    SEX_TYPE_EN = (
        ('Female', 'female'),
        ('Male', 'male'),
    )
    CIVILIAN_TYPE_EN = (
        ('Civilian', 'Civilian'),
        ('Non-civilian', 'Non-civilian'),
    )

    fullname_en = models.CharField(max_length=255)
    fullname_ar = models.CharField(max_length=255, blank=True)
    nickname_en = models.CharField(max_length=255, blank=True, null=True)
    nickname_ar = models.CharField(max_length=255, blank=True, null=True)
    age_en = models.CharField(max_length=255, choices=AGE_TYPE_EN, blank=True)
    age_ar = models.CharField(max_length=255, choices=AGE_TYPE_AR, blank=True)
    sex_en = models.CharField(max_length=255, choices=SEX_TYPE_EN, blank=True)
    sex_ar = models.CharField(max_length=255, choices=SEX_TYPE_AR, blank=True)
    civilian_en = models.CharField(
        max_length=255, choices=CIVILIAN_TYPE_EN, blank=True)
    civilian_ar = models.CharField(
        max_length=255, choices=CIVILIAN_TYPE_AR, blank=True)
    DOB = models.DateField('date of birth', blank=True, null=True)
    date_of_death = models.DateField('date of death', blank=True, null=True)
    date_of_disappearance = models.DateField(
        'date of disappearance', blank=True, null=True)
    date_of_return = models.DateField('date of return', blank=True, null=True)
    date_of_detention = models.DateField(
        'date of detention', blank=True, null=True)
    occupation_en = models.CharField(max_length=255, blank=True, null=True)
    occupation_ar = models.CharField(max_length=255, blank=True, null=True)
    nationality_en = models.CharField(max_length=255, blank=True, null=True)
    nationality_ar = models.CharField(max_length=255, blank=True, null=True)
    position_en = models.CharField(max_length=255, blank=True, null=True)
    position_ar = models.CharField(max_length=255, blank=True, null=True)
    ethnicity_en = models.CharField(max_length=255, blank=True, null=True)
    ethnicity_ar = models.CharField(max_length=255, blank=True, null=True)
    religion_en = models.CharField(max_length=255, blank=True, null=True)
    religion_ar = models.CharField(max_length=255, blank=True, null=True)
    spoken_dialect_en = models.CharField(max_length=255, blank=True, null=True)
    spoken_dialect_ar = models.CharField(max_length=255, blank=True, null=True)

    origin_id = models.CharField(max_length=255, blank=True, null=True)
    #source_site = models.CharField(max_length=255, blank=True, null=True)
    age_numeric = models.IntegerField(blank=True, null=True)
    family_name_en = models.CharField(max_length=255, blank=True, null=True)
    family_name_ar = models.CharField(max_length=255, blank=True, null=True)
    national_id_card = models.CharField(max_length=255, blank=True, null=True)
    national_number = models.CharField(max_length=255, blank=True, null=True)
    legal_status_en = models.CharField(max_length=255, blank=True, null=True)
    legal_status_ar = models.CharField(max_length=255, blank=True, null=True)
    health_status_en = models.CharField(max_length=255, blank=True, null=True)
    health_status_ar = models.CharField(max_length=255, blank=True, null=True)

    family_status_en = models.CharField(max_length=255, blank=True, null=True)
    family_status_ar = models.CharField(max_length=255, blank=True, null=True)
    cause_of_death_en = models.CharField(max_length=255, blank=True, null=True)
    cause_of_death_ar = models.CharField(max_length=255, blank=True, null=True)
    """
    This field tracks whether the entitiy has been deleted and should thus be
    ignored by the UI
    """
    deleted = models.BooleanField()
    actor_comments = models.ManyToManyField(Comment, blank=True, null=True)

    # Foreign Keys
    actors_role = models.ManyToManyField(
        'ActorRole', blank=True, null=True, related_name='actors_role')
    POB = models.ForeignKey(
        Location, blank=True, null=True, related_name='POB')
    place_of_death = models.ForeignKey(
        Location, blank=True, null=True, related_name='place_of_death')
    current_location = models.ForeignKey(
        Location, blank=True, null=True, related_name='actor_current')
    disappearance_location = models.ForeignKey(
        Location, blank=True, null=True)

    media = models.ForeignKey(Media, blank=True, null=True)
    actor_created = models.DateTimeField(auto_now_add=True)
    actor_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.fullname_en

    def most_recent_update_by(self):
        """
        Returns the id of the las user you created an update
        for the given Actor
        """
        user_id = self.actor_comments.values('status__user')\
            .order_by('-comment_created')
        return user_id

    def count_bulletins(self):
        """
        This method returns the number of associated Bulletins for a given
        Actor. It is used by Django Haystack in construction of the Solr Index.
        """
        roles = self.ActorRole_set.all()
        return Bulletin.objects.filter(actors_role__in=roles).count()

    def count_incidents(self):
        """
        This method returns the number of associated Incidents for a given
        Actor. It is used by Django Haystack in construction of the Solr Index.
        """
        roles = self.ActorRole_set.all()
        return Incident.objects.filter(actors_role__in=roles).count()


class ActorRelationship(models.Model):
    """
    The Actor Relationship model captures the interrelation between actors.
    This can include shared events, familial connections, insititutional
    relationships or rank.
    """
    RELATION = (
        ('Parent', 'parent'),
        ('Sibling', 'sibling'),
        ('Family member', 'family member'),
        ('Superior officer', 'superior officer'),
        ('Subordinate officer', 'subordiante officer'),
    )
    relation_status = models.CharField(
        'status', max_length=25, choices=RELATION)
    comments_en = models.TextField(blank=True, null=True)
    comments_ar = models.TextField(blank=True, null=True)
    actor = models.ForeignKey(
        Actor, blank=True, null=True, related_name='actor_b')

    def __unicode__(self):
        return self.actor.fullname_en + ': ' + self.relation_status


class ActorRole(models.Model):
    """
    This object model captures the role of a given actor
    in relation to either an Incident or a Bulletin.
    """
    ROLE_STATUS = (
        ('K', 'Killed'),
        ('T', 'Tortured'),
        ('WO', 'Wounded'),
        ('D', 'Detained'),
        ('KN', 'Kidnapped'),
        ('WN', 'Witness'),
        ('A', 'Arrested'),
        ('M', 'Martyr'),
        ('MG', 'Missing'),
        ('I', 'Injured'),
    )
    RELATION = (
        ('P', 'Parent'),
        ('S', 'Sibling'),
        ('FM', 'Family member'),
        ('SPO', 'Superior officer'),
        ('SBO', 'Subordinate officer'),
    )
    role_en = models.CharField(
        max_length=255,
        blank=True,
        null=True)
    role_ar = models.CharField(
        max_length=255,
        blank=True,
        null=True)
    role_status = models.CharField(
        'status',
        max_length=25,
        choices=ROLE_STATUS,
        blank=True,
        null=True
    )

    relation_status = models.CharField(
        'status',
        max_length=25,
        choices=RELATION,
        blank=True,
        null=True
    )
    comments_en = models.TextField(blank=True, null=True)
    comments_ar = models.TextField(blank=True, null=True)
    actor = models.ForeignKey(Actor, blank=True, null=True)

    def __unicode__(self):
        if self.relation_status is not None:
            return str(self.id) + ': ' + self.relation_status\
                + ': ' + str(self.actor.id)
        else:
            return str(self.id) + ': ' + self.role_status\
                + ': ' + str(self.actor.id)


class Bulletin(models.Model):
    """
    This model represents the Bulletin object. It is intended
    to capture the relationship specifically between Media objects,
    chronological events and Actors' roles.
    """
    TYPE = (
        ('Video', 'video'),
        ('Picture', 'picture'),
        ('Report', 'report'),
        ('News', 'news'),
    )
    title_en = models.CharField(max_length=255)
    title_ar = models.CharField(max_length=255, blank=True)
    description_en = models.TextField(blank=True, null=True)
    description_ar = models.TextField(blank=True, default='')
    uri = models.CharField('Media Link', max_length=255, blank=True, null=True)
    confidence_score = models.IntegerField(
        'confidence score', blank=True, null=True)
    type = models.CharField('type', max_length=25, choices=TYPE, blank=True)
    bulletin_created = models.DateTimeField(auto_now_add=True)
    bulletin_modified = models.DateTimeField(auto_now=True)

    origin_id = models.CharField(max_length=255, blank=True, null=True)
    """
    This field tracks whether the entitiy has been deleted and should thus be
    ignored by the UI
    """
    deleted = models.BooleanField()

    # foreign key fields
    assigned_user = models.ForeignKey(User, blank=True, null=True)

    # ManyToManyFields
    sources = models.ManyToManyField(Source, blank=True, null=True)
    bulletin_comments = models.ManyToManyField(Comment, blank=True, null=True)
    bulletin_imported_comments = models.ManyToManyField(
        Comment,
        blank=True,
        null=True,
        related_name="bulletin_imported_comments"
    )
    labels = models.ManyToManyField(Label, blank=True, null=True)
    times = models.ManyToManyField(TimeInfo, blank=True, null=True)

    actors_role = models.ManyToManyField(ActorRole, blank=True, null=True)
    medias = models.ManyToManyField(Media, blank=True, null=True)
    locations = models.ManyToManyField(Location, blank=True, null=True)
    ref_bulletins = models.ManyToManyField('self', blank=True, null=True)

    def __unicode__(self):
        return self.title_en

    def get_time_length(self):
        """
        This method returns the time range for a given Bulletin event.
        It is used by Django Haystack in construction of the Solr Index.
        """
        time = self.times.aggregate(
            lowest=Min('time_from'), highest=Max('time_to'))
        string = ''

        if(len(time) > 0):
            if time["lowest"] is not None and time["highest"] is not None:
                duration = (time["lowest"] - time["highest"]).days
                date_length = time["highest"].strftime('%Y/%m/%d') + '&rarr;'\
                    + time["lowest"].strftime('%Y/%m/%d')
                string = '<span class="date">{0}</span>' +\
                    '<span class="duration">({1} days)</span>'
                string = string.format(date_length, str(duration))
        return string

    def most_recent_update_by(self):
        """
        Returns the id of the las user you created an update for the
        given Bulletin
        """
        user_id = self.bulletin_comments.values('status__user')\
            .order_by('-comment_created')
        return user_id

    def most_recent_status_bulletin(self):
        """
        This method returns the most recent status for a given Bulletin event.
        It is used by Django Haystack in construction of the Solr Index.
        """

        status = self.bulletin_comments.values('status__status_en')\
            .order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''


class Incident(models.Model):
    """
    This class defined the Incident object Model. The
    object is intended to capture the meta level relationship between
    Bulletins, Actors and Events.
    """
    incident_details_en = models.TextField(blank=True, null=True)
    incident_details_ar = models.TextField(blank=True, null=True)
    confidence_score = models.IntegerField(
        'confidence score', blank=True, max_length=3, null=True)
    title_en = models.TextField()
    title_ar = models.TextField(blank=True)
    incident_created = models.DateTimeField(auto_now_add=True)
    incident_modified = models.DateTimeField(auto_now=True)

    assigned_user = models.ForeignKey(User, blank=True, null=True)

    incident_comments = models.ManyToManyField(Comment, blank=True, null=True)
    ref_bulletins = models.ManyToManyField(Bulletin, blank=True, null=True)
    actors_role = models.ManyToManyField(ActorRole, blank=True, null=True)
    crimes = models.ManyToManyField(CrimeCategory, blank=True, null=True)
    labels = models.ManyToManyField(Label, blank=True, null=True)
    times = models.ManyToManyField(TimeInfo, blank=True, null=True)
    locations = models.ManyToManyField(Location, blank=True, null=True)
    ref_incidents = models.ManyToManyField('self', blank=True, null=True)
    """
    This field tracks whether the entitiy has been deleted and should thus be
    ignored by the UI
    """
    deleted = models.BooleanField()

    def __unicode__(self):
        return self.title_en

    def get_time_length(self):
        """
        This method returns the time range for a given Incident event.
        It is used by Django Haystack in construction of the Solr Index.
        """
        time = self.times.aggregate(
            lowest=Min('time_from'), highest=Max('time_to'))
        string = ''

        if(len(time) > 0):
            if time["lowest"] is not None and time["highest"] is not None:
                duration = (time["highest"] - time["lowest"]).days
                date_duration = time["lowest"].strftime('%Y/%m/%d') + '&rarr;'\
                    + time["highest"].strftime('%Y/%m/%d')
                string = '<span class="date">{0}</span>' +\
                    '<span class="duration">({1} days)</span>'
                string = string.format(date_duration, str(duration))
        return string

    def most_recent_update_by(self):
        """
        Returns the id of the las user you created an update for
        the given Incident
        """
        user_id = self.incident_comments.values('status__user')\
            .order_by('-comment_created')
        return user_id

    def most_recent_status_incident(self):
        """
        This method returns the most recent status for a given Incident event.
        It is used by Django Haystack in construction of the Solr Index.
        """
        status = self.incident_comments.values(
            'status__status_en').order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''
