from django.contrib import admin
from corroborator_app.models import incident,crime_category,actor,bulletin,time_info,location,source,status_update,role,labeling,source_type,comment,media,predefined_search

class CommentsInlineIn(admin.TabularInline):
    model = incident.incident_comments.through
    extra =  1

class LocationInlineIn(admin.TabularInline):
    model = incident.locations.through
    extra =  1
class TimeInfoInlineIn(admin.StackedInline):
    model = incident.times.through
    extra = 1
class ActorsRoleInlineIn(admin.TabularInline):
    model = incident.actors_role.through
    extra = 1
class LabelInlineIn(admin.TabularInline):
    model = incident.labels.through
    extra = 1
class CrimesInlineIn(admin.TabularInline):
    model = incident.crimes.through
    extra = 1

class CorrobAdminIn(admin.ModelAdmin):
    inlines = [TimeInfoInlineIn,CommentsInlineIn,LocationInlineIn,ActorsRoleInlineIn,LabelInlineIn,CrimesInlineIn]
    list_display = ('title_en','incident_details_en',)
    exclude = ('times','locations','actors_role','incident_comments','labels','crimes')

class LocationInline(admin.TabularInline):
    model = bulletin.locations.through
    extra =  1
class TimeInfoInline(admin.StackedInline):
    model = bulletin.times.through
    extra = 1
class SourceInline(admin.TabularInline):
    model = bulletin.sources.through
    extra = 1
class ActorsRoleInline(admin.TabularInline):
    model = bulletin.actors_role.through
    extra = 1
class LabelInline(admin.TabularInline):
    model = bulletin.labels.through


class CorrobAdmin(admin.ModelAdmin):
    inlines = [TimeInfoInline,LocationInline,SourceInline,ActorsRoleInline,LabelInline,]
    list_display = ('title_en','description_en',)
    exclude = ('times','locations', 'sources','actors_role','labels')

class StatusAdmin(admin.ModelAdmin):
    list_display = ('status_en','description_en',)
    readonly_fields = ('user',)
    def save_model(self, request, obj, form, change):
        if getattr(obj,'user', None) is None:
            obj.user = request.user
        obj.save()

class TimeInfoAdmin(admin.ModelAdmin):
    list_display = ('time_from','time_to','comments_en',)

admin.site.register(bulletin, CorrobAdmin)
admin.site.register(status_update)
admin.site.register(time_info,TimeInfoAdmin)
admin.site.register(location)
admin.site.register(role)
admin.site.register(source)
admin.site.register(source_type)
admin.site.register(labeling)
admin.site.register(crime_category)
admin.site.register(actor)
admin.site.register(media)
admin.site.register(comment)
admin.site.register(predefined_search)
admin.site.register(incident, CorrobAdminIn)
