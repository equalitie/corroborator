/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the actor element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/templates/display-templates/actor-display.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, _, Collections, Streams, ActorListView, 
    actorDisplayTmp, i18n) {
    'use strict';

    var ActorDisplayView,
        crudBus = Streams.crudBus,
        actorCollection = Collections.ActorCollection;

    // ### ActorDisplayView
    // Display and actor and all its related fields
    ActorDisplayView = Backbone.View.extend({
      className: 'actor-display-view',
      template: actorDisplayTmp,
      childViews: [],
      expanded: false,
      initialize: function(options) {
        this.addi18n();
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.expanded = options.entityDetails.expanded === undefined ?
          false : options.entityDetails.expanded;
          
        this.model = actorCollection.getEntity(options.entityDetails.id, 'actor');
        this.listenTo(this.model, 'sync', this.displayView.bind(this));
        this.listenTo(this.model, 'render', this.displayView.bind(this));
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        this.expanded = !this.expanded;
        this.toggleExpanded();
      },

      // set the small template
      displayView: function() {
        this.render()
            .renderRelatedActors();
      },

      onDestroy: function() {
        this.stopListening();
        this.destroyChildren();
      },

      toggleExpanded: function() {
        if (this.expanded === true) {
          this.expanded = false;
          this.displayView();
          this.$el.removeClass('span-60p');
        }
        else {
          this.expanded = true;
          this.displayView();
          this.$el.addClass('span-60p');
        }
      },
      requestEdit: function() {
        crudBus.push({
          type: 'edit_actor_request',
          content: {
            model: this.model,
            expanded: this.expanded
          }
        });
      },

      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // get the containing el for normal and expanded view
      getContainerEl: function(className) {
        var el;
        if (this.expanded === true) {
          el = this.$el.children()
                       .children()
                       .children('.body')
                       .children('.is-' + className);
        }
        else {
          el = this.$el.children()
                       .children('.body')
                       .children('.' + className);
        }
        return el;
      },

      // render the related Actors
      renderRelatedActors: function() {
        var actorsEl, content, roles_en, actorsContainer;
        actorsEl = this.getContainerEl('actors');
        content = this.model.get('actors');
        roles_en = this.model.get('actor_roles_status');
        actorsContainer = new ActorListView({
          el: actorsEl,
          content: content,
          roles: roles_en
        });
        return this;
      },
      render: function() {
        this.destroyChildren();
        var html = this.template({
          model: this.model.toJSON(),
          i18n: i18n
        });
        this.$el.html(html);
        return this;
      }
    });
    return ActorDisplayView;
});

