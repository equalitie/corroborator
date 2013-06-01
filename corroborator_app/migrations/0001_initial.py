# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'predefined_search'
        db.create_table(u'corroborator_app_predefined_search', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('search_request', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('search_type', self.gf('django.db.models.fields.CharField')(max_length=255)),
        ))
        db.send_create_signal(u'corroborator_app', ['predefined_search'])

        # Adding model 'status_update'
        db.create_table(u'corroborator_app_status_update', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('status_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('status_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['status_update'])

        # Adding model 'comment'
        db.create_table(u'corroborator_app_comment', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('assigned_user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('status', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.status_update'], null=True, blank=True)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comment_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['comment'])

        # Adding model 'time_info'
        db.create_table(u'corroborator_app_time_info', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('time_from', self.gf('django.db.models.fields.DateTimeField')()),
            ('time_to', self.gf('django.db.models.fields.DateTimeField')()),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('event_name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('event_name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('confidence_score', self.gf('django.db.models.fields.IntegerField')(max_length=3)),
        ))
        db.send_create_signal(u'corroborator_app', ['time_info'])

        # Adding model 'location'
        db.create_table(u'corroborator_app_location', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('latitude', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('longitude', self.gf('django.db.models.fields.FloatField')(null=True, blank=True)),
            ('loc_type', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('parent_text', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('parent_location', self.gf('django.db.models.fields.related.ForeignKey')(max_length=255, to=orm['corroborator_app.location'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['location'])

        # Adding model 'labeling'
        db.create_table(u'corroborator_app_labeling', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('ref_label', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.labeling'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['labeling'])

        # Adding model 'crime_category'
        db.create_table(u'corroborator_app_crime_category', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('category_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('category_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('level', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('ref_crime', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.crime_category'], null=True, blank=True)),
            ('parent', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['crime_category'])

        # Adding model 'source_type'
        db.create_table(u'corroborator_app_source_type', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('source_type', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['source_type'])

        # Adding model 'source'
        db.create_table(u'corroborator_app_source', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('reliability_score', self.gf('django.db.models.fields.IntegerField')(max_length=3)),
            ('source_type', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.source_type'], null=True, blank=True)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('ref_source', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.source'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['source'])

        # Adding model 'dialect'
        db.create_table(u'corroborator_app_dialect', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['dialect'])

        # Adding model 'position'
        db.create_table(u'corroborator_app_position', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['position'])

        # Adding model 'occupation'
        db.create_table(u'corroborator_app_occupation', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['occupation'])

        # Adding model 'ethnicity'
        db.create_table(u'corroborator_app_ethnicity', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['ethnicity'])

        # Adding model 'religion'
        db.create_table(u'corroborator_app_religion', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['religion'])

        # Adding model 'nationality'
        db.create_table(u'corroborator_app_nationality', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['nationality'])

        # Adding model 'media'
        db.create_table(u'corroborator_app_media', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('name_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('media_file', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
            ('media_type', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('media_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['media'])

        # Adding model 'actor'
        db.create_table(u'corroborator_app_actor', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('fullname_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('fullname_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('nickname_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('nickname_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('age_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('age_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('sex_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('sex_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('civilian_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('civilian_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('DOB', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('POB', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='POB', null=True, to=orm['corroborator_app.location'])),
            ('occupation_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('occupation_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('nationality_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('nationality_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('position_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('position_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('ethnicity_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('ethnicity_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('religion_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('religion_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('spoken_dialect_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('spoken_dialect_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('current_location', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='actor_current', null=True, to=orm['corroborator_app.location'])),
            ('media', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.media'], null=True, blank=True)),
            ('actor_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['actor'])

        # Adding model 'actor_relationship'
        db.create_table(u'corroborator_app_actor_relationship', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('relation_status', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('actor_a', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='actor_a', null=True, to=orm['corroborator_app.actor'])),
            ('actor_b', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='actor_b', null=True, to=orm['corroborator_app.actor'])),
        ))
        db.send_create_signal(u'corroborator_app', ['actor_relationship'])

        # Adding model 'role'
        db.create_table(u'corroborator_app_role', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('role_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('role_ar', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('role_status', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('comments_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('comments_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('actor', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['corroborator_app.actor'], null=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['role'])

        # Adding model 'bulletin'
        db.create_table(u'corroborator_app_bulletin', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('assigned_user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('title_en', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('title_ar', self.gf('django.db.models.fields.CharField')(default='', max_length=255, blank=True)),
            ('description_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('description_ar', self.gf('django.db.models.fields.TextField')(default='', blank=True)),
            ('uri', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True)),
            ('confidence_score', self.gf('django.db.models.fields.IntegerField')()),
            ('type', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('bulletin_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['bulletin'])

        # Adding M2M table for field bulletin_comments on 'bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_bulletin_comments')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('comment', models.ForeignKey(orm[u'corroborator_app.comment'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'comment_id'])

        # Adding M2M table for field actors_role on 'bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_actors_role')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('role', models.ForeignKey(orm[u'corroborator_app.role'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'role_id'])

        # Adding M2M table for field times on 'bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_times')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('time_info', models.ForeignKey(orm[u'corroborator_app.time_info'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'time_info_id'])

        # Adding M2M table for field medias on 'bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_medias')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('media', models.ForeignKey(orm[u'corroborator_app.media'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'media_id'])

        # Adding M2M table for field locations on 'bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_locations')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('location', models.ForeignKey(orm[u'corroborator_app.location'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'location_id'])

        # Adding M2M table for field labels on 'bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_labels')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('labeling', models.ForeignKey(orm[u'corroborator_app.labeling'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'labeling_id'])

        # Adding M2M table for field sources on 'bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_sources')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('source', models.ForeignKey(orm[u'corroborator_app.source'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bulletin_id', 'source_id'])

        # Adding M2M table for field ref_bulletins on 'bulletin'
        m2m_table_name = db.shorten_name(u'corroborator_app_bulletin_ref_bulletins')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('from_bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False)),
            ('to_bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False))
        ))
        db.create_unique(m2m_table_name, ['from_bulletin_id', 'to_bulletin_id'])

        # Adding model 'incident'
        db.create_table(u'corroborator_app_incident', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('incident_details_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('incident_details_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('confidence_score', self.gf('django.db.models.fields.IntegerField')(max_length=3)),
            ('title_en', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('title_ar', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('assigned_user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('incident_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'corroborator_app', ['incident'])

        # Adding M2M table for field incident_comments on 'incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_incident_comments')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('comment', models.ForeignKey(orm[u'corroborator_app.comment'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'comment_id'])

        # Adding M2M table for field ref_incidents on 'incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_ref_incidents')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('from_incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('to_incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False))
        ))
        db.create_unique(m2m_table_name, ['from_incident_id', 'to_incident_id'])

        # Adding M2M table for field bulletins on 'incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_bulletins')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('bulletin', models.ForeignKey(orm[u'corroborator_app.bulletin'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'bulletin_id'])

        # Adding M2M table for field actors_role on 'incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_actors_role')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('role', models.ForeignKey(orm[u'corroborator_app.role'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'role_id'])

        # Adding M2M table for field crimes on 'incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_crimes')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('crime_category', models.ForeignKey(orm[u'corroborator_app.crime_category'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'crime_category_id'])

        # Adding M2M table for field labels on 'incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_labels')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('labeling', models.ForeignKey(orm[u'corroborator_app.labeling'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'labeling_id'])

        # Adding M2M table for field times on 'incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_times')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('time_info', models.ForeignKey(orm[u'corroborator_app.time_info'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'time_info_id'])

        # Adding M2M table for field locations on 'incident'
        m2m_table_name = db.shorten_name(u'corroborator_app_incident_locations')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('incident', models.ForeignKey(orm[u'corroborator_app.incident'], null=False)),
            ('location', models.ForeignKey(orm[u'corroborator_app.location'], null=False))
        ))
        db.create_unique(m2m_table_name, ['incident_id', 'location_id'])


    def backwards(self, orm):
        # Deleting model 'predefined_search'
        db.delete_table(u'corroborator_app_predefined_search')

        # Deleting model 'status_update'
        db.delete_table(u'corroborator_app_status_update')

        # Deleting model 'comment'
        db.delete_table(u'corroborator_app_comment')

        # Deleting model 'time_info'
        db.delete_table(u'corroborator_app_time_info')

        # Deleting model 'location'
        db.delete_table(u'corroborator_app_location')

        # Deleting model 'labeling'
        db.delete_table(u'corroborator_app_labeling')

        # Deleting model 'crime_category'
        db.delete_table(u'corroborator_app_crime_category')

        # Deleting model 'source_type'
        db.delete_table(u'corroborator_app_source_type')

        # Deleting model 'source'
        db.delete_table(u'corroborator_app_source')

        # Deleting model 'dialect'
        db.delete_table(u'corroborator_app_dialect')

        # Deleting model 'position'
        db.delete_table(u'corroborator_app_position')

        # Deleting model 'occupation'
        db.delete_table(u'corroborator_app_occupation')

        # Deleting model 'ethnicity'
        db.delete_table(u'corroborator_app_ethnicity')

        # Deleting model 'religion'
        db.delete_table(u'corroborator_app_religion')

        # Deleting model 'nationality'
        db.delete_table(u'corroborator_app_nationality')

        # Deleting model 'media'
        db.delete_table(u'corroborator_app_media')

        # Deleting model 'actor'
        db.delete_table(u'corroborator_app_actor')

        # Deleting model 'actor_relationship'
        db.delete_table(u'corroborator_app_actor_relationship')

        # Deleting model 'role'
        db.delete_table(u'corroborator_app_role')

        # Deleting model 'bulletin'
        db.delete_table(u'corroborator_app_bulletin')

        # Removing M2M table for field bulletin_comments on 'bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_bulletin_comments'))

        # Removing M2M table for field actors_role on 'bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_actors_role'))

        # Removing M2M table for field times on 'bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_times'))

        # Removing M2M table for field medias on 'bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_medias'))

        # Removing M2M table for field locations on 'bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_locations'))

        # Removing M2M table for field labels on 'bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_labels'))

        # Removing M2M table for field sources on 'bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_sources'))

        # Removing M2M table for field ref_bulletins on 'bulletin'
        db.delete_table(db.shorten_name(u'corroborator_app_bulletin_ref_bulletins'))

        # Deleting model 'incident'
        db.delete_table(u'corroborator_app_incident')

        # Removing M2M table for field incident_comments on 'incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_incident_comments'))

        # Removing M2M table for field ref_incidents on 'incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_ref_incidents'))

        # Removing M2M table for field bulletins on 'incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_bulletins'))

        # Removing M2M table for field actors_role on 'incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_actors_role'))

        # Removing M2M table for field crimes on 'incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_crimes'))

        # Removing M2M table for field labels on 'incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_labels'))

        # Removing M2M table for field times on 'incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_times'))

        # Removing M2M table for field locations on 'incident'
        db.delete_table(db.shorten_name(u'corroborator_app_incident_locations'))


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
            'Meta': {'object_name': 'actor'},
            'POB': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'POB'", 'null': 'True', 'to': u"orm['corroborator_app.location']"}),
            'actor_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'age_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'age_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'civilian_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'civilian_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'current_location': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_current'", 'null': 'True', 'to': u"orm['corroborator_app.location']"}),
            'ethnicity_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ethnicity_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'fullname_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'fullname_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'media': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.media']", 'null': 'True', 'blank': 'True'}),
            'nationality_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'nationality_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'nickname_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'nickname_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'occupation_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'occupation_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'position_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'position_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'related_actors': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['corroborator_app.actor']", 'through': u"orm['corroborator_app.actor_relationship']", 'symmetrical': 'False'}),
            'religion_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'religion_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'sex_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'sex_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'spoken_dialect_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'spoken_dialect_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.actor_relationship': {
            'Meta': {'object_name': 'actor_relationship'},
            'actor_a': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_a'", 'null': 'True', 'to': u"orm['corroborator_app.actor']"}),
            'actor_b': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'actor_b'", 'null': 'True', 'to': u"orm['corroborator_app.actor']"}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'relation_status': ('django.db.models.fields.CharField', [], {'max_length': '25'})
        },
        u'corroborator_app.bulletin': {
            'Meta': {'object_name': 'bulletin'},
            'actors_role': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.role']", 'null': 'True', 'blank': 'True'}),
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'bulletin_comments': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.comment']", 'null': 'True', 'blank': 'True'}),
            'bulletin_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {}),
            'description_ar': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'labels': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.labeling']", 'null': 'True', 'blank': 'True'}),
            'locations': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.location']", 'null': 'True', 'blank': 'True'}),
            'medias': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.media']", 'null': 'True', 'blank': 'True'}),
            'ref_bulletins': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'ref_bulletins_rel_+'", 'null': 'True', 'to': u"orm['corroborator_app.bulletin']"}),
            'sources': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.source']", 'null': 'True', 'blank': 'True'}),
            'times': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.time_info']", 'null': 'True', 'blank': 'True'}),
            'title_ar': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'blank': 'True'}),
            'title_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'type': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'uri': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.comment': {
            'Meta': {'ordering': "['comment_created']", 'object_name': 'comment'},
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'comment_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'status': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.status_update']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.crime_category': {
            'Meta': {'object_name': 'crime_category'},
            'category_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'category_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'parent': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ref_crime': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.crime_category']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.dialect': {
            'Meta': {'object_name': 'dialect'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.ethnicity': {
            'Meta': {'object_name': 'ethnicity'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.incident': {
            'Meta': {'object_name': 'incident'},
            'actors_role': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.role']", 'null': 'True', 'blank': 'True'}),
            'assigned_user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'bulletins': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.bulletin']", 'null': 'True', 'blank': 'True'}),
            'confidence_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3'}),
            'crimes': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.crime_category']", 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'incident_comments': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.comment']", 'null': 'True', 'blank': 'True'}),
            'incident_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'incident_details_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'incident_details_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'labels': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.labeling']", 'null': 'True', 'blank': 'True'}),
            'locations': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.location']", 'null': 'True', 'blank': 'True'}),
            'ref_incidents': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'ref_incidents_rel_+'", 'null': 'True', 'to': u"orm['corroborator_app.incident']"}),
            'times': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['corroborator_app.time_info']", 'null': 'True', 'blank': 'True'}),
            'title_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'title_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.labeling': {
            'Meta': {'object_name': 'labeling'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'ref_label': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.labeling']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.location': {
            'Meta': {'object_name': 'location'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latitude': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'loc_type': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'longitude': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'parent_location': ('django.db.models.fields.related.ForeignKey', [], {'max_length': '255', 'to': u"orm['corroborator_app.location']", 'null': 'True', 'blank': 'True'}),
            'parent_text': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.media': {
            'Meta': {'object_name': 'media'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'media_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'media_file': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'media_type': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.nationality': {
            'Meta': {'object_name': 'nationality'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.occupation': {
            'Meta': {'object_name': 'occupation'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.position': {
            'Meta': {'object_name': 'position'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.predefined_search': {
            'Meta': {'object_name': 'predefined_search'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'search_request': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'search_type': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.religion': {
            'Meta': {'object_name': 'religion'},
            'description_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.role': {
            'Meta': {'object_name': 'role'},
            'actor': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.actor']", 'null': 'True', 'blank': 'True'}),
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'role_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'role_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'role_status': ('django.db.models.fields.CharField', [], {'max_length': '25'})
        },
        u'corroborator_app.source': {
            'Meta': {'object_name': 'source'},
            'comments_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'comments_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'name_en': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ref_source': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.source']", 'null': 'True', 'blank': 'True'}),
            'reliability_score': ('django.db.models.fields.IntegerField', [], {'max_length': '3'}),
            'source_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['corroborator_app.source_type']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.source_type': {
            'Meta': {'object_name': 'source_type'},
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'source_type': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        u'corroborator_app.status_update': {
            'Meta': {'object_name': 'status_update'},
            'description_ar': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'description_en': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'status_ar': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'status_en': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'null': 'True', 'blank': 'True'})
        },
        u'corroborator_app.time_info': {
            'Meta': {'object_name': 'time_info'},
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