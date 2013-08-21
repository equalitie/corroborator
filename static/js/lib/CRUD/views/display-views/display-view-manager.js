/*global define*/
// Author: Cormac McGuire
// ### Description
// This view manages the display area, it listens for navigation events and
// displays our entities base on the path sent  
// It instantiates actor bulletin and incident views and handles their
// disposal

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/views/display-views/actor/actor-display-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-display-container',
    'lib/CRUD/views/display-views/incident/incident-display-container',
    'lib/CRUD/templates/display-templates/display-manager.tpl'
  ],
  function (Backbone, _, Streams,
    ActorDisplayView, BulletinDisplayView, IncidentDisplayView,
    displayManagerContainerTmp) {
    'use strict';

    var DisplayManagerView,
        navBus = Streams.navBus,
        viewMap = {
          actor: ActorDisplayView,
          bulletin: BulletinDisplayView,
          incident: IncidentDisplayView
        },
        extractEntity = function(value) {
          return value.content;
        },
        filterNavEvent = function(value) {
          return value.type=== 'navigate';
        },
        filterEntityNav = function(value) {
          return value.type === 'entity-display';
        };

    // ### DisplayManagerView
    // 
    DisplayManagerView = Backbone.View.extend({
      template: displayManagerContainerTmp,
      el: '.form_overlay',
      childViews: [],
      router: undefined,
      expanded: false,
      currentTab: '',

      events: {
        'click .display.do-hide'  : 'closeViewRequested',
        'click button.do-select'  : 'selectRequested',
        'click button.do-expand'  : 'expandRequested',
        'click button.do-collapse': 'collapseRequested',
        'click .do-edit'          : 'editRequested'
      },

      initialize: function() {
        this.watchNavEvents();
        this.router = new Backbone.Router();
      },

      // close the display view - trigger a navigate to tab to allow
      // for reselection of the entity
      closeViewRequested: function(evt) {
        evt.preventDefault();
        this.router.navigate('#tab/' + this.currentTab, {trigger: true});
        this.destroyChildren();
        this.$el.children().remove();
      },

      // edit requested trigger the request edit function
      // TODO - change this to be event driven
      editRequested: function() {
        this.$el.children().remove();
        _.last(this.childViews).requestEdit();
        this.destroyChildren();
      },
      selectRequested: function() {
        //_.last(this.childViews).trigger('select');
      },
      expandRequested: function() {
          this.expandView();
        _.last(this.childViews).trigger('expand');
        
      },
      expandView: function() {
        this.$el.children().addClass('is-expanded');
      },
      collapseView: function() {
        this.$el.children().removeClass('is-expanded');
      },

      collapseRequested: function() {
        _.last(this.childViews).trigger('expand');
        this.collapseView();
      },


      // watch for navigate to entity events
      watchNavEvents: function() {
        navBus.filter(filterEntityNav)
              .map(extractEntity)
              .onValue(this.displayEntity.bind(this));

        navBus.filter(filterNavEvent)
              .onValue(function(value) {
                this.currentTab = value.content.entity;
              }.bind(this));
      },

      // display an entity
      displayEntity: function(content) {
        this.expanded = content.expanded;
        this.renderContainer(content)
            .renderEntity(content);
        if (this.expanded) {
          this.expandView();
        }
        else {
          this.collapseView();
        }
      },

      // destroy child views
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // render an entity
      renderEntity: function(entityDetails) {
        this.destroyChildren();
        var displayView = new viewMap[entityDetails.entity]({
          entityDetails: entityDetails
        });
        this.$el.children()
                .children('.body')
                .append(displayView.$el);

        //trigger a resize to be passed on to the map views
        //to get over them being rendered when not actually in the dom
        displayView.trigger('resize');
        this.childViews.push(displayView);
        return this;
      },

      // render the container
      renderContainer: function(content) {
        var html = this.template(content);
        this.$el.append(html);
        return this;
      }
    });

    return DisplayManagerView;
    
});
