"""
Author: Cormac McGuire
Date: 31/12/2013
Utilities for views
"""


def can_assign_users(user):
    '''
    return the list of users that is used to assign users to entities,
    should be empty for all but chief data analysts
    '''
    perms = get_all_user_perm_codenames(user)
    required_perm = ['can_assign_users']
    has_perm = len(perms.intersection(set(required_perm))) > 0
    return has_perm


def get_all_user_perm_codenames(user):
    def get_perm_codenames(perm):
        return perm.codename

    user_perms = map(get_perm_codenames, user.user_permissions.all())
    group_perms = []
    for group in user.groups.all():
        group_perms += map(get_perm_codenames, group.permissions.all())

    return set(user_perms + group_perms)


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
