from django.http import HttpResponse, HttpResponseGone, \
    Http404
import requests

class SolrAuthProxy():

    def __init__(self):
        self.solr_url = ''

    def parse_request(self, query):
        """
        Reroute solr request to local server
        """
        solr_response = self.get_solr_response(query)
        return HttpResponse(solr_response.text)
    
    def get_solr_response(self, query):
        """
        Return solr response to requester
        """
        request_url = 'https://sjac.corroborator.org/solr/collection1/select'
        request_url += '?' + query
        return requests.get(request_url)
