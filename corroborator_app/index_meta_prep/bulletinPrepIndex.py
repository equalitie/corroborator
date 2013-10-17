"""
This file handles the abstract and meta data preparation
for the Actor entity. It is consummed by the Solr system 
and the Tastypie dehyrdate cycle

Bill Doran 2013/08/08
"""

from haystack import indexes
from corroborator_app.models import Bulletin, Location, \
    Incident, Actor, Media
 
class BulletinPrepMeta():
    def prepare_bulletin_actor_roles(self, object):
        """
        Returns a full list of the roles played by actors associate
        with this object
        """
        roles = [actor_role.role_status for actor_role in
            object.actors_role.all()]
        return roles

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
        return ['/api/v1/timeInfo/{0}/'.format(timeinfo.id) for timeinfo in object.times.all()]
 
    def prepare_ref_bulletins(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/bulletin/{0}/'.format(bulletin.id) for bulletin in object.ref_bulletins.all()]
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
    def prepare_bulletin_imported_comments(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/comment/{0}/'.format(comment.id) for comment in object.bulletin_imported_comments.all()]

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
