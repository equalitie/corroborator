# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'VersionStatus'
        #db.create_table(u'corroborator_app_versionstatus', (
            #(u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            #('revision', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['reversion.Revision'], unique=True)),
            #('status', self.gf('django.db.models.fields.CharField')(max_length=255)),
        #))
        #db.send_create_signal(u'corroborator_app', ['VersionStatus'])


        # Changing field 'Actor.fullname_ar'
        db.alter_column(u'corroborator_app_actor', 'fullname_ar', self.gf('django.db.models.fields.CharField')(default='', max_length=255))

        # Changing field 'Actor.fullname_en'
        db.alter_column(u'corroborator_app_actor', 'fullname_en', self.gf('django.db.models.fields.CharField')(default='title', max_length=255))

        # Changing field 'Incident.title_ar'
        db.alter_column(u'corroborator_app_incident', 'title_ar', self.gf('django.db.models.fields.TextField')(default=''))

        # Changing field 'Incident.title_en'
        db.alter_column(u'corroborator_app_incident', 'title_en', self.gf('django.db.models.fields.TextField')(default=''))

        # Changing field 'Bulletin.title_en'
        db.alter_column(u'corroborator_app_bulletin', 'title_en', self.gf('django.db.models.fields.CharField')(default='', max_length=255))

        # Changing field 'Comment.status'
        db.alter_column(u'corroborator_app_comment', 'status_id', self.gf('django.db.models.fields.related.ForeignKey')(default='', to=orm['corroborator_app.StatusUpdate']))

        # Changing field 'Comment.comments_en'
        db.alter_column(u'corroborator_app_comment', 'comments_en', self.gf('django.db.models.fields.TextField')(default=''))

        # Changing field 'Comment.assigned_user'
        db.alter_column(u'corroborator_app_comment', 'assigned_user_id', self.gf('django.db.models.fields.related.ForeignKey')(default='', to=orm['auth.User']))

    def backwards(self, orm):
        # Deleting model 'VersionStatus'
        #db.delete_table(u'corroborator_app_versionstatus')


        # Changing field 'Actor.fullname_ar'
        db.alter_column(u'corroborator_app_actor', 'fullname_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True))

        # Changing field 'Actor.fullname_en'
        db.alter_column(u'corroborator_app_actor', 'fullname_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True))

        # Changing field 'Incident.title_ar'
        db.alter_column(u'corroborator_app_incident', 'title_ar', self.gf('django.db.models.fields.TextField')(null=True))

        # Changing field 'Incident.title_en'
        db.alter_column(u'corroborator_app_incident', 'title_en', self.gf('django.db.models.fields.TextField')(null=True))

        # Changing field 'Bulletin.title_en'
        db.alter_column(u'corroborator_app_bulletin', 'title_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True))

        # Changing field 'Comment.status'
        db.alter_column(u'corroborator_app_comment', 'status_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.StatusUpdate'], null=True))

        # Changing field 'Comment.comments_en'
        db.alter_column(u'corroborator_app_comment', 'comments_en', self.gf('django.db.models.fields.TextField')(null=True))

        # Changing field 'Comment.assigned_user'
        db.alter_column(u'corroborator_app_comment', 'assigned_user_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True))

    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'corroborator_app.actor': {
            'DOB': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'Actor'},
            'POB': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'POB'", 'null': 'True', 'to': u"orm['corroborator_app.Location']"}),
            'actor_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'actors_role': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'actors_role'", 'null': 'True', 'symmetrical': 'False', 'to': u"orm['corroborator_app.ActorRole']"}),
            'age_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'age_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'civilian_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'civilian_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'current_location': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_current'", 'null': 'True', 'to': u"orm['corroborator_app.Location']"}),
            'deleted': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'ethnicity_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ethnicity_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'fullname_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'fullname_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'media': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.Media']", 'null': 'True', 'blank': 'True'}),
            'nationality_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'nationality_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'nickname_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'nickname_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'occupation_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'occupation_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'position_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'position_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'religion_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'religion_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'sex_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'sex_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'spoken_dialect_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'spoken_dialect_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.actorrelationship': {
            'Meta': {'object_name': 'ActorRelationship'},
            'actor': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_b'", 'null': 'True', 'to': u"orm['corroborator_app.Actor']"}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'relation_status': ('django.db.models.fields.CharField', [], {'max_length': '25'})
        },
        u'corroborator_app.actorrole': {
            'Meta': {'object_name': 'ActorRole'},
            'actor': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.Actor']", 'null': 'True', 'blank': 'True'}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'relation_status': ('django.db.models.fields.CharField', [], {'max_length': '25', 'null': 'True', 'blank': 'True'}),
            'role_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'role_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'role_status': ('django.db.models.fields.CharField', [], {'max_length': '25', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.bulletin': {
            'Meta': {'object_name': 'Bulletin'},
            'actors_role': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.ActorRole']", 'null': 'True', 'blank': 'True'}),
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'bulletin_comments': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Comment']", 'null': 'True', 'blank': 'True'}),
            'bulletin_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {}),
            'deleted': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'description_ar': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'labels': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Label']", 'null': 'True', 'blank': 'True'}),
            'locations': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Location']", 'null': 'True', 'blank': 'True'}),
            'medias': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Media']", 'null': 'True', 'blank': 'True'}),
            'ref_bulletins': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'ref_bulletins_rel_+'", 'null': 'True', 'to': u"orm['corroborator_app.Bulletin']"}),
            'sources': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Source']", 'null': 'True', 'blank': 'True'}),
            'times': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.TimeInfo']", 'null': 'True', 'blank': 'True'}),
            'title_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'title_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '25', 'blank': 'True'}),
            'uri': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.comment': {
            'Meta': {'ordering': "['comment_created']", 'object_name': 'Comment'},
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            'comment_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'status': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.StatusUpdate']"})
        },
        u'corroborator_app.crimecategory': {
            'Meta': {'object_name': 'CrimeCategory'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'parent': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ref_crime': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.CrimeCategory']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.dialect': {
            'Meta': {'object_name': 'Dialect'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.ethnicity': {
            'Meta': {'object_name': 'Ethnicity'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.incident': {
            'Meta': {'object_name': 'Incident'},
            'actors_role': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.ActorRole']", 'null': 'True', 'blank': 'True'}),
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3'}),
            'crimes': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.CrimeCategory']", 'null': 'True', 'blank': 'True'}),
            'deleted': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'incident_comments': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Comment']", 'null': 'True', 'blank': 'True'}),
            'incident_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'incident_details_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'incident_details_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'labels': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Label']", 'null': 'True', 'blank': 'True'}),
            'locations': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Location']", 'null': 'True', 'blank': 'True'}),
            'ref_bulletins': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Bulletin']", 'null': 'True', 'blank': 'True'}),
            'ref_incidents': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'ref_incidents_rel_+'", 'null': 'True', 'to': u"orm['corroborator_app.Incident']"}),
            'times': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.TimeInfo']", 'null': 'True', 'blank': 'True'}),
            'title_ar': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'title_en': ('django.db.models.fields.TextField', [], {})
        },
        u'corroborator_app.label': {
            'Meta': {'object_name': 'Label'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'ref_label': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.Label']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.location': {
            'Meta': {'object_name': 'Location'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latitude': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'loc_type': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'longitude': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'parent_location': ('django.db.models.fields.related.ForeignKey', [], {'max_length': '255', 'to': u"orm['corroborator_app.Location']", 'null': 'True', 'blank': 'True'}),
            'parent_text': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.media': {
            'Meta': {'object_name': 'Media'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'media_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'media_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'media_file_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'media_thumb_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'null': 'True'}),
            'media_type': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.nationality': {
            'Meta': {'object_name': 'Nationality'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.occupation': {
            'Meta': {'object_name': 'Occupation'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.position': {
            'Meta': {'object_name': 'Position'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.predefinedsearch': {
            'Meta': {'object_name': 'PredefinedSearch'},
            'actor_filters': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'bulletin_filters': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'incident_filters': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'make_global': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'search_string': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'search_title': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.religion': {
            'Meta': {'object_name': 'Religion'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.solrupdate': {
            'Meta': {'object_name': 'SolrUpdate'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'update_timestamp': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'corroborator_app.source': {
            'Meta': {'object_name': 'Source'},
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ref_source': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.Source']", 'null': 'True', 'blank': 'True'}),
            'reliability_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3', 'blank': 'True'}),
            'source_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.SourceType']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.sourcetype': {
            'Meta': {'object_name': 'SourceType'},
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'source_type': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        u'corroborator_app.statusupdate': {
            'Meta': {'object_name': 'StatusUpdate'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'status_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'status_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.timeinfo': {
            'Meta': {'object_name': 'TimeInfo'},
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3'}),
            'event_name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'event_name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'time_from': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'time_to': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'})
        },
        #u'corroborator_app.versionstatus': {
            #'Meta': {'object_name': 'VersionStatus'},
            #u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            #'revision': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['reversion.Revision']", 'unique': 'True'}),
            #'status': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        #},
        u'reversion.revision': {
            'Meta': {'object_name': 'Revision'},
            'comment': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'manager_slug': ('django.db.models.fields.CharField', [], {'default': "u'default'", 'max_length': '200', 'db_index': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['corroborator_app']
