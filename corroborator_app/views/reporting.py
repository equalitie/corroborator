"""
Author: Cormac McGuire
Date: 31/12/2013
View to display the reporting functionality, graphs, etc
Contains views that send the relevant json data back for the graphs
reporting_view displays the reports page
"""
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import Http404, HttpResponse

from corroborator_app.views.view_utils import is_user_in_groups
from corroborator_app.views.context import build_js_context

from corroborator_app.reporting.user_reporting import UserReportingApi

# groups a user must be in to view the reports page
REPORT_GROUPS = ['senior-data-analyst', 'chief-data-analyst', ]


@login_required
def reporting_view(request, *arg, **kwargs):
    '''
    display the reports page
    show a 404 if the user is not authorised to see the view
    '''
    if is_user_in_groups(REPORT_GROUPS, request.user) is False:
        raise Http404

    return render(
        request, 'reporting.html', build_js_context(request.user)
    )

@login_required
def graph_view(graph_code, user_id=None):
    '''
    Return the appropriate json object for the requested
    user graph code
    '''
    ura = UserReportintApi()
    json_result = ''
    if 'user_login_time' == graph_code:
        json_result = ura.total_user_login_time()
    elif 'user_login_per_day' == graph_code:
        json_result = ura.total_user_login_per_day(user_id)
    elif 'user_average_updates' == graph_code:
        json_result = ura.user_average_updates_per_hour()
    elif 'user_assigned_items_by_status' == graph_code:
        json_result = ura.user_assigned_items_by_status(user_id)
    elif 'user_deleted_items' == graph_code:
        json_result = ura.total_user_items_by_crud('deleted')
    elif 'user_created_items' == graph_code:
        json_result = ura.total_user_items_by_crud('created')
    elif 'user_edited_items' == graph_code:
        json_result = ura.total_user_items_by_crud('edited')
    elif 'user_deleted_edited_created' == graph_code:
        json_result = ura.crud_per_day()

    return HttpResponse(json_result, mimetype='application/json')
