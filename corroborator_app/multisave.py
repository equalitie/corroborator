'''
add file docstring
'''
from tastypie.models import ApiKey
from tastypie.test import TestApiClient
from django.contrib.auth.models import User
from corroborator_app.models import Incident, Actor, Bulletin, ActorRole
from corroborator_app.tasks import update_object


def multi_save_actors(element_data, username):
    '''
    add docstring
    this method is too long and should be refactored
    '''
    actor_data = element_data
    list_actors = Actor.objects.filter(
        id__in=batch_parse_id_from_uri(actor_data['actors'])
    )
    actor_set = ''
    for item in list_actors:
        actor_role_ids = []
        actor_set += str(item.id) + ';' 
        # surely there is a better way to do this
        item.age_en = actor_data['age_en']
        item.age_ar = actor_data['age_ar']
        item.sex_en = actor_data['sex_en']
        item.sex_ar = actor_data['sex_ar']
        item.position_en = actor_data['position_en']
        item.position_ar = actor_data['position_ar']
        item.occupation_en = actor_data['occupation_en']
        item.occupation_ar = actor_data['occupation_ar']
        item.ethnicity_en = actor_data['ethnicity_en']
        item.ethnicity_ar = actor_data['ethnicity_ar']
        item.nationality_en = actor_data['nationality_en']
        item.nationality_ar = actor_data['nationality_ar']
        item.spoken_dialect_en = actor_data['spoken_dialect_en']
        item.spoken_dialect_ar = actor_data['spoken_dialect_ar']
        item.religion_en = actor_data['religion_en']
        item.religion_ar = actor_data['religion_ar']
        item.civilian_en = actor_data['civilian_en']
        item.civilian_ar = actor_data['civilian_ar']

        item.current_location_id = parse_id_from_uri(
            actor_data['current_location'])
        item.save()

        # don't use single letter variables
        for a in element_data['actorsRoles']:
            local_id = parse_id_from_uri(a['actor'])
            actor_role = get_role_for_actor(item, local_id)
            role_local = ''
            if actor_role == '':
                role_local = ActorRole(relation_status=a['relation_status'],\
                        actor_id=int(local_id), role_en=a['role_en'])
            else:
                role_local = actor_role
                role_local.relation_status = a['relation_status']
                role_local.role_en = a['role_en']
            role_local.save()
            actor_role_ids.append(role_local.id)

        if len(actor_role_ids) > 0:
            item.actors_role.add(*actor_role_ids)
    
    update_object.delay(username)    
    
    actor_set = actor_set.rstrip(';')

    return get_result_objects(actor_set, 'actor', username)

def get_result_objects(id_set, mode, username):
    '''
    add docstring, and test
    '''
    api_key=''
    user = User.objects.get(username=username)
    try:
        api_key = ApiKey.objects.get(user=user)
    except ApiKey.DoesNotExist:
        api_key = ApiKey.objects.create(user=user)
    auth_string = '&username={0}&api_key={1}'.format(
        username, 
        api_key.key
    )
    
    uri = '/api/v1/{0}/set/{1}/?format{2}'.format(
        mode,
        id_set, 
        auth_string
    )
    result=TestApiClient().get(uri)
    return result.content

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
    add docstring
    '''
    tokens = uri.split('/')
    id=tokens[len(tokens)-2]
    return id

def batch_parse_id_from_uri(batch):
    '''
    add docstring
    '''
    localBatch = []
    for item in batch:
        tokens = item.split('/')
        localBatch.append(tokens[len(tokens)-2])
        
    return localBatch

def get_role_for_actor(entity, actor_id):
    '''
    add docstring
    '''
    roles = entity.actors_role.filter(actor_id=actor_id)
    if len(roles) > 0:
        return roles[0]
    else:
        return ''

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
            cscore=element_data['confidence_score']
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
    if mode  ==  'incident':
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


