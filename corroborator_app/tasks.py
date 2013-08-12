from celery import task
from haystack.management.commands import update_index

@task
def update_object():
    update_index.Command().handle()

@task
def remove_object(index, instance, using=None):
    index.remove_object(instance, using=using)
