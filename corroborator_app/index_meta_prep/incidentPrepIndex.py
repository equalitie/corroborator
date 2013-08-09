"""
This file handles the abstract and meta data preparation
for the Actor entity. It is consummed by the Solr system 
and the Tastypie dehyrdate cycle

Bill Doran 2013/08/08
"""

from haystack import indexes
from corroborator_app.models import Bulletin, Location, \
    Incident, Actor, Media
 
class IncidentPrepMeta():
    def prepare_assigned_user(self, object):
        if object.assigned_user != None:
            return '/api/v1/user/{0}/'.format(object.assigned_user.id)
        else:
            return ''
    def prepare_times(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/timeInfo/{0}/'.format(timeinfo.id) for timeinfo in
        object.times.all()]
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
    def prepare_ref_bulletins(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return ['/api/v1/bulletin/{0}/'.format(bulletin.id) for bulletin in object.ref_bulletins.all()]
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
        return object.ref_bulletins.count()

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


