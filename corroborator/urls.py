from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'corroborator.views.home', name='home'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url("", include("django_socketio.urls")),
    url(r'^logout/$', 'django.contrib.auth.views.logout',{'next_page': '/login'}),
    url(r'^login/$', 'corroborator_app.views.login_user'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'corroborator_app.views.index'),
    #url(r'^/$', 'corroborator_app.views.index'),
    url(r'^corroborator/$', 'corroborator_app.views.index'),
    url(r'^new_corroborator/$', 'corroborator_app.views.index'),
    url(r'^corroborator/bulletin/(?P<bulletin_id>\d+)/(?P<mode>\w+)/$', 'corroborator_app.views.lookup_bulletin'),
    url(r'^corroborator/incident/(?P<incident_id>\d+)/(?P<mode>\w+)/$', 'corroborator_app.views.lookup_incident'),
    url(r'^corroborator/actor/(?P<actor_id>\d+)/(?P<mode>\w+)/$', 'corroborator_app.views.lookup_actor'),
)

#Django Locking
urlpatterns += patterns('',
    (r'^admin/ajax/', include('locking.urls')),
)
# API Resources
from tastypie.api import Api
from corroborator_app.api import ActorResource, ActorRoleResource, \
ActorRelationshipResource, CommentResource, CrimeCategoryResource, \
IncidentResource, BulletinResource, LabelResource, MediaResource, \
PredefinedSearchResource, SourceResource, SourceTypeResource, \
LocationResource, StatusUpdateResource, TimeInfoResource, UserResource, \
SolrUpdateResource

v1_api = Api(api_name='v1')
v1_api.register(ActorResource())
v1_api.register(ActorRoleResource())
v1_api.register(ActorRelationshipResource())
v1_api.register(CommentResource())
v1_api.register(CrimeCategoryResource())
v1_api.register(IncidentResource())
v1_api.register(BulletinResource())
v1_api.register(LabelResource())
v1_api.register(MediaResource())
v1_api.register(PredefinedSearchResource())
v1_api.register(SourceResource())
v1_api.register(SourceTypeResource())
v1_api.register(LocationResource())
v1_api.register(StatusUpdateResource())
v1_api.register(TimeInfoResource())
v1_api.register(UserResource())
v1_api.register(SolrUpdateResource())

urlpatterns += patterns('',
    (r'^api/', include(v1_api.urls)),
)
