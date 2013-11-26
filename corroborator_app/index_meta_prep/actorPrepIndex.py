"""
This file handles the abstract and meta data preparation
for the Actor entity. It is consummed by the Solr system
and the Tastypie dehyrdate cycle

Bill Doran 2013/08/08
"""

from corroborator_app.models import Bulletin, \
    Incident, ActorRole, Location
from django.conf import settings


class ActorPrepMeta():
    def prepare_actor_actor_roles(self, object):
        """
        Returns a full list of the roles played by actors associate
        with this object
        """
        roles = [
            actor_role.relation_status for actor_role in
            object.actors_role.all()]
        return roles

    def prepare_roles(self, object):
        """
        Returns a full list of all roles and relationships associated
        with this Actor instance.
        """
        roles = [
            actor_role.role_status for actor_role in
            ActorRole.objects.filter(actor__in=[object]).all()]
        relations = [
            actor_role.relation_status for actor_role in
            ActorRole.objects.filter(actor__in=[object]).all()]

        result = roles + relations
        result = filter(None, result)

        return list(set(result))

    def prepare_actors_role(self, object):
        """
        Returns the correctly formated uri related to this incident instance
        for the tastypie api
        """
        return [
            '/api/v1/actorRole/{0}/'.format(actor_role.id)
            for actor_role in object.actors_role.all()]

    def prepare_actors(self, object):
        """
        Returns array of tastypie uris for the given Actor object's associated
        actors
        """
        actors = [
            '/api/v1/actor/{0}/'.format(actor_role.actor.id)
            for actor_role in object.actors_role.all()]
        return actors

    def prepare_POB(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        if object.POB is not None:
            return '/api/v1/location/{0}/'.format(object.POB.id)
        else:
            return ''

    def prepare_current_location(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        if object.current_location is not None:
            return '/api/v1/location/{0}/'.format(object.current_location.id)
        else:
            return ''

    def prepare_actor_searchable_current(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        if object.current_location is not None:
            locations = []

            locations.append('/api/v1/location/{0}/'.format(
                object.current_location.id
            ))
            if object.current_location.parent_location is not None:
                locations += self.get_locations_recursively(
                    object.current_location.parent_location.id
                )

            return locations 
        else:
            return ''

    def prepare_actor_searchable_pob(self, object):
        """
        Returns the correctly formated uri related to this actor instance
        for the tastypie api
        """
        if object.POB is not None:
            locations = []

            locations.append('/api/v1/location/{0}/'.format(object.POB.id))
            if object.POB.parent_location is not None:
                locations += self.get_locations_recursively(
                    object.POB.parent_location.id
                )

            return locations 
        else:
            return ''

    def get_locations_recursively(self, location_id):
        """
        Recurse upwards through all parent locations and return a list of 
        uri formatted locations.
        """
        locations = []
        location = Location.objects.get(pk=location_id)
        if location.parent_location is not None:
            parent_id = location.parent_location.id
            locations += self.get_locations_recursively(parent_id)
            locations.append('/api/v1/location/{0}/'.format(location.id))
            return locations
            
        else:
            return [ '/api/v1/location/{0}/'.format(location.id) ]


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
        if object.media is not None:
            #return object.media.media_file.name
            return '/api/v1/media/{0}/'.format(object.media.id)
        else:
            return ''

    def prepare_thumbnail_url(self, object):
        """
        Return AWS URL for associated thumbnail media
        """
        if object.media is not None:
            return settings.S3_PROXY_URL + '' + object.media.media_thumb_file.name
        else:
            return ''

    def prepare_actor_comments(self, object):
        """
        Returns the correctly formated uri related to this bulletin instance
        for the tastypie api
        """
        return ['/api/v1/comment/{0}/'.format(comment.id) for comment in object.actor_comments.all()]

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
