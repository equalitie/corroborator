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
from corroborator_app.multisave import multi_save_actors, multi_save_entities
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
        predefined_search_set = PredefinedSearch.objects.all()
        crimes_set = CrimeCategory.objects.all()
        status_set = StatusUpdate.objects.all()
        sources_set = Source.objects.all()
        users_set = User.objects.all()
        #loc_set = Location.objects.annotate(count=Count('bulletin')).filter(count__gt=0)
        loc_set = Location.objects.all()
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
                'predefined_search_set': predefined_search_set,
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
                'solr_url': 'https://sjac.corroborator.org/solr/collection1/',
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
        predefined_search_set = PredefinedSearch.objects.all()
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
                'predefined_search_set': predefined_search_set,
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

def lookup_bulletin(request, bulletin_id, mode):
    username = request.GET.get('username')
    response_data = []
    if mode == 'multisave':
        #if request.method == "POST" and request.is_ajax():
        element_data = json.loads(request.raw_post_data)
        response_data = json.dumps(multi_save_entities(element_data,
            'bulletin', username))
    return HttpResponse(response_data, mimetype='application/json')

def lookup_incident(request, incident_id, mode):
    username = request.GET.get('username')
    response_data = []
    if mode == 'multisave':
        #if request.method == "POST" and request.is_ajax():
        element_data = json.loads(request.raw_post_data)
        response_data = json.dumps(multi_save_entities(element_data,
            'incident', username))
    return HttpResponse(response_data, mimetype='application/json')

def lookup_actor(request, actor_id, mode):
    username = request.GET.get('username')
    response_data = []
    if mode == 'multisave':
        element_data = json.loads(request.raw_post_data)
        response_data = json.dumps(multi_save_actors(element_data,
            username))
    return HttpResponse(response_data, mimetype='application/json')
