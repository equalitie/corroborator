'''
Author: Cormac McGuire
Date: 4 October 2013
Tests:  tests/multisave
Save multiple entities
TODO: separate into 4 files, common functionality can remain in __init__
the rest should be divided between actor, bulletin and incident
'''
import json

from django.http import HttpResponseForbidden, HttpResponse

from django.contrib.auth.models import User

from corroborator_app.models import Incident, Actor, Bulletin, ActorRole, \
    Location, StatusUpdate, Label, SourceType, CrimeCategory
from corroborator_app.tasks import update_object


###########################################################################
# COMMON METHODS
###########################################################################
def separate_field_types(model_dict, appendable_keys):
    appendable_dict = {
        key: value for key, value in model_dict.iteritems()
        if key in appendable_keys
    }
    remainder_dict = {
        key: value for key, value in model_dict.iteritems()
        if key not in appendable_keys
    }
    return appendable_dict, remainder_dict


def update_entities(model_dict, model_objects, appendable_keys):
    '''
    update the actor objects received based on the query_dict
    '''
    appendable_dict, remainder_dict = separate_field_types(
        model_dict, appendable_keys)

    for model in model_objects:
        model_dict_copy = remainder_dict.copy()
        model_dict_copy = update_related_actors(model_dict_copy, model)
        model = update_entity_appendable(appendable_dict, model)
        model = update_entity(model_dict_copy, model)
        model.save()


def update_entity_appendable(appendable_dict, model):
    '''
    append new values to toMany fields on the model, do not add duplicates
    '''
    for key, value in appendable_dict.iteritems():
        if len(value) is not 0:
            model_field = getattr(model, key)
            entities_to_add = model_field.model.objects.filter(id__in=value)
            for entity in entities_to_add:
                model_field.add(entity)
    return model


def update_entity(query_dict, model_object):
    '''
    update a model_object with the contents of a query_dict
    '''
    for (key, value) in query_dict.iteritems():
        if value is not u'':
            try:
                setattr(model_object, key, value)
            except ValueError:
                # ew - determine the class of the field and get the
                # element to be associated
                # _meta not nice but considered stable
                dep_field = model_object._meta.get_field_by_name(key)
                FieldModelClass = dep_field[0].rel.to
                value = FieldModelClass.objects.get(id=value)
                setattr(model_object, key, value)

    return model_object


def extract_ids(entity_dict, key):
    '''
    extract ids from the querydict sent in the multisave request
    '''
    entity_uri_list = entity_dict[key]
    return batch_parse_id_from_uri(entity_uri_list)


def get_result_objects(id_set, username, request, Resource, ModelClass):
    '''
    create a response object list that can be consumed on the frontend
    use tasypie bundle creation and dehydrate methods to create content
    that is consistent with that outputted from the api
    '''
    resource = Resource()
    queryset = ModelClass.objects.filter(pk__in=id_set)
    bundles = []
    for obj in queryset:
        bundle = resource.build_bundle(obj=obj, request=request)
        bundles.append(resource.full_dehydrate(bundle, for_list=True))

    list_json = resource.serialize(None, bundles, 'application/json')
    return list_json


def generate_uris(batch, entity):
    '''
    add docstring, and test
    '''
    new_uris = []
    for id in batch:
        new_uri = '/api/v1/{0}/{1}/'.format(entity, id)
        new_uris.append(new_uri)

    return new_uris


def parse_id_from_uri(uri):
    '''
    parse id from tastypie resource uri which are in the format
    'api/v1/<entity>/<id>/'
    '''
    tokens = uri.split('/')
    entity_id = tokens[len(tokens)-2]
    return entity_id


def batch_parse_id_from_uri(uri_list):
    '''
    pull the ids from lists of tastypie resource uris
    '''
    id_list = []
    for item in uri_list:
        id_list.append(parse_id_from_uri(item))
    return id_list


def string_check(comment_string):
    '''
    check for a non 0 length string
    '''
    passed = False
    error = {
        'comment': 'comment missing'
    }
    if comment_string.isalnum() and len(comment_string) is not 0:
        passed = True
        error = {}
    return passed, error


def status_update_check(status_uri):
    '''
    check for a valid status update
    '''
    passed = False
    error = {
        'status': 'invalid status update'
    }
    status_id = parse_id_from_uri(status_uri)
    if status_id:
        try:
            StatusUpdate.objects.get(id=status_id)
            passed = True
            error = {}
        except StatusUpdate.DoesNotExist:
            pass

    return passed, error


def validate_status_update(query_dict):
    '''
    ensure there is a comment and version status with the update
    '''
    total_passed = 0
    required_fields = {
        'comment': string_check,
        'status': status_update_check
    }
    return_error = {}
    for key, validation_function in required_fields.iteritems():
        validation_passed, error = validation_function(query_dict[key])
        if validation_passed is True:
            total_passed += 1
        else:
            return_error.update(error)
    passed = True if (total_passed is 2) else False
    return passed, json.dumps(return_error)


###########################################################################
# ACTOR SPECIFIC METHODS
###########################################################################
def multi_save_actors(request, actor_dict, username):
    '''
    main save actor function
    save a bunch of attributes to a bunch of actors
    element_data: QueryDict
    '''
    passed, error_response = validate_status_update(actor_dict)
    if passed is False:
        return HttpResponseForbidden(
            error_response,
            mimetype='application/json'
        )

    actor_id_list = extract_ids(actor_dict, 'actors')
    actor_dict = process_actor_data(actor_dict)
    actor_dict.pop('actors')
    actor_objects = Actor.objects.filter(
        id__in=actor_id_list
    )
    update_actors(actor_dict, actor_objects)
    from corroborator_app.api.ActorApi import ActorResource
    response_content = get_result_objects(
        actor_id_list,
        username,
        request,
        ActorResource,
        Actor
    )

    update_object.delay(username)

    return HttpResponse(
        response_content,
        mimetype='application/json'
    )


def update_actors(actor_dict, actor_objects):
    appendable_fields = [
    ]
    update_entities(actor_dict, actor_objects, appendable_fields)


def extract_actor_ids(actor_dict):
    '''
    extract actor ids from the querydict sent in the multisave actor
    request
    '''
    actor_list = actor_dict['actors']
    return batch_parse_id_from_uri(actor_list)


def process_actor_data(actor_dict):
    '''
    convert the query_dict into a format that can be iterated over and turned
    into a model update
    '''
    location_keys = ['current_location', 'POB']
    actor_role_keys = ['actors_role']
    actor_dict = process_uris(actor_dict, location_keys, Location)
    actor_dict = process_uris(actor_dict, actor_role_keys, ActorRole)
    return actor_dict


def update_related_actors(mutable_dict, model_object):
    '''
    look for an existing relationship to an actor and update the relationship
    if found, create a new ActorRole object and add it to the object if not
    This allows an actor to be related only once
    return the quey dict with actors_role removed, to allow for simples
    processing of everything else
    '''
    if 'actors_role' not in mutable_dict.keys():
        return mutable_dict
    actor_role_dict = reduce(
        map_rolelist_to_dict,
        mutable_dict['actors_role'],
        {}
    )

    #iterate over the existing actorrole_set and update
    for actor_role in model_object.actors_role.all():
        if actor_role.actor.id in actor_role_dict.keys():
            actor_role = update_actor_role(
                actor_role,
                actor_role_dict[actor_role.actor.id]
            )
            actor_role.save()
            actor_role_dict.pop(actor_role.actor.id)

    create_new_actor_roles(actor_role_dict, model_object)
    mutable_dict.pop('actors_role')
    return mutable_dict


def update_actor_role(actor_role, new_actor_role):
    '''
    update existing actor role
    '''
    actor_role.role_en = new_actor_role.role_en
    actor_role.role_status = new_actor_role.role_status
    return actor_role


def create_new_actor_roles(new_actor_roles, model_object):
    '''
    create a new actor role entity
    '''
    # iterate over what's left and create new actor roles
    if len(new_actor_roles) is 0:
        return
    for key, actor_role in new_actor_roles.iteritems():
        new_actor_role = ActorRole(
            role_en=actor_role.role_en,
            role_status=actor_role.role_status,
            actor=actor_role.actor
        )
        new_actor_role.save()
        model_object.actors_role.add(new_actor_role)
    model_object.save()


def process_uris(mutable_dict, model_keys, model_object):
    '''
    convert resource uris into plain ids
    '''
    for key in model_keys:
        if key in mutable_dict.keys():
            model_uri = mutable_dict[key]
            if type(model_uri) is list:
                model_ids = batch_parse_id_from_uri(model_uri)
                mutable_dict[key] = model_ids
                #model_object.objects.filter(
                    #pk__in=model_ids
                #)
            else:
                model_id = parse_id_from_uri(model_uri)
                if model_id:
                    mutable_dict[key] = model_id
                    #model_object.objects.get(id=model_id)

    return mutable_dict


def map_rolelist_to_dict(role_dict, actor_role_id):
    actor_role = ActorRole.objects.get(pk=actor_role_id)
    role_dict[actor_role.actor.id] = actor_role
    return role_dict


def get_role_for_actor(entity, actor_id):
    '''
    add docstring
    '''
    roles = entity.actors_role.filter(actor_id=actor_id)
    if len(roles) > 0:
        return roles[0]
    else:
        return ''


###########################################################################
# BULLETIN SPECIFIC METHODS
###########################################################################


def multi_save_bulletins(request, bulletin_dict, username):
    '''
    main run loop for bulletin save, return the HttpResponse object that
    has the json object
    '''
    passed, error_response = validate_status_update(bulletin_dict)
    if passed is False:
        return HttpResponseForbidden(
            error_response,
            mimetype='application/json'
        )

    bulletin_id_list = extract_ids(bulletin_dict, 'bulletins')
    bulletin_dict = process_bulletin_dict(bulletin_dict)
    bulletin_dict.pop('bulletins')
    bulletin_objects = Bulletin.objects.filter(
        pk__in=bulletin_id_list
    )
    update_bulletins(bulletin_dict, bulletin_objects)
    from corroborator_app.api.BulletinApi import BulletinResource
    response_content = get_result_objects(
        bulletin_id_list,
        username,
        request,
        BulletinResource,
        Bulletin
    )
    update_object.delay(username)

    return HttpResponse(
        response_content,
        mimetype='application/json'
    )


def process_bulletin_dict(bulletin_dict):
    '''
    convert the query dict into a format that can be turned into a model
    update
    '''
    keys_to_process = [
        {"assigned_user": User},
        {"labels": Label},
        {"locations": Location},
        {"ref_bulletins": Bulletin},
        {"actors_role": ActorRole},
        {"sources": SourceType},
    ]
    for uri_dict in keys_to_process:
        key, ModelClass = uri_dict.popitem()
        bulletin_dict = process_uris(bulletin_dict, [key], ModelClass)

    return bulletin_dict


def update_bulletins(bulletin_dict, bulletin_objects):
    appendable_fields = [
    ]
    update_entities(bulletin_dict, bulletin_objects, appendable_fields)


def multi_save_incidents(request, incident_dict, username):
    '''
    main run loop for indident save, return the HttpResponse object that
    has the json object
    '''
    passed, error_response = validate_status_update(incident_dict)
    if passed is False:
        return HttpResponseForbidden(
            error_response,
            mimetype='application/json'
        )

    incident_id_list = extract_ids(incident_dict, 'incidents')
    incident_dict = process_incident_dict(incident_dict)
    incident_dict.pop('incidents')
    incident_objects = Incident.objects.filter(
        pk__in=incident_id_list
    )
    update_incidents(incident_dict, incident_objects)
    from corroborator_app.api.IncidentApi import IncidentResource
    response_content = get_result_objects(
        incident_id_list,
        username,
        request,
        IncidentResource,
        Incident
    )
    update_object.delay(username)
    return HttpResponse(
        response_content,
        mimetype='application/json'
    )


def update_incidents(incident_dict, incident_objects):
    '''
    update the incidents with straight replace where possible
    and append for multivalue fields
    '''
    appendable_fields = [
        'labels',
        'crimes',
        'locations',
        'ref_incidents',
        'ref_bulletins',
    ]
    update_entities(
        incident_dict,
        incident_objects,
        appendable_fields
    )


def process_incident_dict(incident_dict):
    '''
    convert the query dict into a format that can be turned into a model
    update
    '''
    # list of the foreign and many to many key fields, these need extra
    # processing
    keys_to_process = [
        {"assigned_user": User},
        {"labels": Label},
        {"crimes": CrimeCategory},
        {"locations": Location},
        {"ref_bulletins": Bulletin},
        {"ref_incidents": Incident},
        {"actors_role": ActorRole},
    ]
    for uri_dict in keys_to_process:
        key, ModelClass = uri_dict.popitem()
        incident_dict = process_uris(incident_dict, [key], ModelClass)

    return incident_dict
