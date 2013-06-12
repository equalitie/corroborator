# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'role'
        db.delete_table(u'corroborator_app_role')

        # Deleting model 'source_type'
        db.delete_table(u'corroborator_app_source_type')

        # Deleting model 'status_update'
        db.delete_table(u'corroborator_app_status_update')

        # Deleting model 'crime_category'
        db.delete_table(u'corroborator_app_crime_category')

        # Deleting model 'actor_relationship'
        db.delete_table(u'corroborator_app_actor_relationship')

        # Deleting model 'time_info'
        db.delete_table(u'corroborator_app_time_info')

        # Deleting model 'predefined_search'
        db.delete_table(u'corroborator_app_predefined_search')

        # Deleting model 'labeling'
        db.delete_table(u'corroborator_app_labeling')

        # Adding model 'TimeInfo'
        db.create_table(u'corroborator_app_timeinfo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('time_from', self.gf('django.db.models.fields.DateTimeField')()),
            ('time_to', self.gf('django.db.models.fields.DateTimeField')()),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('event_name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('event_name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('confidence_score', self.gf('django.db.models.fields.IntegerField')(max_length=3)),
        ))
        db.send_create_signal(u'corroborator_app', ['TimeInfo'])

        # Adding model 'ActorRelationship'
        db.create_table(u'corroborator_app_actorrelationship', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('relation_status', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('actor_a', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='actor_a', null=True, to=orm['corroborator_app.Actor'])),
            ('actor_b', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='actor_b', null=True, to=orm['corroborator_app.Actor'])),
        ))
        db.send_create_signal(u'corroborator_app', ['ActorRelationship'])

        # Adding model 'PredefinedSearch'
        db.create_table(u'corroborator_app_predefinedsearch', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('search_request', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('search_type', self.gf('django.db.models.fields.CharField')(max_length=255)),
        ))
        db.send_create_signal(u'corroborator_app', ['PredefinedSearch'])

        # Adding model 'CrimeCategory'
        db.create_table(u'corroborator_app_crimecategory', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('category_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('category_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('level', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('ref_crime', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.CrimeCategory'], null=True, blank=True)),
            ('parent', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['CrimeCategory'])

        # Adding model 'SourceType'
        db.create_table(u'corroborator_app_sourcetype', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('source_type', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['SourceType'])

        # Adding model 'StatusUpdate'
        db.create_table(u'corroborator_app_statusupdate', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('status_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('status_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['StatusUpdate'])

        # Adding model 'Label'
        db.create_table(u'corroborator_app_label', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('ref_label', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.Label'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['Label'])

        # Adding model 'ActorRole'
        db.create_table(u'corroborator_app_actorrole', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('role_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('role_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('role_status', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('actor', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.Actor'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['ActorRole'])


        # Changing field 'Source.source_type'
        db.alter_column(u'corroborator_app_source', 'source_type_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.SourceType'], null=True))

        # Changing field 'Source.ref_source'
        db.alter_column(u'corroborator_app_source', 'ref_source_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.Source'], null=True))

        # Changing field 'Location.parent_location'
        db.alter_column(u'corroborator_app_location', 'parent_location_id', self.gf('django.db.models.fields.related.ForeignKey')(max_length=255, to=orm['corroborator_app.Location'], null=True))

        # Changing field 'Comment.status'
        db.alter_column(u'corroborator_app_comment', 'status_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.StatusUpdate'], null=True))

        # Changing field 'Actor.current_location'
        db.alter_column(u'corroborator_app_actor', 'current_location_id', self.gf('django.db.models.fields.related.ForeignKey')(null=True, to=orm['corroborator_app.Location']))

        # Changing field 'Actor.media'
        db.alter_column(u'corroborator_app_actor', 'media_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.Media'], null=True))

        # Changing field 'Actor.POB'
        db.alter_column(u'corroborator_app_actor', 'POB_id', self.gf('django.db.models.fields.related.ForeignKey')(null=True, to=orm['corroborator_app.Location']))

    def backwards(self, orm):
        # Adding model 'role'
        db.create_table(u'corroborator_app_role', (
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('role_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('role_status', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('role_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('actor', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.actor'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['role'])

        # Adding model 'source_type'
        db.create_table(u'corroborator_app_source_type', (
            ('source_type', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['source_type'])

        # Adding model 'status_update'
        db.create_table(u'corroborator_app_status_update', (
            ('status_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('status_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['status_update'])

        # Adding model 'crime_category'
        db.create_table(u'corroborator_app_crime_category', (
            ('parent', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('category_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('level', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ref_crime', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.crime_category'], null=True, blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('category_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['crime_category'])

        # Adding model 'actor_relationship'
        db.create_table(u'corroborator_app_actor_relationship', (
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('actor_a', self.gf('django.db.models.fields.related.ForeignKey')(related_name='actor_a', null=True, to=orm['corroborator_app.actor'], blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('relation_status', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('actor_b', self.gf('django.db.models.fields.related.ForeignKey')(related_name='actor_b', null=True, to=orm['corroborator_app.actor'], blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['actor_relationship'])

        # Adding model 'time_info'
        db.create_table(u'corroborator_app_time_info', (
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('event_name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('time_to', self.gf('django.db.models.fields.DateTimeField')()),
            ('confidence_score', self.gf('django.db.models.fields.IntegerField')(max_length=3)),
            ('event_name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('time_from', self.gf('django.db.models.fields.DateTimeField')()),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['time_info'])

        # Adding model 'predefined_search'
        db.create_table(u'corroborator_app_predefined_search', (
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('search_type', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('search_request', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['predefined_search'])

        # Adding model 'labeling'
        db.create_table(u'corroborator_app_labeling', (
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('ref_label', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.labeling'], null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['labeling'])

        # Deleting model 'TimeInfo'
        db.delete_table(u'corroborator_app_timeinfo')

        # Deleting model 'ActorRelationship'
        db.delete_table(u'corroborator_app_actorrelationship')

        # Deleting model 'PredefinedSearch'
        db.delete_table(u'corroborator_app_predefinedsearch')

        # Deleting model 'CrimeCategory'
        db.delete_table(u'corroborator_app_crimecategory')

        # Deleting model 'SourceType'
        db.delete_table(u'corroborator_app_sourcetype')

        # Deleting model 'StatusUpdate'
        db.delete_table(u'corroborator_app_statusupdate')

        # Deleting model 'Label'
        db.delete_table(u'corroborator_app_label')

        # Deleting model 'ActorRole'
        db.delete_table(u'corroborator_app_actorrole')


        # Changing field 'Source.source_type'
        db.alter_column(u'corroborator_app_source', 'source_type_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.source_type'], null=True))

        # Changing field 'Source.ref_source'
        db.alter_column(u'corroborator_app_source', 'ref_source_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.source'], null=True))

        # Changing field 'Location.parent_location'
        db.alter_column(u'corroborator_app_location', 'parent_location_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.location'], max_length=255, null=True))

        # Changing field 'Comment.status'
        db.alter_column(u'corroborator_app_comment', 'status_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.status_update'], null=True))

        # Changing field 'Actor.current_location'
        db.alter_column(u'corroborator_app_actor', 'current_location_id', self.gf('django.db.models.fields.related.ForeignKey')(null=True, to=orm['corroborator_app.location']))

        # Changing field 'Actor.media'
        db.alter_column(u'corroborator_app_actor', 'media_id', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.media'], null=True))

        # Changing field 'Actor.POB'
        db.alter_column(u'corroborator_app_actor', 'POB_id', self.gf('django.db.models.fields.related.ForeignKey')(null=True, to=orm['corroborator_app.location']))

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
            'age_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'age_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'civilian_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'civilian_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'current_location': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_current'", 'null': 'True', 'to': u"orm['corroborator_app.Location']"}),
            'ethnicity_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ethnicity_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'fullname_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'fullname_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
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
            'sex_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'sex_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'spoken_dialect_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'spoken_dialect_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.actorrelationship': {
            'Meta': {'object_name': 'ActorRelationship'},
            'actor_a': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_a'", 'null': 'True', 'to': u"orm['corroborator_app.Actor']"}),
            'actor_b': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_b'", 'null': 'True', 'to': u"orm['corroborator_app.Actor']"}),
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
            'role_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'role_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'role_status': ('django.db.models.fields.CharField', [], {'max_length': '25'})
        },
        u'corroborator_app.bulletin': {
            'Meta': {'object_name': 'Bulletin'},
            'actors_role': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.ActorRole']", 'null': 'True', 'blank': 'True'}),
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'bulletin_comments': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Comment']", 'null': 'True', 'blank': 'True'}),
            'bulletin_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {}),
            'description_ar': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'labels': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Label']", 'null': 'True', 'blank': 'True'}),
            'locations': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Location']", 'null': 'True', 'blank': 'True'}),
            'medias': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Media']", 'null': 'True', 'blank': 'True'}),
            'ref_bulletins': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'ref_bulletins_rel_+'", 'null': 'True', 'to': u"orm['corroborator_app.Bulletin']"}),
            'sources': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Source']", 'null': 'True', 'blank': 'True'}),
            'times': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.TimeInfo']", 'null': 'True', 'blank': 'True'}),
            'title_ar': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'blank': 'True'}),
            'title_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'uri': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.comment': {
            'Meta': {'ordering': "['comment_created']", 'object_name': 'Comment'},
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'comment_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'status': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.StatusUpdate']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.crimecategory': {
            'Meta': {'object_name': 'CrimeCategory'},
            'category_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'category_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
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
            'bulletins': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Bulletin']", 'null': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3'}),
            'crimes': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.CrimeCategory']", 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'incident_comments': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Comment']", 'null': 'True', 'blank': 'True'}),
            'incident_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'incident_details_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'incident_details_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'labels': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Label']", 'null': 'True', 'blank': 'True'}),
            'locations': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.Location']", 'null': 'True', 'blank': 'True'}),
            'ref_incidents': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'ref_incidents_rel_+'", 'null': 'True', 'to': u"orm['corroborator_app.Incident']"}),
            'times': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.TimeInfo']", 'null': 'True', 'blank': 'True'}),
            'title_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'title_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'})
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
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'search_request': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'search_type': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
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
        u'corroborator_app.source': {
            'Meta': {'object_name': 'Source'},
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ref_source': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.Source']", 'null': 'True', 'blank': 'True'}),
            'reliability_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3'}),
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
            'time_from': ('django.db.models.fields.DateTimeField', [], {}),
            'time_to': ('django.db.models.fields.DateTimeField', [], {})
        }
    }

    complete_apps = ['corroborator_app']