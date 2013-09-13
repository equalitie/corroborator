/*global define*/
// Author: Cormac McGuire
// ### Description
// Show the sort headers and send sort request events

define (
  [
    'underscore', 'backbone', 'jquery',
    'lib/streams',
    'lib/SolrSearch/templates/filters.tpl'
  ],
  function (_, Backbone, $, Streams, filtersTmp) {
    'use strict';
    var createTypeFilter, filterSort, createNavProperty, searchBus, navBus,
    extractResults, getSortType, combineBoth, filterExecuteAction;
    
    // STREAM PROCESSING
    searchBus = Streams.searchBus;
    navBus = Streams.navBus;
    createTypeFilter = Streams.filterLib.createTypeFilter;
    filterSort = createTypeFilter('filter_view');
    createNavProperty = function() {
      var mapNav = function(value) {
        return { navValue: value.content.entity };
      };
      return navBus.toEventStream()
                   .map(mapNav);
    };
    extractResults = function(value) {
      return value.content;
    };

    getSortType = function(value) {
      return {
        option: value.sort,
        direction: value.direction
      };
    };
    // used to combine nav and action combo events  
    // this should be edited to use the type/content format
    combineBoth = function(previous, newValue) {
      if (newValue.hasOwnProperty('navValue')) {
        previous.navValue = newValue.navValue;
        previous.action = false;
      }
      if (newValue.hasOwnProperty('option')) {
        previous.option = newValue.option;
        previous.action = true;
        previous.direction = newValue.direction;
      }
      return previous;
    };
    filterExecuteAction = function(value) {
      return value.action === true;
    };

    // VIEW

    var SortView = Backbone.View.extend({
      el: 'tr.filters',
      eventIdentifier: 'filter_view',
      variableFilter: 'location',
      events: {
        'click a': 'handleFilter',
        'click .date': 'sortDate',
        'click .location': 'sortLocation',
        'click .age': 'sortAge',
        'click .title': 'sortTitle',
        'click .sort-status': 'sortStatus',
        'click .sort-score': 'sortScore'
      },

      currentSort: '',
      direction: '',

      initialize: function() {
        this.watchSortEvents();
        this.watchNavEvents();
        this.render();
      },

      // handle sort events from headers
      sortDate: function() {
        this.sendSortEvent('date');
      },
      sortLocation: function() {
        this.sendSortEvent('location');
      },
      sortAge: function() {
        this.sendSortEvent('age');
      },
      sortTitle: function() {
        this.sendSortEvent('title');
      },
      sortStatus: function() {
        this.sendSortEvent('status');
      },
      sortScore: function() {
        this.sendSortEvent('score');
      },

      getDirection: function(requestedSort, currentDirection) {
        var newDirection, directions;
        directions = ['ascending', 'descending'];
        
        if (requestedSort === this.currentSort) {
          newDirection = _.chain(directions)
                  .without(currentDirection)
                  .last()
                  .value();
        }
        else {
          newDirection = 'descending';
        }
        return newDirection;

      },

      sendSortEvent: function(sortEventName) {
        this.direction = this.getDirection(sortEventName, this.direction);
        this.currentSort = sortEventName;
        Streams.searchBus.push({
          type: this.eventIdentifier,
          content: {
            sort: this.currentSort,
            direction: this.direction
          }
        });
      },

      // watch for nav to actor - swap out sort headers when change to and from
      watchNavEvents: function() {
        var self = this;
        var filterMap = {
          actor: 'age',
          bulletin: 'location',
          incident: 'location'
        };
        createNavProperty()
          .onValue(function(value) {
            self.variableFilter = filterMap[value.navValue];
            self.render();
          });
      },

      watchSortEvents: function() {
        var self = this;

        var selectStream = Streams.searchBus.toEventStream()
                           .filter(filterSort)
                           .map(extractResults)
                           .map(getSortType);

        var both = selectStream.merge(createNavProperty());
        var watcher = both.scan({
                            type: self.eventIdentifier + '_combined'
                          }, combineBoth);
        watcher.filter(filterExecuteAction)
               .onValue(function(value) {
                  Streams.searchBus.push(value);
                });

      },

      handleFilter: function(e) {
        e.preventDefault();
        $(e.currentTarget).parent()
                          .siblings()
                          .children()
                          .removeClass('current')
                          .removeClass('is-descending');

        $(e.currentTarget).parent()
                          .children()
                          .removeClass('current')
                          .removeClass('is-descending');

        $(e.currentTarget).addClass('current').addClass('is-descending');
      },
      render: function() {
        var html = filtersTmp({variableFilter: this.variableFilter});
        this.$el.empty()
                .append(html);
      }
    });

    return SortView;
});

