"""
This file handles the core views for th Corroborator application.

Author: Bill Doran
2013/02/10
"""
import datetime
import calendar
from django.core import serializers
from django.shortcuts import render_to_response, get_object_or_404, render
from django.contrib.auth import authenticate,  login
from django.contrib.auth.models import User
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from corroborator_app.models import Incident, CrimeCategory, Actor, Bulletin,\
    TimeInfo, Location, Source, StatusUpdate, ActorRole, Label, SourceType,\
    Media, Comment, PredefinedSearch, ActorRelationship
from django.utils import simplejson as json
from django.db.models import Count
from tastypie.models import ApiKey
from corroborator_app.multisave import multi_save_actors, multisave_entities
def login_user(request):
    state = "Please log in below..."
    username = password = ''
    if request.POST:
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username,  password=password)
        if user is not None:
            if user.is_active:
                login(request,  user)
                state = "You're successfully logged in!"
                return HttpResponseRedirect('/corroborator/')
            else:
                state = "Your account is not active,\
                please contact the site admin."
                return render_to_response('auth.html', \
                {'state':state,  'username': username}, RequestContext(request))
        else:
            state = "Your username and/or password were incorrect."
            return render_to_response('auth.html', {'state':state, \
            'username': username}, RequestContext(request))

    return render_to_response('auth.html', {'state':state, \
    'username': username}, RequestContext(request))




#def index(request,  *args,  **kwargs):
    #username = 'admin'
    #if request.user.is_authenticated():
        #username = request.user.username
        #userid = request.user.id

        #ps_list = PredefinedSearch.objects.filter(
            #user_id = request.user.id).order_by('search_type')
        #ps_incident_list = []
        #ps_bulletin_list = []
        #ps_actor_list = []
        #for ps in ps_list:
            #if ps.search_type == 'incident':
                #ps_incident_list.append(ps)
            #elif ps.search_type == 'bulletin':
                #ps_bulletin_list.append(ps)
            #elif ps.search_type == 'actor':
                #ps_actor_list.append(ps)
        #labels_set = Label.objects.all()
        #role_status_set = []
        #rs = ActorRole.ROLE_STATUS
        #for r in rs:
            #role_status_set.append(r[0])

        #relation_status_set = []
        #rls = ActorRelationship.RELATION
        #for r in rls:
            #relation_status_set.append(r[0])

        #crimes_set = CrimeCategory.objects.all()
        #status_set = StatusUpdate.objects.all()
        #sources_set = Source.objects.all()
        #users_set = User.objects.all()
        #loc_set = Location.objects.annotate(count=Count('bulletin')).filter(count__gt=0)
        #loc_set = loc_set.values('name_en', 'latitude', 'longitude', 'count')
        #return render(
            #request, 'search.html',
            #{
                #'role_status_set': role_status_set,
                #'relation_status_set': relation_status_set,
                #'sources_set': sources_set,
                #'labels_set': labels_set,
                #'crimes_set': crimes_set,
                #'status_set': status_set,
                #'users_set': users_set,
                #'loc_set': loc_set,
                #'username': username,
                #'userid': userid,
                #'ps_incident_list': ps_incident_list,
                #'ps_bulletin_list': ps_bulletin_list,
                #'ps_actor_list': ps_actor_list
            #}
        #)
    #else:
        #return render_to_response('auth.html', RequestContext(request))

def index(request, *args, **kwargs):
    if request.user.is_authenticated():
        username = request.user.username
        userid = request.user.id

        ps_list = PredefinedSearch.objects.filter(
            user_id = request.user.id).order_by('search_type')
        ps_incident_list = []
        ps_bulletin_list = []
        ps_actor_list = []
        labels_set = Label.objects.all()

        role_status_set = []
        roles = ActorRole.ROLE_STATUS
        for role in roles:
            role_status_set.append({
                'key':role[0],
                'value': role[1]}
            )

        relation_status_set = []
        relations = ActorRole.RELATION
        for relation in relations:
            relation_status_set.append({
                'key': relation[0],
                'value': relation[1]}
            )

        crimes_set = CrimeCategory.objects.all()
        status_set = StatusUpdate.objects.all()
        sources_set = Source.objects.all()
        users_set = User.objects.all()
        loc_set = Location.objects.annotate(count=Count('bulletin')).filter(count__gt=0)
        loc_set = Location.objects.all()
        #loc_set = loc_set.values('name_en', 'latitude', 'longitude', 'count')
        loc_set = loc_set.values('name_en', 'latitude', 'longitude')

        #api details
        user = User.objects.get(username=username)
        api = ApiKey.objects.get(user=user)

        return render(
            request, 'new_search.html',
            {
                'role_status_set': role_status_set,
                'relation_status_set': relation_status_set,
                'sources_set': sources_set,
                'labels_set': labels_set,
                'crimes_set': crimes_set,
                'status_set': status_set,
                'users_set': users_set,
                'loc_set': loc_set,
                'username': username,
                'userid': userid,
                'ps_list': ps_list,
                'api_key': api.key,
                'solr_url': 'https://sjac.rightscase.org/solr/collection1/',
            }
        )
    else:
        return render_to_response('auth.html', RequestContext(request))

def new_index(request, *args, **kwargs):
    username = 'admin'
    if request.user.is_authenticated():
        username = request.user.username
        userid = request.user.id

        ps_list = PredefinedSearch.objects.filter(
            user_id = request.user.id).order_by('search_type')
        ps_incident_list = []
        ps_bulletin_list = []
        ps_actor_list = []
        labels_set = Label.objects.all()

        role_status_set = []
        roles = ActorRole.ROLE_STATUS
        for role in roles:
            role_status_set.append({
                'key':role[0],
                'value': role[1]}
            )

        relation_status_set = []
        relations = ActorRole.RELATION
        for relation in relations:
            relation_status_set.append({
                'key': relation[0],
                'value': relation[1]}
            )

        crimes_set = CrimeCategory.objects.all()
        status_set = StatusUpdate.objects.all()
        sources_set = Source.objects.all()
        users_set = User.objects.all()
        loc_set = Location.objects.all()
        #loc_set = Location.objects.annotate(count=Count('bulletin')).filter(count__gt=0)
        #loc_set = loc_set.values('name_en', 'latitude', 'longitude', 'count')
        #loc_set = loc_set.values('name_en', 'latitude', 'longitude')

        #api details
        user = User.objects.get(username=username)
        api = ApiKey.objects.get(user=user)

        return render(
            request, 'new_search.html',
            {
                'role_status_set': role_status_set,
                'relation_status_set': relation_status_set,
                'sources_set': sources_set,
                'labels_set': labels_set,
                'crimes_set': crimes_set,
                'status_set': status_set,
                'users_set': users_set,
                'loc_set': loc_set,
                'username': username,
                'userid': userid,
                'ps_list': ps_list,
                'api_key': api.key,
                'solr_url': 'http://127.0.0.1:8983/solr/collection1/',
            }
        )
    else:
        return render_to_response('auth.html', RequestContext(request))


def home(request, *args, **kwargs):
    if request.user.is_authenticated():
        bulletins = Bulletin.objects.filter(assigned_user_id=request.user.id)
        incidents = Incident.objects.filter(assigned_user_id=request.user.id)
        username = request.user.username
        return render(request, 'user_home.html', {'username': username, 'b': bulletins, 'i': incidents})
    else:
        return render_to_response('auth.html', RequestContext(request))

def add_predefined_search(request, search_id, mode):
    if request.method == "POST" and request.is_ajax():
        element_data = json.loads(request.raw_post_data)
        ps = PredefinedSearch()
        ps.name_en = element_data['name_en']
        ps.name_ar = ''
        ps.search_request = element_data['search_request']
        ps.search_type = element_data['search_type']
        ps.user_id = request.user.id
        ps.save()

    return render(request, 'predefined_search_element.html', {'predefined_search': ps})


def lookup_bulletin(request, bulletin_id, mode):
    status_set = StatusUpdate.objects.all()
    users_set = User.objects.all()
    sources_set = Source.objects.all()
    media_set = Media.objects.all()
    labels_set = Label.objects.all()
    username = request.user.username
    userid = request.user.id

    if 'edit' in mode:
        bulletin_result = get_object_or_404(Bulletin, pk=bulletin_id)
        time_string = bulletin_result.get_time_length()
        return render_to_response(
            'bulletin_new.html',
            {
                'username': username,
                'userid': userid,
                'time_string': time_string,
                'bulletin_result': bulletin_result,
                'status_set': status_set,
                'sources_set': sources_set,
                'labels_set': labels_set,
                'users_set': users_set,
                'media_set': media_set
            },
            RequestContext(request)
        )

    elif 'new' in mode:
        return render_to_response(
            'bulletin_new.html',
            {
                'username': username,
                'userid': userid,
                'status_set': status_set,
                'sources_set': sources_set,
                'labels_set': labels_set,
                'users_set': users_set
            },
            RequestContext(request)
        )

    elif mode == 'save':
        if request.method == "POST" and request.is_ajax():
            element_data = json.loads(request.raw_post_data)
            b = save_element(element_data, bulletin_id, 'bulletin')
            return render_to_response('bulletin_view.html', {'bulletin_result': b}, RequestContext(request))

    elif mode == 'delete':
        if request.method == "POST" and request.is_ajax():
            element_data = json.loads(request.raw_post_data)
            delete_entities(element_data, 'bulletin')

        return render_to_response('bulletin_view.html', {'bulletin_result': 'ya'}, RequestContext(request))

    elif mode == 'multisave':
        if request.method == "POST" and request.is_ajax():
            element_data = json.loads(request.raw_post_data)
            multi_save_entities(element_data, 'bulletin')
        return render_to_response(
            'incident_multi_save_result.html',
            {'incident_result': 'success'},
            RequestContext(request)
        )
    elif mode == 'uploadmedia':
        if request.method == "POST" and request.is_ajax():
            m = Media()
            m.name_en = request.FILES['files'].name
            m.name_ar = ''
            m.media_file = request.FILES['files']
            m.save()
            response_data = {'name':request.FILES['files'].name, 'id':m.id, 'uri':str(m.media_file)}
        return HttpResponse(json.dumps(response_data),  mimetype="application/json")
    else:
        bulletin_result = get_object_or_404(Bulletin, pk=bulletin_id)
        return render_to_response('bulletin_view.html', {'bulletin_result':bulletin_result},RequestContext(request))


def delete_entities(element_data, mode):
    ids = map(int,element_data)
    if mode == 'bulletin':
        Bulletin.objects.filter(id__in=ids).delete()

    elif mode == 'incident':
        Incident.objects.filter(id__in=ids).delete()

    else:
        Actor.objects.filter(id__in=ids).delete()


def save_element(element_data, element_id, mode):
    b = ''
    userid = None
    cscore = 0
    desc = ''
    title = ''
    time_ids = []
    actor_role_ids = []
    comment_ids = []
    if len(element_data['titles']) > 0:
        title = element_data['titles'][0]['title_en'] if element_data['titles'][0]['title_en'] is not None else ''

    if len(element_data['users']) > 0:
        userid = element_data['users'][0]['user'] if element_data['users'][0]['user'] is not '' else None

    if len(element_data['confidence_scores']) > 0:
        cscore = int(element_data['confidence_scores'][0]['confidence_score']) if element_data['confidence_scores'][0]['confidence_score'] != '' else 0

    if len(element_data['descriptions']) > 0:
        desc = element_data['descriptions'][0]['description_en'] if element_data['descriptions'][0]['description_en'] is not None else ''

    if element_id == '0':
        if mode == 'bulletin':
            b = Bulletin()
            b.description_en = desc
            b.type = 'Video'
            b.description_ar = ''
        else:
            b = incident()
            b.incident_details_en = desc
            b.incident_details_ar = ''

        b.title_en = title
        b.confidence_score = cscore
        b.title_ar = ''
        b.assigned_user_id = userid
        b.save()
    else:
        if mode == 'bulletin':
            b = get_object_or_404(bulletin, pk=element_id)
            b.description_en = desc
            b.type = 'Video'
            b.description_ar = ''
            b.sources.clear()
            b.medias.clear()
            b.ref_bulletins.clear()
        else:
            b = get_object_or_404(incident, pk=element_id)
            b.incident_details_en = desc
            b.incident_details_ar = ''
            b.bulletins.clear()
            b.ref_incidents.clear()
            b.crimes.clear()

        b.title_en = title
        b.confidence_score = cscore
        b.title_ar = ''
        b.assigned_user_id = userid

        b.labels.clear()
        b.actors_role.clear()
        b.locations.clear()
        b.times.clear()

    for a in element_data['actors']:
        actor_local = actor.objects.get(pk=int(a['id']))
        role_local = role(role_status=a['status_en'], actor_id=int(a['id']))
        role_local.save()
        actor_role_ids.append(role_local.id)
    for event in element_data['events']:
        from_date = datetime.datetime.strptime(event['from'], '%Y-%m-%dT%H:%M:%S.%fZ')
        to_date = datetime.datetime.strptime(event['to'], '%Y-%m-%dT%H:%M:%S.%fZ')
        time_info_local = time_info(time_from=from_date, time_to=to_date, comments_en=event['comment_en'], event_name_en=event['name_en'], confidence_score=event['confidence_score'])
        time_info_local.save()
        time_ids.append(time_info_local.id)

    if len(time_ids) > 0:
        b.times.add(*time_ids)
    if len(element_data['locations']) > 0:
        location_ids = map(int,  element_data['locations'])
        b.locations.add(*location_ids)
    if len(actor_role_ids) > 0:
        b.actors_role.add(*actor_role_ids)
    if len(element_data['labels']) > 0:
        labeling_ids = map(int, element_data['labels'])
        b.labels.add(*labeling_ids)
    if len(element_data['new_comments']) > 0:
        for comment_e in element_data['new_comments']:
            created_date = datetime.datetime.strptime(comment_e['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
            comment_local = comment(comments_en=comment_e['comments_en'], assigned_user_id=comment_e['assigned_user'], status_id=comment_e['statusid'], comment_created=created_date)
            comment_local.save()
            comment_ids.append(comment_local.id)
    if len(comment_ids) > 0:
        if mode == 'incident':
            b.incident_comments.add(*comment_ids)
        else:
            b.bulletin_comments.add(*comment_ids)

    if mode == 'bulletin':
        if len(element_data['sources']) > 0:
            source_ids = map(int, element_data['sources'])
            b.sources.add(*source_ids)
        if len(element_data['media']) > 0:
            media_ids = map(int, element_data['media'])
            b.medias.add(*media_ids)
        if len( element_data['bulletins']) > 0:
            bulletin_ids = map(int, element_data['bulletins'])
            b.ref_bulletins.add(*bulletin_ids)
    else:

        if len( element_data['bulletins']) > 0:
            bulletin_ids = map(int, element_data['bulletins'])
            b.bulletins.add(*bulletin_ids)
        if len( element_data['incidents']) > 0:
            incident_ids = map(int, element_data['incidents'])
            b.ref_incidents.add(*incident_ids)
        if len(element_data['crimes']) > 0:
            crime_ids = map(int, element_data['crimes'])
            b.crimes.add(*crime_ids)

    b.save()
    return b
def lookup_incident(request, incident_id, mode):
    username = request.user.username
    userid = request.user.id
    status_set = StatusUpdate.objects.all()
    users_set = User.objects.all()
    labels_set = labeling.objects.all()
    crimes_set = crime_category.objects.all()
    if 'edit' in mode:
        incident_result = get_object_or_404(incident,  pk=incident_id)
        time_string = incident_result.get_time_length()
        return render_to_response('incident_new.html',  {'username':username, 'userid':userid, 'time_string':time_string, 'incident_result':incident_result, 'status_set':status_set, 'crimes_set':crimes_set, 'labels_set':labels_set, 'users_set':users_set}, RequestContext(request))
    elif 'new' in mode:
        return render_to_response('incident_new.html', {'username':username, 'userid':userid, 'status_set':status_set, 'crimes_set':crimes_set, 'labels_set':labels_set, 'users_set':users_set}, RequestContext(request))
    elif mode == 'save':
        if request.method == "POST" and request.is_ajax():
            element_data = json.loads(request.raw_post_data)
            i = save_element(element_data,incident_id,'incident')
        return render_to_response('incident_view.html', {'incident_result': i},RequestContext(request))

    elif 'delete' in mode:
        if request.method == "POST" and request.is_ajax():
            element_data = json.loads(request.raw_post_data)
            delete_entities(element_data, 'incident')
        return render_to_response(
            'incident_view.html',
            {'incident_result': 'success'},
            RequestContext(request))

    elif 'multisave' in mode:
        if request.method == "POST" and request.is_ajax():
            element_data = json.loads(request.raw_post_data)
            multi_save_entities(element_data, 'incident')
        return render_to_response(
            'incident_multi_save_result.html',
            {'incident_result': 'success'},
            RequestContext(request))

    elif 'view' in mode:
        incident_result = get_object_or_404(Incident, pk=incident_id)
        return render_to_response(
            'incident_view.html',
            {'incident_result': incident_result},
            RequestContext(request)
        )



def lookup_actor(request, actor_id, mode):
    relation_status_set = []
    rls = ActorRelationship.RELATION
    for r in rls:
        relation_status_set.append(r[0])

    if 'edit' in mode:
        locations_set = Location.objects.values('id', 'name_en')
        years = list(str(n) for n in range(1920, datetime.datetime.now().year + 1))
        months = list((n) for n in calendar.month_abbr[1:])
        days = list(int(n) for n in range(1,  32))

        actor_result = get_object_or_404(Actor, pk=actor_id)
        return render_to_response(
            'actor_new.html',
            {
                'relation_status_set': relation_status_set,
                'actor_result': actor_result,
                'years': years,
                'days': days,
                'months': months,
                'locations_set': locations_set
            },
            RequestContext(request)
        )

    elif 'new' in mode:

        years = list(str(n) for n in range(1920, datetime.datetime.now().year + 1))
        locations_set = Location.objects.values('id', 'name_en')
        months = list((n) for n in calendar.month_abbr[1:])
        days = list(str(n) for n in range(1,  32))
        username = request.user.username
        userid = request.user.id
        return render_to_response(
            'actor_new.html',
            {
                'relation_status_set': relation_status_set,
                'years': years,
                'days': days,
                'months': months,
                'locations_set': locations_set,
                'username': username,
                'userid': userid
            },
            RequestContext(request)
        )

    elif mode == 'multisave'
        if request.method == "POST" and request.is_ajax():
            element_data = json.loads(request.raw_post_data)
            multi_save_actors(element_data)
        return render_to_response(
            'incident_multi_save_result.html',
            {'incident_result': 'success'},
            RequestContext(request)
        )
    elif mode == 'save':

        actorData = json.loads(request.raw_post_data)
        actor_result = ''
        media_id = int(actorData['media_id']) if actorData['media_id'] != '' else None
        dobDT = datetime.datetime.strptime(actorData['DOB'], '%Y-%m-%dT%H:%M:%S.%fZ') if actorData['DOB'] is not None else None
        if actor_id == '0':
            actor_result = Actor()
            actor_result.fullname_en = actorData['fullname_en']
            actor_result.nickname_en = actorData['nickname_en']
            actor_result.sex_en = actorData['sex_en']
            actor_result.age_en = actorData['age_en']
            actor_result.position_en = actorData['position_en']
            actor_result.occupation_en = actorData['occupation_en']
            actor_result.ethnicity_en = actorData['ethnicity_en']
            actor_result.nationality_en = actorData['nationality_en']
            actor_result.spoken_dialect_en = actorData['spoken_dialect_en']
            actor_result.religion_en = actorData['religion_en']
            actor_result.civilian_en = actorData['civilian_en']
            actor_result.sex_ar = ''
            actor_result.age_ar = ''
            actor_result.ethnicity_ar = ''
            actor_result.religion_ar = ''
            actor_result.spoken_dialect_ar = ''
            actor_result.nickname_ar = ''
            actor_result.fullname_ar = ''
            actor_result.POB_id = int(actorData['POB']) if actorData['POB'] is not '' else None
            actor_result.civilian_ar = ''
            actor_result.position_ar = ''
            actor_result.occupation_ar = ''
            actor_result.nationality_ar = ''
            actor_result.DOB = dobDT
            actor_result.media_id = media_id

        else:
            actor_result = get_object_or_404(Actor, pk=actor_id)
            actor_result.fullname_en = actorData['fullname_en']
            actor_result.nickname_en = actorData['nickname_en']
            actor_result.sex_en = actorData['sex_en']
            actor_result.age_en = actorData['age_en']
            actor_result.position_en = actorData['position_en']
            actor_result.occupation_en = actorData['occupation_en']
            actor_result.ethnicity_en = actorData['ethnicity_en']
            actor_result.nationality_en = actorData['nationality_en']
            actor_result.spoken_dialect_en = actorData['spoken_dialect_en']
            actor_result.religion_en = actorData['religion_en']
            actor_result.civilian_en = actorData['civilian_en']
            actor_result.sex_ar = ''
            actor_result.age_ar = ''
            actor_result.ethnicity_ar = ''
            actor_result.religion_ar = ''
            actor_result.spoken_dialect_ar = ''
            actor_result.nickname_ar = ''
            actor_result.fullname_ar = ''
            actor_result.POB_id = int(actorData['POB']) if actorData['POB'] is not '' else None
            actor_result.civilian_ar = ''
            actor_result.position_ar = ''
            actor_result.occupation_ar = ''
            actor_result.nationality_ar = ''
            actor_result.DOB = dobDT
            actor_result.media_id = media_id
            actor_result.related_actors.clear()
        actor_result.save()
        actor_relations = []
        for a in actorData['actors']:
            relation_local = ActorRelationship(
                relation_status=a['status_en'],
                actor_a_id=actor_result.id,
                actor_b_id=int(a['id'])
            )
            relation_local.save()
            #actor_relation_ids.append(relation_local.id)
            #actor_relations.append(relation_local)
        #if len(actor_relation_ids) > 0:
            #actor_result.related_actors.add(*actor_relation_ids)

        roles = ActorRole.objects.filter(actor=actor_id)
        incident_result = Incident.objects.filter(actors_role__in=roles)
        bulletin_result = Bulletin.objects.filter(actors_role__in=roles)
        return render_to_response(
            'actor_view.html', {
            'actor_result': actor_result,
            'bulletins': bulletin_result,
            'incidents': incident_result,
            'actor_relations': actor_relations
            },
            RequestContext(request)
        )

    elif 'delete' in mode:
        if request.method == "POST" and request.is_ajax():
            element_data = json.loads(request.raw_post_data)
            delete_entities(element_data, 'actor')
        return render_to_response(
            'bulletin_view.html',
            {'bulletin_result': 'ya'},
            RequestContext(request)
        )
    else:
        actor_result = get_object_or_404(Actor, pk=actor_id)
        roles = ActorRole.objects.filter(actor=actor_id)
        incident_result = Incident.objects.filter(actors_role__in=roles)
        bulletin_result = Bulletin.objects.filter(actors_role__in=roles)
        return render_to_response(
            'actor_view.html',
            {
                'actor_result': actor_result,
                'bulletins': bulletin_result,
                'incidents': incident_result
            },
            RequestContext(request)
        )
