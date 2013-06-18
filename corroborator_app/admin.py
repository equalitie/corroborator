from django.contrib import admin
from corroborator_app.models import\
    Incident, CrimeCategory, Actor, Bulletin, TimeInfo, Location, Source,\
    StatusUpdate, ActorRole, Label, SourceType, Comment, Media,\
    PredefinedSearch


class CommentsInlineIn(admin.TabularInline):
    model = Incident.incident_comments.through
    extra = 1


class LocationInlineIn(admin.TabularInline):
    model = Incident.locations.through
    extra = 1


class TimeInfoInlineIn(admin.StackedInline):
    model = Incident.times.through
    extra = 1


class ActorsRoleInlineIn(admin.TabularInline):
    model = Incident.actors_role.through
    extra = 1


class LabelInlineIn(admin.TabularInline):
    model = Incident.labels.through
    extra = 1


class CrimesInlineIn(admin.TabularInline):
    model = Incident.crimes.through
    extra = 1


class CorrobAdminIn(admin.ModelAdmin):
    inlines = [
        TimeInfoInlineIn, CommentsInlineIn, LocationInlineIn,
        ActorsRoleInlineIn, LabelInlineIn, CrimesInlineIn
    ]
    list_display = ('title_en',  'incident_details_en', )
    exclude = ('times', 'locations', 'actors_role', 'incident_comments', 'labels', 'crimes')


class LocationInline(admin.TabularInline):
    model = Bulletin.locations.through
    extra = 1


class TimeInfoInline(admin.StackedInline):
    model = Bulletin.times.through
    extra = 1


class SourceInline(admin.TabularInline):
    model = Bulletin.sources.through
    extra = 1


class ActorsRoleInline(admin.TabularInline):
    model = Bulletin.actors_role.through
    extra = 1


class LabelInline(admin.TabularInline):
    model = Bulletin.labels.through


class CorrobAdmin(admin.ModelAdmin):
    inlines = [
        TimeInfoInline, LocationInline, SourceInline,
        ActorsRoleInline, LabelInline,
    ]
    list_display = ('title_en', 'description_en', )
    exclude = ('times', 'locations', 'sources', 'actors_role', 'labels')


class StatusAdmin(admin.ModelAdmin):
    list_display = ('status_en', 'description_en', )
    readonly_fields = ('user', )

    def save_model(self, request, obj, form, change):
        if getattr(obj, 'user', None) is None:
            obj.user = request.user
        obj.save()


class TimeInfoAdmin(admin.ModelAdmin):
    list_display = ('time_from', 'time_to', 'comments_en', )


admin.site.register(Bulletin, CorrobAdmin)
admin.site.register(StatusUpdate)
admin.site.register(TimeInfo, TimeInfoAdmin)
admin.site.register(Location)
admin.site.register(Source)
admin.site.register(SourceType)
admin.site.register(Label)
admin.site.register(CrimeCategory)
admin.site.register(Actor)
admin.site.register(ActorRole)
admin.site.register(Media)
admin.site.register(Comment)
admin.site.register(PredefinedSearch)
admin.site.register(Incident, CorrobAdminIn)
