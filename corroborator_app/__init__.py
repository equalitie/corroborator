"""
Author: Cormac
Date:
Create the assign user permissions - is this the right place??
"""
from django.contrib.auth.models import User, Permission
import django.contrib.auth.models as auth_models
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_syncdb


# Create the can_assign_user permission
def add_assign_permission(*args, **kwargs):
    content_type = ContentType.objects.get_for_model(User)
    permissions = ['can_assign_users', 'can_delete_entities', ]
    labels = ['Can assign users', 'Can delete entities', ]
    for permission, label in zip(permissions, labels):
        create_permission(permission, label, content_type)


def create_permission(codename, label, content_type):
    Permission.objects.get_or_create(
        codename=codename,
        name=label,
        content_type=content_type
    )

post_syncdb.connect(add_assign_permission, sender=auth_models)
