"""
Author: Cormac McGuire
Date: 03/01/2014
Build the json context variable that is used by the js app
The json object is to be defined as follows:
A map is created with tuples key: value
the key is the key for the json object the value is the name of the
function that will generate the values for the specified key
"""
from django.utils import translation
from django.db.models import Q
from django.contrib.auth.models import User
from django.conf import settings

from tastypie.models import ApiKey

from corroborator_app.models import (
    ActorRole,
    Label,
    PredefinedSearch,
    Source,
    CrimeCategory,
    StatusUpdate,
    Location,
)
from corroborator_app.views.view_utils import (
    can_assign_users, can_finalize, can_delete
)


def build_js_context(user):
    return {
        'locale': select_language(),
        'role_status_set': select_roles(),
        'relation_status_set': select_relations(),
        'predefined_search_set': select_predefined_searches(user),
        'sources_set': select_sources(),
        'labels_set': select_labels(),
        'crimes_set': select_crime_categories(),
        'status_set': select_statuses(user),
        'all_status_set': select_all_statuses(),
        'users_set': select_users(),
        'loc_set': select_locations,
        'username': user.username,
        'userid': user.id,
        'api_key': select_apikey(user),
        'solr_url': get_solr_url(),
        'can_assign_users': can_assign_users(user),
        'can_delete_entities': can_delete(user),
        'can_update_to_finalized': can_finalize(user),
    }


def select_labels():
    return Label.objects.all()


def select_language():
    """return the locale string"""
    return translation.get_language()


def select_roles():
    '''
    return the available roles that actors can have in bulletins
    and incidents
    TODO: apply i18n rules
    '''
    role_status_set = []
    roles = ActorRole.ROLE_STATUS
    for role in roles:
        role_status_set.append({
            'key': role[0],
            'value': role[1]}
        )
    return role_status_set


def select_relations():
    '''
    return a set of available relations formatted
    TODO: apply i18n rules
    '''
    relation_status_set = []
    relations = ActorRole.RELATION
    for relation in relations:
        relation_status_set.append({
            'key': relation[0],
            'value': relation[1]}
        )
    return relation_status_set


def select_predefined_searches(user):
    predefined_search_set = PredefinedSearch.objects.filter(
        Q(user_id=user.id) | Q(make_global=True)
    )

    return map(
        format_predefined_search,
        predefined_search_set
    )


def select_all_statuses():
    return StatusUpdate.objects.all()


def select_statuses(user):
    return StatusUpdate.filter_by_perm_objects.available_statuses(
        user
    )


def select_crime_categories():
    return CrimeCategory.objects.all()


def select_sources():
    return Source.objects.all()


def select_users():
    return User.objects.all()


def select_locations():
    return Location.objects.all()


def select_username(user):
    return user.username


def select_apikey(user):
    return ApiKey.objects.get(user=user).key


###############################################################################
# FORMATTING HELPER METHODS
###############################################################################


def get_solr_url():
    '''
    set the solr url that we are connecting to
    '''
    return settings.SOLR_PROXY_URL


def format_predefined_search(predef_object):
    """
    Load json from db
    """
    predef_object.actor_filters =\
        predef_object.actor_filters
    predef_object.bulletin_filters =\
        predef_object.bulletin_filters
    predef_object.incident_filters =\
        predef_object.incident_filters
    return predef_object
