from celery import task
from haystack.management.commands import update_index
from corroborator_app.models import SolrUpdate
from corroborator.settings import common
from django.core.cache import cache
from django.contrib.auth.models import User

from celery.utils.log import get_task_logger
import urllib2 

@task
def update_object(username):
    update_index.Command().handle()
    solrUpdateByUser = SolrUpdate.objects.all()
    user = User.objects.filter(username=username)
    if len(solrUpdateByUser) == 0:
        newUpdate = SolrUpdate(user=user[0])
        newUpdate.save()
    else:
        solrUpdateByUser[0].user=user[0]
        solrUpdateByUser[0].save()
@task
def remove_object(index, instance, using=None):
    index.remove_object(instance, using=using)

@task
def fetch_from_s3(filename, url): 

    logger = get_task_logger(__name__)
    logger.info("Starting s3 sync for %s at %s", filename, url)

    # block caching - anything getting from cache must check for the
    # cache hit having data!

    cache.set(filename, "__-CACHING-__", 1000)
    response = None
    try:
        response = urllib2.urlopen(url)
    except urllib2.HTTPError as e: 
        #404 or worse
        cache.delete(filename)
        logger.error("Failed to get file %s", filename)
        pass

    if response:
        if response.code != 200: 
            # Something went wrong so bail
            cache.delete(filename)
            pass

        filedata = response.read()
        cache.delete(filename)
        logger.info("Set cache for %s", filename)
        cache.set(filename, filedata, common.CACHE_TIME)
        logger.info("data in cache is %d" % (len(cache.get(filename))))
        
