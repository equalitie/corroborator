from celery import task
from haystack.management.commands import update_index
from django_socketio import broadcast_channel

@task
def update_object():
    update_index.Command().handle()
    updated = {"action": "updated"}
    channel = 'corroborator_solr_update'
    broadcast_channel(updated, channel)

@task
def remove_object(index, instance, using=None):
    index.remove_object(instance, using=using)
