from haystack.utils.geo import Point
from django.db import models
from django.db.models import Min, Max
from django.contrib.auth.models import User
# Create your models here.

class predefined_search(models.Model):
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255)
    search_request = models.TextField(blank=True,null=True)
    user = models.ForeignKey(User,null=True,blank=True)
    search_type = models.CharField(max_length=255)

class status_update(models.Model):
    status_en = models.CharField(max_length=255)
    status_ar = models.CharField(max_length=255,blank=True,null=True)
    description_en = models.TextField(blank=True,null=True)
    description_ar = models.TextField(blank=True,null=True)
    user = models.ForeignKey(User,null=True,blank=True)
    def __unicode__(self):
	return self.status_en


class time_info(models.Model):
	time_from = models.DateTimeField()
	time_to = models.DateTimeField()
	comments_en = models.TextField(blank=True,null=True)
	comments_ar = models.TextField(blank=True,null=True)
	event_name_en = models.CharField('event name en',max_length=255,blank=True,null=True)
	event_name_ar = models.CharField('event name ar',max_length=255,blank=True,null=True)
	confidence_score = models.IntegerField(max_length=3)

	def __unicode__(self):
  	    return self.event_name_en


class location(models.Model):
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

class labeling(models.Model):
	name_en = models.CharField(max_length=255)
	name_ar = models.CharField(max_length=255,blank=True,null=True)
	description_en = models.TextField(blank=True,null=True)
	description_ar = models.TextField(blank=True,null=True)
	def __unicode__(self):
		return self.name_en


class crime_category(models.Model):
	category_en = models.CharField(max_length=255,blank=True,null=True)
	category_ar = models.CharField(max_length=255,blank=True,null=True)
	level = models.IntegerField(blank=True,null=True)
	description_en = models.TextField(blank=True,null=True)
	description_ar = models.TextField(blank=True,null=True)
	ref_crime = models.ForeignKey('self',blank=True,null=True)
	parent = models.CharField(max_length=255,blank=True,null=True)
	def __unicode__(self):
		return self.category_en


class source_type(models.Model):
	source_type = models.CharField('source type',max_length=255)
	description = models.TextField(blank=True,null=True)
	def __unicode__(self):
		return self.source_type
class source(models.Model):
	name_en = models.CharField(max_length=255,blank=True,null=True)
	name_ar = models.CharField(max_length=255,blank=True,null=True)
	reliability_score = models.IntegerField('reliability score',max_length=3)
	source_type = models.ForeignKey(source_type,blank=True,null=True)
	comments_en = models.TextField(blank=True,null=True)
	comments_ar = models.TextField(blank=True,null=True)
	def __unicode__(self):
		return self.name_en

class dialect(models.Model):
	name_en = models.CharField(max_length=255,blank=True,null=True)
	name_ar = models.CharField(max_length=255,blank=True,null=True)
	description_en = models.CharField(max_length=255,blank=True,null=True)
	description_ar = models.CharField(max_length=255,blank=True,null=True)

class position(models.Model):
	name_en = models.CharField(max_length=255,blank=True,null=True)
	name_ar = models.CharField(max_length=255,blank=True,null=True)
	description_en = models.CharField(max_length=255,blank=True,null=True)
	description_ar = models.CharField(max_length=255,blank=True,null=True)

class occupation(models.Model):
	name_en = models.CharField(max_length=255,blank=True,null=True)
	name_ar = models.CharField(max_length=255,blank=True,null=True)
	description_en = models.CharField(max_length=255,blank=True,null=True)
	description_ar = models.CharField(max_length=255,blank=True,null=True)

class ethnicity(models.Model):
	name_en = models.CharField(max_length=255,blank=True,null=True)
	name_ar = models.CharField(max_length=255,blank=True,null=True)
	description_en = models.CharField(max_length=255,blank=True,null=True)
	description_ar = models.CharField(max_length=255,blank=True,null=True)

class religion(models.Model):
	name_en = models.CharField(max_length=255,blank=True,null=True)
	name_ar = models.CharField(max_length=255,blank=True,null=True)
	description_en = models.CharField(max_length=255,blank=True,null=True)
	description_ar = models.CharField(max_length=255,blank=True,null=True)

class nationality(models.Model):
	name_en = models.CharField(max_length=255,blank=True,null=True)
	name_ar = models.CharField(max_length=255,blank=True,null=True)
	description_en = models.CharField(max_length=255,blank=True,null=True)
	description_ar = models.CharField(max_length=255,blank=True,null=True)

class actor(models.Model):
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
	def __unicode__(self):
		return self.fullname_en
	def count_bulletins(self):
                roles = self.role_set.all()
                return bulletin.objects.filter(actors_role__in=roles).count()
	def count_incidents(self):
                roles = self.role_set.all()
                return incident.objects.filter(actors_role__in=roles).count()


class comment(models.Model):
	assigned_user = models.ForeignKey(User,null=True,blank=True)
	comments_en = models.TextField(blank=True,null=True)
        comments_ar = models.TextField(blank=True,null=True)
	created = models.DateTimeField(auto_now_add=True)

class role(models.Model):
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

class media(models.Model):
	name_en = models.CharField(max_length=255,blank=True,null=True)
	name_ar = models.CharField(max_length=255,blank=True,null=True)
	uri = models.CharField(max_length=255,blank=True,null=True)
	
class bulletin(models.Model):
	TYPE = (
		('Video','video'),
		('Picture', 'picture'),
		('Report', 'report'),
		('News', 'news'),
	)
	assigned_user = models.ForeignKey(User,null=True,blank=True)
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
	status = models.ForeignKey(status_update,blank=True,null=True)
	type = models.CharField('type',max_length=25, choices=TYPE)
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
					
		



class incident(models.Model):
	incident_details_en = models.TextField(blank=True,null=True)
	incident_details_ar = models.TextField(blank=True,null=True)
	comments = models.ManyToManyField(comment,blank=True,null=True)
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
	status = models.ForeignKey(status_update,blank=True,null=True)
	assigned_user = models.ForeignKey(User,null=True,blank=True)
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

