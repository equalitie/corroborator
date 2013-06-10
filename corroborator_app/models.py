from haystack.utils.geo import Point
from django.db import models
from django.db.models import Min, Max
from django.contrib.auth.models import User
from queued_storage.backends import QueuedStorage
from storages.backends.s3boto import S3BotoStorage

#Setup Boto AWS storage access system
queued_s3storage = QueuedStorage(
    'django.core.files.storage.FileSystemStorage',
    'storages.backends.s3boto.S3BotoStorage')

class PredefinedSearch(models.Model):
    """
    This object stores past searches for a given user as a URL string
    that represents all filters applied for a given search type.
    """
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255)
    search_request = models.TextField(blank=True,null=True)
    user = models.ForeignKey(User,null=True,blank=True)
    search_type = models.CharField(max_length=255)

class StatusUpdate(models.Model):
    """
    This object represents a comment status update. It records the 
    the change in state of a Bulletin or Incident based on a user's
    actions.
    """
    status_en = models.CharField(max_length=255)
    status_ar = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.TextField(blank=True,null=True)
    description_ar = models.TextField(blank=True,null=True)
    user = models.ForeignKey(User,null=True,blank=True)
    def __unicode__(self):
        return self.status_en

class Comment(models.Model):
    """
    This object represents a system comment and acts as part of the
    systems audit trail. It can be related to either Bulletins or Incidents.
    """
    assigned_user = models.ForeignKey(User,null=True,blank=True)
    status = models.ForeignKey(status_update,blank=True,null=True)
    comments_en = models.TextField(blank=True,null=True)
    comments_ar = models.TextField(blank=True,null=True)
    comment_created = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering=['comment_created']
    def __unicode__(self):
        return self.status.status_en

class TimeInfo(models.Model):
    """
    This object captures the time aspect of an event for
    either a Bulletin or Incident/
    """
    time_from = models.DateTimeField()
    time_to = models.DateTimeField()
    comments_en = models.TextField(blank=True,null=True)
    comments_ar = models.TextField(blank=True,null=True)
    event_name_en = models.CharField('event name en',max_length=255,blank=True,null=True)
    event_name_ar = models.CharField('event name ar',max_length=255,blank=True,null=True)
    confidence_score = models.IntegerField(max_length=3)

    def __unicode__(self):
        return self.event_name_en


class Location(models.Model):
    """
    This object represents a geographical location. It is possible for 
    locations to be linked together as a hierarchical chain in order
    to represent sub regions, provinces, towns, cities, etc.
    """
    LOC_TYPE = (
            ('Village','village'),
            ('Area','area'),
            ('Province','province'),
            ('City','city'),
            ('Region','region'),
            ('Country','country'),
            ('Town','town'),
    )
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    latitude = models.FloatField(blank=True,null=True)
    longitude = models.FloatField(blank=True,null=True)
    loc_type = models.CharField('location type',max_length=25, choices=LOC_TYPE)
    parent_text = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.TextField(blank=True,null=True)
    description_ar = models.TextField(blank=True,null=True)
    parent_location = models.ForeignKey('self',max_length=255,blank=True,null=True)

    def __unicode__(self):
        return self.name_en
    def get_location(self):
        return Point(self.longitude, self.latitude)

class Label(models.Model):
    """
    This object represents a label tag. it can be applied to either
    a Bulletin or Incident. Multiple labels can be interlinked as
    a chained hierarchy.
    """
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.TextField(blank=True,null=True)
    description_ar = models.TextField(blank=True,null=True)
    ref_label = models.ForeignKey('self', blank=True, null=True)
    def __unicode__(self):
        return self.name_en


class CrimeCategory(models.Model):
    """
    This object represents a crime category. Multiple crime categories 
    can be interlinked as an hierarchical chain.
    """
    category_en = models.CharField(max_length=255,blank=True,null=True)
    category_ar = models.CharField(max_length=255,blank=True,null=True)
    level = models.IntegerField(blank=True,null=True)
    description_en = models.TextField(blank=True,null=True)
    description_ar = models.TextField(blank=True,null=True)
    ref_crime = models.ForeignKey('self',blank=True,null=True)
    parent = models.CharField(max_length=255,blank=True,null=True)
    def __unicode__(self):
        return self.category_en


class SourceType(models.Model):
    """
    This object stores the type of a given source.
    """
    source_type = models.CharField('source type',max_length=255)
    description = models.TextField(blank=True,null=True)
    def __unicode__(self):
        return self.source_type
class Source(models.Model):
    """
    This object identifies a Bulletin's source. This can be of multiple types
    news media, social media, witness statements etc.
    """
    name_en = models.CharField(max_length=255,blank=True,null=True)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    reliability_score = models.IntegerField('reliability score',max_length=3)
    source_type = models.ForeignKey(source_type,blank=True,null=True)
    comments_en = models.TextField(blank=True,null=True)
    comments_ar = models.TextField(blank=True,null=True)
    ref_source = models.ForeignKey('self', blank=True, null=True)
    def __unicode__(self):
        return self.name_en

class Dialect(models.Model):
    name_en = models.CharField(max_length=255,blank=True,null=True)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.CharField(max_length=255,blank=True,null=True)
    description_ar = models.CharField(max_length=255,blank=True,null=True)

class Position(models.Model):
    name_en = models.CharField(max_length=255,blank=True,null=True)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.CharField(max_length=255,blank=True,null=True)
    description_ar = models.CharField(max_length=255,blank=True,null=True)

class Occupation(models.Model):
    name_en = models.CharField(max_length=255,blank=True,null=True)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.CharField(max_length=255,blank=True,null=True)
    description_ar = models.CharField(max_length=255,blank=True,null=True)

class Ethnicity(models.Model):
    name_en = models.CharField(max_length=255,blank=True,null=True)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.CharField(max_length=255,blank=True,null=True)
    description_ar = models.CharField(max_length=255,blank=True,null=True)

class Religion(models.Model):
    name_en = models.CharField(max_length=255,blank=True,null=True)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.CharField(max_length=255,blank=True,null=True)
    description_ar = models.CharField(max_length=255,blank=True,null=True)

class Nationality(models.Model):
    name_en = models.CharField(max_length=255,blank=True,null=True)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.CharField(max_length=255,blank=True,null=True)
    description_ar = models.CharField(max_length=255,blank=True,null=True)

class Media(models.Model):
    """
    The Media object captures represents and individual piece of
    media evidence that can be related to Bulletins.
    """
    TYPE = (
            ('Video','video'),
            ('Picture', 'picture'),
            ('Document', 'document'),
    )
    name_en = models.CharField(max_length=255,blank=True,null=True)
    name_ar = models.CharField(max_length=255,blank=True,null=True)
    media_file = models.FileField(upload_to='media',storage=queued_s3storage)
    media_type = models.CharField('type',max_length=25, choices=TYPE)
    media_created = models.DateTimeField(auto_now_add=True)

    def get_uri(self):
        return self.media_file.url

class Actor(models.Model):
    """
    This object captures the unique properties of an individual Actor
    """
    fullname_en = models.CharField(max_length=255,blank=True,null=True)
    fullname_ar = models.CharField(max_length=255,blank=True,null=True)
    nickname_en = models.CharField(max_length=255,blank=True,null=True)
    nickname_ar = models.CharField(max_length=255,blank=True,null=True)
    age_en = models.CharField(max_length=255,blank=True,null=True)
    age_ar = models.CharField(max_length=255,blank=True,null=True)
    sex_en = models.CharField(max_length=255,blank=True,null=True)
    sex_ar = models.CharField(max_length=255,blank=True,null=True)
    civilian_en = models.CharField(max_length=255,blank=True,null=True)
    civilian_ar = models.CharField(max_length=255,blank=True,null=True)
    DOB = models.DateField('date of birth',blank=True,null=True)
    POB = models.ForeignKey(location,blank=True,null=True,related_name='POB')
    occupation_en = models.CharField(max_length=255,blank=True,null=True)
    occupation_ar = models.CharField(max_length=255,blank=True,null=True)
    nationality_en = models.CharField(max_length=255,blank=True,null=True)
    nationality_ar = models.CharField(max_length=255,blank=True,null=True)
    position_en = models.CharField(max_length=255,blank=True,null=True)
    position_ar = models.CharField(max_length=255,blank=True,null=True)
    ethnicity_en = models.CharField(max_length=255,blank=True,null=True)
    ethnicity_ar = models.CharField(max_length=255,blank=True,null=True)
    religion_en = models.CharField(max_length=255,blank=True,null=True)
    religion_ar = models.CharField(max_length=255,blank=True,null=True)
    spoken_dialect_en = models.CharField(max_length=255,blank=True,null=True)
    spoken_dialect_ar = models.CharField(max_length=255,blank=True,null=True)
    current_location = models.ForeignKey(location,blank=True,null=True,related_name='actor_current')
    media = models.ForeignKey(media,blank=True,null=True)
    actor_created = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return self.fullname_en
    def count_bulletins(self):
        roles = self.role_set.all()
        return bulletin.objects.filter(actors_role__in=roles).count()
    def count_incidents(self):
        roles = self.role_set.all()
        return incident.objects.filter(actors_role__in=roles).count()

class ActorRelationship(models.Model):
    """
    The Actor Relationship model cpatures the interrelation between actors.
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
    relation_status = models.CharField('status',max_length=25, choices=RELATION)
    comments_en = models.TextField(blank=True,null=True)
    comments_ar = models.TextField(blank=True,null=True)
    actor_a = models.ForeignKey(actor,blank=True,null=True,related_name='actor_a')
    actor_b = models.ForeignKey(actor,blank=True,null=True,related_name='actor_b')
    def __unicode__(self):
        return self.actor_a.fullname_en + '-' + self.actor_b.fullname_en + ': ' + self.relation_status

class ActorRole(models.Model):
    """
    This object model captures the role of a given actor
    in relation to either an Incident or a Bulletin.
    """
    ROLE_STATUS = (
            ('Killed','killed'),
            ('Tortured', 'tortured'),
            ('Wounded', 'wounded'),
            ('Detained', 'detained'),
            ('Kidnapped', 'kidnapped'),
    )
    role_en = models.CharField(max_length=255,blank=True,null=True)
    role_ar = models.CharField(max_length=255,blank=True,null=True)
    role_status = models.CharField('status',max_length=25, choices=ROLE_STATUS)
    comments_en = models.TextField(blank=True,null=True)
    comments_ar = models.TextField(blank=True,null=True)
    actor = models.ForeignKey(actor,blank=True,null=True)
    def __unicode__(self):
        return self.actor.fullname_en + ': ' + self.role_status



class Bulletin(models.Model):
    """
    This model represents the Bulletin object. It is intended
    to capture the relationship specifically between Media objects,
    chronological events and Actors' roles.
    """
    TYPE = (
            ('Video','video'),
            ('Picture', 'picture'),
            ('Report', 'report'),
            ('News', 'news'),
    )
    assigned_user = models.ForeignKey(User,null=True,blank=True)
    bulletin_comments = models.ManyToManyField(comment,blank=True,null=True)
    title_en = models.CharField(max_length=255,blank=True,null=True)
    title_ar = models.CharField(max_length=255,blank=True,default='')
    description_en = models.TextField(blank=True,null=True)
    description_ar = models.TextField(blank=True,default='')
    uri = models.CharField('Media Link',max_length=255,blank=True,null=True)
    actors_role = models.ManyToManyField(role,blank=True,null=True)
    confidence_score = models.IntegerField('confidence score')
    times = models.ManyToManyField(time_info,blank=True,null=True)
    medias = models.ManyToManyField(media,blank=True,null=True)
    locations = models.ManyToManyField(location,blank=True,null=True)
    labels = models.ManyToManyField(labeling,blank=True,null=True)
    sources = models.ManyToManyField(source,blank=True,null=True)
    ref_bulletins = models.ManyToManyField('self',blank=True,null=True)
    type = models.CharField('type',max_length=25, choices=TYPE)
    bulletin_created = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return self.title_en
    def get_time_length(self):
        time = self.times.aggregate(lowest=Min('time_from'),highest=Max('time_to'))
        string = ''

        if(len(time) > 0):
            if(time["lowest"] != None and time["highest"] != None):
                duration = (time["lowest"] - time["highest"]).days
                string = time["highest"].strftime('%Y/%m/%d')+ '&rarr;'+ time["lowest"].strftime('%Y/%m/%d')
                string = '<span class="date">' + string + '</span> <span class="duration">('+str(duration)+' days)</span>'
        return string
    def most_recent_status_bulletin(self):
        status = self.bulletin_comments.values('status__status_en').order_by('-comment_created')
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
    incident_details_en = models.TextField(blank=True,null=True)
    incident_details_ar = models.TextField(blank=True,null=True)
    incident_comments = models.ManyToManyField(comment,blank=True,null=True)
    confidence_score = models.IntegerField('confidence score',max_length=3)
    title_en = models.TextField(blank=True,null=True)
    title_ar = models.TextField(blank=True,null=True)
    ref_incidents = models.ManyToManyField('self',blank=True,null=True)
    bulletins = models.ManyToManyField(bulletin,blank=True,null=True)
    actors_role = models.ManyToManyField(role,blank=True,null=True)
    crimes = models.ManyToManyField(crime_category,blank=True,null=True)
    labels = models.ManyToManyField(labeling,blank=True,null=True)
    times = models.ManyToManyField(time_info,blank=True,null=True)
    locations = models.ManyToManyField(location,blank=True,null=True)
    assigned_user = models.ForeignKey(User,null=True,blank=True)
    incident_created = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return self.title_en
    def get_time_length(self):
        time = self.times.aggregate(lowest=Min('time_from'),highest=Max('time_to'))
        string = ''

        if(len(time) > 0):
            if(time["lowest"] != None and time["highest"] != None):
                duration = (time["highest"] - time["lowest"]).days
                string = time["lowest"].strftime('%Y/%m/%d')+ '&rarr;'+ time["highest"].strftime('%Y/%m/%d')
                string = '<span class="date">' + string + '</span> <span class="duration">('+str(duration)+' days)</span>'
        return string
    def most_recent_status_incident(self):
        status = self.incident_comments.values('status__status_en').order_by('-comment_created')
        if len(status) > 0:
            status = status[0]
            return status['status__status_en']
        else:
            return ''
