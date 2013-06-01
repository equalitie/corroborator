from django.conf.urls import patterns, url
from interntest.views import JsTestView

# jobs pages
urlpatterns = patterns(
    'superquest.apps.jobs.views',
    url(r'^test/$', JsTestView.as_view()),
)
