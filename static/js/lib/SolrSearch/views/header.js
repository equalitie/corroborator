/*global define, Bacon */
// ### header.js

// This displays the header view
// it provides:  
// > feedback on the number of actors selected
// > filtering for the search results
// > a menu to select/unselect all, create new, or update

define(
  [
    // vendor
    'jquery', 'backbone', 'handlebars',
    // streams
    'lib/streams',
    // elements
    'lib/elements/combo',
    //data
    'lib/Data/collections',
    // templates
    'lib/SolrSearch/templates/header.tpl',
    'lib/SolrSearch/templates/header-count.tpl',
    'lib/SolrSearch/templates/filters.tpl'
  ],
  function ($, Backbone, Handlebars, Streams, Combo, Collections,
    headerTmp, headerCountTmp, filtersTmp
  ) {
    'use strict';
    //////////////////////////////////////////////////////////////////////
    // Stream processing functions
    //////////////////////////////////////////////////////////////////////
    var navBus = Streams.navBus,
        filterSort = function(value) {
          return value.type === 'filter_view';
        },
        getSortType = function(value) {
          return {
            option: value.sort
          };
        },
        filterTabNav = function(value) {
          return value.type === 'navigate';
        },
        filterActions = function(value) {
          return value.type === 'action_combo';
        },
        extractResults = function(value) {
          return value.content;
        },

        getActionType = function(model) {
          return {
            option: model.get('name_en')
          };
        },
        // used to combine nav and action combo events
        combineBoth = function(previous, newValue) {
          if (newValue.hasOwnProperty('navValue')) {
            previous.navValue = newValue.navValue;
            previous.action = false;
          }
          if (newValue.hasOwnProperty('option')) {
            previous.option = newValue.option;
            previous.action = true;
          }
          return previous;
        },
        filterExecuteAction = function(value) {
          return value.action === true;
        },

        // map navigation event into a wrapped one
        createNavProperty = function() {
          var mapNav = function(value) {
            return { navValue: value.content.entity };
          };
          return navBus.toEventStream()
                       .map(mapNav);
        },
        // distinguish between new nav and action events
        identifyNewAction = function(previous, newValue) {
          return previous.option === newValue.option;
        };
    
    //////////////////////////////////////////////////////////////////////
    // END STREAM PROCESSING FUNCTIONS
    //////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////
    // VIEWS
    //////////////////////////////////////////////////////////////////////

    // collection of menu items for the action combo
    var menuItems = new Backbone.Collection([
      { name_en: 'Delete Selected' },
      { name_en: 'Update Selected' },
      { name_en: 'Select All' },
      { name_en: 'Clear Selected' }
    ]);

    //////////////////////////////////////////////////////////////////////
    // ACTION COMBO VIEW
    //////////////////////////////////////////////////////////////////////
    var ActionComboView = Combo.View.extend({
      eventIdentifier: 'action_combo',
      el: '.actions',
      initialize: function(options) {
        Combo.View.prototype.initialize.call(this, options);
        this.collection = options.collection;
        this.propogateEvents();
      },

      /**
       * register a handler for navigation events
       */
      propogateEvents: function() {
        var self = this;

        var selectStream = Streams.searchBus.toEventStream()
                           .filter(filterActions)
                           .map(extractResults)
                           .map(getActionType);

        var both = selectStream.merge(createNavProperty());
        var watcher = both.scan({
                            type: self.eventIdentifier + '_combined'
                          }, combineBoth);
        watcher.filter(filterExecuteAction)
               .onValue(function(value) {
                  Streams.searchBus.push(value);
                });

      }
    });

    //////////////////////////////////////////////////////////////////////
    // NUMBER OF ELEMENTS SELECTED VIEW
    //////////////////////////////////////////////////////////////////////
    var ElementsSelectedView = Backbone.View.extend({
      el: '#number-selected',
      initialize: function() {
        this.collections = {
          'actor': Collections.ActorCollection,
          'bulletin': Collections.BulletinCollection,
          'incident': Collections.IncidentCollection
        };
        this.watchNav();
      },
      watchNav: function() {
        createNavProperty().onValue(this.updateSelectedView.bind(this));
                           
      },

      // change the section we are watching
      updateSelectedView: function(value) {
        console.log(this);
        this.collection = this.collections[value.navValue];
        this.collection.on('reset change remove destroy updateSelected', this.render, this);
        this.collectionName = value.navValue;
        this.render();
      },

      pluralise: function(word, number) {
        if (number !== 1) {
          word = word + 's';
        }
        return word;
      },
      render: function() {
        var numItems = 
          this.collection.filter(function(model) {
            return model.get('checked') === 'checked';
          }).length;
        var html = headerCountTmp({
          domain:   this.pluralise(this.collectionName, numItems),
          numItems: numItems
        });
        this.$el.empty()
                .append(html);

        return this;
      }

    });

    //////////////////////////////////////////////////////////////////////
    // FILTER VIEW
    //////////////////////////////////////////////////////////////////////
    
    var FilterView = Backbone.View.extend({
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

      sendSortEvent: function(sortEventName) {
        Streams.searchBus.push({
          type: this.eventIdentifier,
          content: {
            sort: sortEventName
          }
        });
      },
      // watch for nav to actor - swap out filters when change to and from
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

    // ## used to render the header container view
    // renders the ElementsSelectedView and the ActionComboView subviews
    var HeaderView = Backbone.View.extend({
      el: '.search-header',
      eventIdentifier: 'header_view',

      initialize: function(options) {
        this.comboView = new ActionComboView({
          collection: menuItems,
          bus: Streams.searchBus,
          primary: {
            name_en: 'Actions',
            search_request: 'none'
          }
        });
        this.on('sortEvent', this.publishSort, this);
        this.render();
        this.renderFilterBox();
      },


      render: function() {
        var header = headerTmp({domain: 'incidents'});
        this.$el.append(header);
        this.renderSelectedCount();
        this.renderComboBox();
      },
      //render the number selected box
      renderSelectedCount: function() {
        var countView = new ElementsSelectedView({
        });
      },
      // render the actions
      renderComboBox: function() {
        // needed because actions div has just been rendered
        this.comboView.setElement('.actions');
        this.comboView.render();
      },
      renderFilterBox: function() {
        var filterView = new FilterView();
      }
    });


    // expose our view as a module export
    return {
      HeaderView: HeaderView
    };
});
