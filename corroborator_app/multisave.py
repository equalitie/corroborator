import datetime
import calendar

from corroborator_app.models import Incident, CrimeCategory, Actor, Bulletin,\
    TimeInfo, Location, Source, StatusUpdate, ActorRole, Label, SourceType,\
    Media, Comment, PredefinedSearch, ActorRelationship

def multi_save_actors(element_data):
    actor_role_ids = []
    actorData = element_data
    list_actors = Actor.objects.filter(id__in=actorData['update_actors'])
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
        item.save()
    for a in element_data['actors']:
        actor_local = Actor.objects.get(pk=int(a['id']))
        role_local = ActorRole(relation_status=a['status_en'], actor_id=int(a['id']))
        role_local.save()
        actor_role_ids.append(role_local.id)
    if len(actor_role_ids) > 0:
        item.actors_role.add(*actor_role_ids)


def multi_save_entities(element_data, mode):
    list_entities = []
    statusid = ''
    comment_ids = []
    actor_role_ids = []
    cscore = 0
    userid = ''
    if len(element_data['confidence_scores']) > 0:
        cscore=int(element_data['confidence_scores'][0]['confidence_score']) if element_data['confidence_scores'][0]['confidence_score'] != '' else 0
    if len(element_data['users']) > 0:
        userid = element_data['users'][0]['user'] if element_data['users'][0]['user'] !=  '' else None

    if len(element_data['statuses']) > 0:
        statusid = int(element_data['statuses'][0]['status']) if element_data['statuses'][0]['status'] !=  '' else None
    if mode  ==  'incident':
        list_entities = Incident.objects.filter(id__in=element_data['incidents'])
    elif mode  ==  'bulletin':
        list_entities = Bulletin.objects.filter(id__in=element_data['bulletins'])
    else:
        list_entities = Actor.objects.filter(id__in=element_data['actors'])

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
                labeling_ids = map(int, element_data['labels'])
                item.labels.add(*labeling_ids)
            for a in element_data['actors']:
                actor_local = Actor.objects.get(pk=int(a['id']))
                role_local = ActorRole(role_status=a['status_en'], actor_id=int(a['id']))
                role_local.save()
                actor_role_ids.append(role_local.id)
            if len(actor_role_ids) > 0:
                item.actors_role.add(*actor_role_ids)
            if mode  ==  'incident':
                if len(element_data['crimes']) > 0:
                    crime_ids = map(int, element_data['crimes'])
                    item.crimes.add(*crime_ids)
                if len( element_data['relate_incidents']) > 0:
                    incident_ids = map(int, element_data['relate_incidents'])
                    item.ref_incidents.add(*incident_ids)
                if len( element_data['relate_bulletins']) > 0:
                    bulletin_ids = map(int, element_data['relate_bulletins'])
                    item.bulletins.add(*bulletin_ids)

            else:
                if len(element_data['sources']) > 0:
                    source_ids = map(int, element_data['sources'])
                    item.sources.add(*source_ids)
                if len( element_data['relate_bulletins']) > 0:
                    bulletin_ids = map(int, element_data['relate_bulletins'])
                    item.ref_bulletins.add(*bulletin_ids)
            item.save()


