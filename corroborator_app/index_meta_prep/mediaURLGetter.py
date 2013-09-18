from corroborator.settings import common
from django.core.cache import cache
from corroborator_app.tasks import fetch_from_s3
import os

def getMediaUrl(media_file):
    """
    Return either cached URL or direct S3 link and fire
    caching asynchronously
    """
    cacheget = cache.get(media_file.name)
    if cacheget and cacheget != "__-CACHING-__":

        filename = media_file.name.split("/")[-1]
            
        filepath = os.path.join(common.CACHE_PATH, filename)
        if not os.path.exists(filepath):
            
            outfile = open(filepath, "w")
            outfile.write(cacheget)
            outfile.close()

        return common.CACHE_URL + filename
    else:
        s3_url = common.S3_URL + '/' + media_file.name
        fetch_from_s3.delay(media_file.name, s3_url)
        return s3_url
