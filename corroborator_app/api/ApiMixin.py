from corroborator_app.models import (Comment, VersionStatus, )

import reversion


class APIMixin():
    '''
    common functions for Actor, Bulletin and Incident APIs
    '''
    def is_finalized(self, ModelType, pk, status_method):
        func = getattr(ModelType.objects.get(pk=pk), status_method)
        return func() == 'Finalized'

    def create_comment(self, comment, status_id, user):
        '''
        create a status comment to be attached to the user upon save
        '''
        comment = Comment(
            assigned_user_id=user.id,
            comments_en=comment,
            status_id=status_id
        )
        comment.save()
        comment_uri = '/api/v1/comment/{0}/'.format(comment.id)

        return comment_uri

    def id_from_url(self, uri_string):
        return int(uri_string.split('/')[4])

    def create_revision(self, bundle, user, status_update):
        with reversion.create_revision():
            reversion.set_user(user)
            reversion.set_comment(bundle.data['comment'])
            reversion.add_meta(
                VersionStatus,
                status=status_update.status_en
            )
