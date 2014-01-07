"""
Author: Cormac McGuire
Date: 31/12/2013
View to display the reporting functionality, graphs, etc
Contains views that send the relevant json data back for the graphs
reporting_view displays the reports page
"""
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import Http404

from corroborator_app.views.view_utils import is_user_in_groups

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
        request, 'reporting.html', {}
    )
