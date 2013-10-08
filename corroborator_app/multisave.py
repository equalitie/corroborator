'''
Author: Cormac McGuire
Date: 4 October 2013
Rewrite of multisave functionality
Save multiple actor entities
'''
# to be removed
from django.http import HttpResponseForbidden, HttpResponse
from corroborator_app.models import Incident, Actor, Bulletin, ActorRole, \
    Location, StatusUpdate
from corroborator_app.tasks import update_object

import json

###########################################################################
# COMMON METHODS
###########################################################################


def update_entity(query_dict, model_object):
    '''
    update a model_object with the contents of a query_dict
    '''
    for (key, value) in query_dict.iteritems():
        if value is not u'':
            setattr(model_object, key, value)
    return model_object


def get_result_objects(id_set, username, request, Resource, ModelClass):
    '''
    create a response object list that can be consumed on the frontend
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
def multi_save_actors(request, actor_query_dict, username):
    '''
    main save actor function
    save a bunch of attributes to a bunch of actors
    element_data: QueryDict
    '''
    passed, error_response = validate_status_update(actor_query_dict)
    if passed is False:
        return HttpResponseForbidden(
            error_response,
            mimetype='application/json'
        )

    actor_id_list = extract_actor_ids(actor_query_dict)
    actor_query_dict = process_actor_data(actor_query_dict)
    actor_query_dict.pop('actors')
    actor_objects = Actor.objects.filter(
        id__in=actor_id_list
    )
    update_actors(actor_query_dict, actor_objects)
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


def extract_actor_ids(actor_query_dict):
    '''
    extract actor ids from the querydict sent in the multisave actor
    request
    '''
    actor_list = actor_query_dict['actors']
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


def update_actors(actor_query_dict, actor_objects):
    '''
    update the actor objects received based on the query_dict
    '''
    for actor in actor_objects:
        mutable_dict = actor_query_dict.copy()
        mutable_dict = update_related_actors(mutable_dict, actor)
        actor = update_entity(mutable_dict, actor)
        actor.save()


def update_related_actors(mutable_dict, actor):
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
    #ipdb.set_trace()

    #iterate over the existing actorrole_set and update
    for actor_role in actor.actors_role.all():
        if actor_role.actor.id in actor_role_dict.keys():
            actor_role = update_actor_role(
                actor_role,
                actor_role_dict[actor_role.actor.id]
            )
            actor_role.save()
            actor_role_dict.pop(actor_role.actor.id)

    create_new_actor_roles(actor_role_dict, actor)
    mutable_dict.pop('actors_role')
    return mutable_dict


def update_actor_role(actor_role, new_actor_role):
    '''
    update existing actor role
    '''
    actor_role.role_en = new_actor_role.role_en
    actor_role.role_status = new_actor_role.role_status
    return actor_role


def create_new_actor_roles(new_actor_roles, actor):
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
        actor.actors_role.add(new_actor_role)
    actor.save()


def process_uris(mutable_dict, model_keys, model_object):
    '''
    convert resource uris into the objects they represent
    '''
    for key in model_keys:
        if key in mutable_dict.keys():
            model_uri = mutable_dict[key]
            if type(model_uri) is list:
                model_ids = batch_parse_id_from_uri(model_uri)
                mutable_dict[key] = model_object.objects.filter(
                    pk__in=model_ids
                )
            else:
                model_id = parse_id_from_uri(model_uri)
                if model_id:
                    mutable_dict[key] = model_object.objects.get(id=model_id)

    return mutable_dict


def map_rolelist_to_dict(role_dict, actor_role):
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
def multi_save_entities(element_data, mode, username):
    '''
    add docstring, method too long
    '''
    comment_ids = []
    list_entities = []
    statusid = ''
    cscore = None
    userid = None
    id_list = []
    entity_set = ''
    status = ''
    comments_en = ''
    if 'confidence_score' in element_data:
        if element_data['confidence_score'] != '':
            cscore = element_data['confidence_score']
    if element_data['assigned_user'] != '':
        userid = element_data['assigned_user'].split('/')
        userid = userid[len(userid)-1]
    """    
    if element_data['status'] != '':
        status = element_data['status']
    if element_data['comments_en'] != '':
        comments_en = element_data['comments_en']
    if comments_en != '' and status != '':
        comment = Comment(status=status, comments_en=comments_en)
        comment.save()
        comment_ids.append(comment.id)
    """
    if mode == 'incident':
        list_entities = Incident.objects.filter(
            id__in=batch_parse_id_from_uri(element_data['incidents'])
        )
    elif mode  ==  'bulletin':
        list_entities = Bulletin.objects.filter(
            id__in=batch_parse_id_from_uri(element_data['bulletins'])
        )
    for item in list_entities:
        actor_role_ids = []
        if mode  ==  'bulletin' or mode  ==  'incident':
            entity_set += str(item.id) + ';'
            if cscore != None:
                item.confidence_score = cscore
            if userid != None:    
                item.assigned_user_id = userid
            if len(element_data['labels']) > 0:
                localLabels = batch_parse_id_from_uri(
                    element_data['labels']
                )
                labeling_ids = map(int, localLabels)
                item.labels.add(*labeling_ids)

            for a in element_data['actorsRoles']:
                local_id = parse_id_from_uri(a['actor'])
                actor_role = get_role_for_actor(item, local_id)
                role_local = ''
                if actor_role == '':
                    role_local = ActorRole(
                        role_status=a['role_status'],
                        actor_id=int(local_id),
                        role_en=a['role_en']
                    )
                else:
                    role_local = actor_role
                    role_local.role_status = a['role_status']
                    role_local.role_en = a['role_en']
                role_local.save()
                actor_role_ids.append(role_local.id)

            if len(comment_ids) > 0:
                if mode == 'incident':
                    item.incident_comments.add(comment_ids)
                else:
                    item.bulletin_comments.add(comment_ids)
            if len(actor_role_ids) > 0:
                item.actors_role.add(*actor_role_ids)
            if len( element_data['locations']) > 0:
                localLocations = batch_parse_id_from_uri(
                    element_data['locations']
                )
                location_ids = map(int, localLocations)
                item.locations.add(*location_ids)
            if len( element_data['ref_bulletins']) > 0:
                localBulletins = batch_parse_id_from_uri(
                    element_data['ref_bulletins']
                )
                bulletin_ids = map(int, localBulletins)
                item.ref_bulletins.add(*bulletin_ids)
            if mode  ==  'incident':
                if len(element_data['crimes']) > 0:
                    localCrimes = batch_parse_id_from_uri(
                        element_data['crimes']
                    )
                    crime_ids = map(int, localCrimes)
                    item.crimes.add(*crime_ids)
                if len( element_data['ref_incidents']) > 0:
                    localIncidents = batch_parse_id_from_uri(
                        element_data['ref_incidents']
                    )
                    incident_ids = map(int, localIncidents)
                    item.ref_incidents.add(*incident_ids)
            else:
                if len(element_data['sources']) > 0:
                    localSources = batch_parse_id_from_uri(
                        element_data['sources']
                    )
                    source_ids = map(int, localSources)
                    item.sources.add(*source_ids)

            id_list.append(item.save())

    update_object.delay(username)
    entity_set = entity_set.rstrip(';')
    return get_result_objects(entity_set, mode, username)
