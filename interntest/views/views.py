from django.views.generic.base import View
from django.shortcuts import render

class JsTestView(View):
    template_name = 'client.html'
    url = '/interntest/intern/'
    def get(self, request):
        context = {}
        return render(request, self.template_name, context)
