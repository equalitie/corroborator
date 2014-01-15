"""
Author: Cormac McGuire
Date: 15/01/2014
Helper functions to generate UserLog Data for tests
"""

from datetime import datetime
from corroborator_app.models import UserLog


def generate_start_end_times(user):
    '''
    helper function to generate data for user login times
    '''
    start_time = datetime.strptime(
        'Jun 1 2013  1:33PM', '%b %d %Y %I:%M%p')
    end_time = datetime.strptime(
        'Jun 1 2013  4:33PM', '%b %d %Y %I:%M%p')
    total = (end_time - start_time).total_seconds()

    create_log_entry_for_user(user, start_time, end_time)
    start_time = datetime.strptime(
        'Jun 2 2013  1:33PM', '%b %d %Y %I:%M%p')
    end_time = datetime.strptime(
        'Jun 2 2013  4:33PM', '%b %d %Y %I:%M%p')
    create_log_entry_for_user(user, start_time, end_time)
    total += (end_time - start_time).total_seconds()
    return total


def create_log_entry_for_user(user, start_time, end_time):
    '''
    this could be moved to a manger for UserLog
    '''
    UserLog.objects.create(
        user=user,
        login=start_time,
        logout=end_time,
        total_seconds=(end_time - start_time).total_seconds()
    )
