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
    url(r'^logout/$', 'django.contrib.auth.views.logout',{'next_page': '/login'}),
    url(r'^login/$', 'corroborator_app.views.login_user'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^home/$', 'corroborator_app.views.home'),
    url(r'^corroborator/$', 'corroborator_app.views.index'),
    url(r'^corroborator/predefined/search/(?P<search_id>\d+)/(?P<mode>\w+)/$', 'corroborator_app.views.add_predefined_search'),
    url(r'^corroborator/bulletin/(?P<bulletin_id>\d+)/(?P<mode>\w+)/$', 'corroborator_app.views.lookup_bulletin'),
    url(r'^corroborator/incident/(?P<incident_id>\d+)/(?P<mode>\w+)/$', 'corroborator_app.views.lookup_incident'),
    url(r'^corroborator/actor/(?P<actor_id>\d+)/(?P<mode>\w+)/$', 'corroborator_app.views.lookup_actor'),
)

# API Resources
from tastypie.api import Api
from corroborator_app.api import ActorResource

v1_api = Api(api_name='v1')
v1_api.register(ActorResource())

urlpatterns += patterns('',
    (r'^api/', include(v1_api.urls)),
)
