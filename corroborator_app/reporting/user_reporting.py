from corroborator_app.models import VersionStatus
from django.contrib.auth.models import User
from django.db.models import Count

import json

class UserReportingApi(object):

    def __init__(self):
        """
        """
        pass

    def total_user_login_time(self):
        """
        Return total user login time
        """
        graph_title = 'Total login time by User'

        user_items = VersionStatus.objects.values('user__username').annotate(value=Sum('total_seconds'))

        return self.bar_format_json(user_items, graph_title)

    def total_user_login_per_day(self, user_id):
        """
        Return total user login time per day
        for a given user.
        """
        graph_title = 'Total user login per day'

        item = VersionStatus.objects.filter(
            user_id=user_id
        ).extra(
            {'timestamp':"date(logout_timestamp)"}
        ).values('logout_timestamp').annotate(
            val=Sum('total_seconds')
        )
        items = []
 
        items.append({
            'values': item,
            'label': 'Total user login time by date'
        })

        return self.trend_format_json(self, items, graph_title)
 
    def user_average_updates_per_hour(self):
        """
        Return average updates per hour of login for 
        a given user.
        """
        graph_title = 'Average user updates per hour'
        user_updates = VersionStatus.objects.filter(
            status='edited'
        ).values('user_username', 'user_id').annotate(total_updates=Count(id))

        average_updates = []
        for update in user_updates:
            total_hours = self.total_user_login_in_hours(
                update['user_id']
            )
            average = int(update['total_updates']) / int(total_hours)
            average_updates.add({
                'user__username': update['user__username'],
                'value': average 
            })

        return self.bar_format_json(average_updates, graph_title)

    def total_user_login_in_hours(user_id):
        """
        Return the total logged in time for a user in hours
        """
        time = VersionStatus.objects.filter(
            user_id=user_id
        ).annotate(
            val=Sum('total_seconds')
        )
        return time['val']

    def user_assigned_items_by_status(self, user_id):
        """
        Return number of items assigned to a given user
        in terms of status.
        """
        graph_title = 'User assigned items by status'

        user = User.objects.filter(pk=user_id)
        statuses = {}

        bulletin_set = user.bulletin_set.all()
        incident_set = user.incident_set.all()
        actor_set = user.actor_set.all()

        statuses.append(
            self.get_entity_statuses(
                bulletin_set,
                statuses,
                'bulletin'
            )
        )
        statuses.append(
            self.get_entity_statuses(
                incident_set,
                statuses,
                'incident'
            )
        )
        statuses.append(
            self.get_entity_statuses(
                actor_set,
                statuses,
                'actor'
            )
        )

        status_set = {}
    
        for key,value in statuses:
            status_set.add({
                label: key,
                value: value
            })
        return self.bar_formatted_json_per_user(status_set, graph_title)

    def get_entity_statuses(self, entity_set, statuses, entity_type):
        for entity in entity_set:
            if entity['most_recent_status_' + entity_type] in statuses:
                statuses[bulletin.most_recent_status_bulletin] += 1
            else:
                statuses[bulletin.most_recent_status_bulletin] = 1
        
        return statuses

    def total_user_items_by_crud(self, crud_type):
        """
        Return JSON object containing set of deleted items
        """
        graph_title = 'Total {0} items by User'.format(crud_type)

        user_items = VersionStatus.objects.filter(
            status=crud_type
        ).values('user__username').annotate(value=Count('status'))

        return self.bar_format_json(user_items, graph_title)

    def crud_per_day(self):
        """
        CRUD opperations total per day
        """
        graph_title = 'Deleted, created and edited items by date'

        items = []
 
        items.append({
            'values': self.get_items_by_crud_date('deleted'),
            'label': 'Deleted items by date'
        })
        items.append({
            'values': self.get_items_by_crud_date('created'),
            'label': 'Created items by date'
        })
        items.append({
            'values': self.get_items_by_crud_date('edited'),
            'label': 'Edited items by date'
        })

        return self.trend_format_json(self, items, graph_title)
 
    def get_items_by_crud_date(self, crud_type):
        items = VersionStatus.objects.filter(
            status=crud_type
        ).extra(
            {'timestamp':"date(version_timestamp)"}
        ).values('version_timestamp').annotate(
            val=Count('id')
        )
 
        return items

    def trend_format_json(self, objects, graph_title):
        """
        Convert the given set of user objects to
        the correct format for trend graphs
        """
        trend_json = {
            title: graph_title,
            values: objects
        }
        
        return json.dumps(trend_json)

    def bar_format_json_per_user(self, objects, graph_title):
        """
        Convert the given set of user objects to the
        correct format for trend graphs
        """
        bar_json = {
            title: graph_title,
            values: objects
        }
        
        return json.dumps(bar_json)

    def bar_format_json(self, objects, graph_title):
        """
        Convert the given set of user objects to the
        correct format for trend graphs
        """
        bar_json = {
            title: graph_title,
            values: self.get_object_values(objects)
        }
        
        return json.dumps(bar_json)

    def get_object_values(self, objects):
        values = []
        for object in objects:
            item = {
                value: object['value'],
                label: object['user__username']
            }
            values.append(item)

        return values

