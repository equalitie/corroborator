"""
Author: Cormac McGuire
Date: 31/12/2013
Utilities for views
"""


def is_user_in_groups(group_list, user):
    '''
    check if a user is in a specified group list
    '''
    user_groups = map((lambda group: group.name), user.groups.all())
    return len(intersect(user_groups, group_list)) > 0


def intersect(list_a, list_b):
    '''
    get the intersection of two lists
    '''
    return list(set(list_a) & set(list_b))
