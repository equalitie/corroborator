import datetime
import calendar

from corroborator_app.models import Incident, CrimeCategory, Actor, Bulletin,\
    TimeInfo, Location, Source, StatusUpdate, ActorRole, Label, SourceType,\
    Media, Comment, PredefinedSearch, ActorRelationship
from corroborator_app.tasks import update_object

def multi_save_actors(element_data, username):
    actor_role_ids = []
    actorData = element_data
    list_actors = Actor.objects.filter(
        id__in=batch_parse_id_from_uri(actorData['actors'])
    )
    for item in list_actors:
        item.age_en = actorData['age_en']
        item.age_ar = actorData['age_ar']
        item.sex_en = actorData['sex_en']
        item.sex_ar = actorData['sex_ar']
        item.position_en = actorData['position_en']
        item.position_ar = actorData['position_ar']
        item.occupation_en = actorData['occupation_en']
        item.occupation_ar = actorData['occupation_ar']
        item.ethnicity_en = actorData['ethnicity_en']
        item.ethnicity_ar = actorData['ethnicity_ar']
        item.nationality_en = actorData['nationality_en']
        item.nationality_ar = actorData['nationality_ar']
        item.spoken_dialect_en = actorData['spoken_dialect_en']
        item.spoken_dialect_ar = actorData['spoken_dialect_ar']
        item.religion_en = actorData['religion_en']
        item.religion_ar = actorData['religion_ar']
        item.civilian_en = actorData['civilian_en']
        item.civilian_ar = actorData['civilian_ar']
        item.POB_id =\
            parse_id_from_uri(actorData['POB'])
        item.current_location_id =\
            parse_id_from_uri(actorData['current_location'])
        item.save()
        for a in element_data['actorsRoles']:
            localID = parse_id_from_uri(a['actor'])
            #actor_local = Actor.objects.get(pk=int(a['resource_uri']))
            role_local = ActorRole(relation_status=a['relation_status'],\
                actor_id=int(localID), role_en=a['role_en'])
            role_local.save()
            actor_role_ids.append(role_local.id)
        if len(actor_role_ids) > 0:
            item.actors_role.add(*actor_role_ids)
    
    update_object.delay(username)    
    
    actorData['actorRoles'] = generate_uris(actor_role_ids, 'actorRole')

    return actorData

def generate_uris(batch, entity):
    new_uris = []
    for id in batch:
        new_uri = '/api/v1/{0}/{1}/'.format(entity, id)
        new_uris.append(new_uri)

    return new_uris

def parse_id_from_uri(uri):
    tokens = uri.split('/')
    print 'test'
    id=tokens[len(tokens)-2]
    return id

def batch_parse_id_from_uri(batch):
    localBatch = []
    for item in batch:
        tokens = item.split('/')
        localBatch.append(tokens[len(tokens)-2])
        
    return localBatch


def multi_save_entities(element_data, mode, username):
    list_entities = []
    statusid = ''
    comment_ids = []
    actor_role_ids = []
    cscore = 0
    userid = ''
    id_list = []
    if element_data['confidence_score'] != '':
        cscore=element_data['confidence_score']
    if element_data['assigned_user'] != '':
        userid = element_data['assigned_user'].split('/')
        userid = userid[len(userid)-1]

    if mode  ==  'incident':
        list_entities = Incident.objects.filter(
            id__in=batch_parse_id_from_uri(element_data['incidents'])
        )
    elif mode  ==  'bulletin':
        list_entities = Bulletin.objects.filter(
            id__in=batch_parse_id_from_uri(element_data['bulletins'])
        )
    for item in list_entities:
        if mode  ==  'bulletin' or mode  ==  'incident':
            item.confidence_score = cscore
            #item.status_id=statusid
            item.assigned_user_id = userid
            """
            if len(element_data['new_comments']) > 0:
                for comment_e in element_data['new_comments']:
                    created_date = datetime.datetime.strptime(comment_e['comment_created'], '%Y-%m-%dT%H:%M:%S.%fZ')
                    comment_local = Comment(comments_en=comment_e['comments_en'], assigned_user_id=comment_e['assigned_user'], status_id=comment_e['status_id'], comment_created=created_date)
                    comment_local.save()
                    comment_ids.append(comment_local.id)
            if len(comment_ids) > 0:
                if mode  ==  'incident':
                    item.incident_comments.add(*comment_ids)
                else:
                    item.bulletin_comments.add(*comment_ids)
            """        
            if len(element_data['labels']) > 0:
                localLabels = batch_parse_id_from_uri(
                    element_data['labels']
                )
                labeling_ids = map(int, localLabels)
                item.labels.add(*labeling_ids)
            for a in element_data['actorsRoles']:
                #actor_local = Actor.objects.get(pk=int(a['id']))
                localID = parse_id_from_uri(a['actor'])
                role_local = ActorRole(role_status=a['role_status'],\
                    actor_id=int(localID), role_en=a['role_en'])
                role_local.save()
                actor_role_ids.append(role_local.id)
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
    element_data['actorRoles'] = generate_uris(actor_role_ids, 'actorRole')

    return element_data


