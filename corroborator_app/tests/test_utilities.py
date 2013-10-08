from django.contrib.auth.models import User
from tastypie.models import ApiKey

class TestUserUtility(object):
    '''
    create a user to be used in unit tests
    '''
    def __init__(self):
        self.user = User(
            username='user',
            password='password',
            email='test@test.com'
        )
        self.user.save()
        self.api_key = self.create_api_key()
        self.auth_string = ''

    def create_api_key(self):
        '''
        create an api key for the user
        '''
        try:
            api_key = ApiKey.objects.get(user=self.user)
        except ApiKey.DoesNotExist:
            api_key = ApiKey.objects.create(user=self.user)
        return api_key

    def get_auth_string(self):
        '''
        generate the auth string for tastypie requests
        '''
        if self.auth_string is '':
            self.auth_string = '&username={0}&api_key={1}'.format(
                self.user.username,
                self.api_key.key
            )
        return self.auth_string
