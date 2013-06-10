from django.conf.urls import patterns, url
from interntest.views import JsTestView

urlpatterns = patterns(
    'interntest.views',
    url(r'^test/$', JsTestView.as_view()),
)
