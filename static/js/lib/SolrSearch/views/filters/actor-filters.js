/*global define, Bacon */
// ### Description
// 
// Display the actor filters available via ActorFilterView
// and filters in use via ActorFiltersSelectedView
define(
  [
    // vendor
    'underscore', 'jquery', 'backbone', 'handlebars',
    // streams
    'lib/streams',
    //data
    'lib/SolrSearch/data/filter-collections',
    // filter mixins
    'lib/SolrSearch/views/filters/filter-mixins',
    'lib/SolrSearch/views/filters/filter-elements',
    'lib/SolrSearch/views/filters/date-range',
    // templates
    'lib/SolrSearch/templates/actor-filters.tpl'
  ],
  function (_, $, Backbone, Handlebars, Streams, FilterCollection,
    Mixins, FilterElements, DateRange, actorFiltersTmp) {
    'use strict';
    var ActorFilterView,
        FilterViewMixin = Mixins.FilterViewMixin,
        DateRangeView = DateRange.DateRangeView,
        ActorFilterCollection = FilterCollection.ActorFilterCollection,
        SelectedActorFilterCollection = 
          FilterCollection.SelectedActorFilterCollection,
        SelectedFiltersView = FilterElements.SelectedFiltersView;

    
    // ## Actor filter view
    // display a list of filters for actors
    ActorFilterView = Backbone.View.extend({
      el: '.right-filters',
      events : {
        'click button.do-create-actor': 'createActorPressed'
      },
      // store the sub views so we can get rid of them later

      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.render();
        this.collection = ActorFilterCollection;
        this.renderExistingCollection();
        this.collection.on('reset', this.renderFilterGroups, this);
        this.createSelectedFiltersGroup();
        this.createDateRangeWidget();
      },

      createDateRangeWidget: function() {
        this.dateRangeView = new DateRangeView({
          el: '.date-range',
          entityType: 'actor'
        });
      },

      // respond to new actor button press  
      // send event on search bus 
      createActorPressed: function(e) {
        var createActorEvent = {
          content: {},
          type: 'create_actor'
        };
        Streams.searchBus.push(createActorEvent);
      },

      // render the container
      render: function() {
        var html = actorFiltersTmp();
        this.$el.empty()
                .append(html);
      },

      // create the view that will display the users selected filters
      createSelectedFiltersGroup: function() {
        this.selectedFiltersView = new SelectedFiltersView({
          el: '.selected-actor-filters',
          collection: SelectedActorFilterCollection,
          type: 'actor'
        });
      }

    });
    _.extend(ActorFilterView.prototype, FilterViewMixin);
    
    // module export
    return {
      ActorFilterView: ActorFilterView
    };
});
