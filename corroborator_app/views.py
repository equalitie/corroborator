"""
This file handles the core views for th Corroborator application.

Author: Bill Doran
2013/02/10
"""
import json

from django.db.models import Q
from django.shortcuts import render_to_response, render
from django.contrib.auth import authenticate,  login
from django.contrib.auth.models import User
from django.template import RequestContext
from django.http import HttpResponseRedirect

from tastypie.models import ApiKey

from corroborator_app.multisave import multi_save_actors, \
    multi_save_bulletins, multi_save_incidents
from corroborator_app.models import CrimeCategory, \
    Location, Source, StatusUpdate, ActorRole, Label, \
    PredefinedSearch
from corroborator_app.authproxy.awsAuthProxy import AWSAuthProxy
from corroborator_app.authproxy.solrAuthProxy import SolrAuthProxy

###############################################################################
# FORMATTING HELPER METHODS
###############################################################################


def format_predefined_search(predef_object):
    """
    format the predefined search filters into a javascript readable
    format
    """
    predef_object.actor_filters =\
        format_filters(predef_object.actor_filters)
    predef_object.bulletin_filters =\
        format_filters(predef_object.bulletin_filters)
    predef_object.incident_filters =\
        format_filters(predef_object.incident_filters)
    return predef_object


def format_filters_for_tastypie(filter_field):
    """
    make it proper json for JSON.parse
    """
    return format_filters(filter_field).replace("\'", "\"")


def format_filters(filter_field):
    """
    format a single filter
    """
    return json.dumps(filter_field).replace("u\'", "\'").strip('"')


def get_solr_url(path):
    '''
    set the solr url that we are connecting to
    '''
    if path.find('new_corroborator') > -1:
        solr_path = 'http://127.0.0.1:8983/solr/collection1/'
    else:
        solr_path = 'http://demo.corroborator.org/solr/collection1/'
    return solr_path


###############################################################################
# MAIN VIEW METHODS -
###############################################################################


def login_user(request):
    '''
    login view
    '''
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
                return render_to_response(
                    'auth.html',
                    {
                        'state': state,
                        'username': username
                    },
                    RequestContext(request)
                )
        else:
            state = "Your username and/or password were incorrect."
            return render_to_response(
                'auth.html',
                {
                    'state': state,
                    'username': username
                },
                RequestContext(request)
            )

    return render_to_response(
        'auth.html',
        {
            'state': state,
            'username': username
        },
        RequestContext(request)
    )


def index(request, *args, **kwargs):
    """
    main view method - this renders the production app page and adds all
    bootstrap variables required - this is used at / and /corroborator
     handle formatting of lists outside the view function
    """
    if request.user.is_authenticated():
        username = request.user.username
        userid = request.user.id

        labels_set = Label.objects.all()

        role_status_set = []
        roles = ActorRole.ROLE_STATUS
        for role in roles:
            role_status_set.append({
                'key': role[0],
                'value': role[1]}
            )

        relation_status_set = []
        relations = ActorRole.RELATION
        for relation in relations:
            relation_status_set.append({
                'key': relation[0],
                'value': relation[1]}
            )

        predefined_search_set = PredefinedSearch.objects.filter(
            Q(user_id=userid) | Q(make_global=True)
        )
        predefined_search_set = map(
            format_predefined_search,
            predefined_search_set
        )
        crimes_set = CrimeCategory.objects.all()
        status_set = StatusUpdate.objects.all()
        sources_set = Source.objects.all()
        users_set = User.objects.all()
        loc_set = Location.objects.all()

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
                'api_key': api.key,
                'solr_url': str(get_solr_url(request.path))
            }
        )
    else:
        return render_to_response('auth.html', RequestContext(request))

###############################################################################
# AUTH PROXIES
#
##############################################################################

def aws_proxy(request, media_name):
    """
    This function is responsible for proxying the request for an AWS 
    media file and returning the file itself provided the request 
    passes auth testing
    On failure return 404 else redirect to AWS file.
    """
    if request.user.is_authenticated:
        return AWSAuthProxy().get(media_name) 
    else:
        return Http404
def solr_proxy(request, *args, **kwargs):
    """
    This function is responsible for proxying a solr query and
    returning the query results if the provided request passes
    auth testing
    """
    if request.user.is_authenticated:
        query = request.META['QUERY_STRING']
        return SolrAuthProxy().parse_request(query)
    else:
        return Http404

###############################################################################
# MULTISAVE VIEWS
# TODO: rename to something more sensible
###############################################################################


def lookup_bulletin(request, bulletin_id, mode):
    """
    This method is used to implement mass update for bulletins
    It is a work around for lack of incremental update in tastypie
    """
    return multisave_entity(request, multi_save_bulletins)


def lookup_incident(request, incident_id, mode):
    """
    This method is used to implement mass update for bulletins
    It is a work around for lack of incremental update in tastypie
    """
    return multisave_entity(request, multi_save_incidents)


def lookup_actor(request, actor_id, mode):
    """
    This method is used to implement mass update for bulletins
    It is a work around for lack of incremental update in tastypie
    """
    return multisave_entity(request, multi_save_actors)


def multisave_entity(request, multisave_function):
    entity_data = json.loads(request.body)
    username = entity_data['username']
    return multisave_function(request, entity_data, username)
