/*global require*/
// Author: Cormac McGuire
// ### view to control reporting tabs - add remove classes
// 

define(
  ['jquery', 'backbone'],
  function($, Backbone) {
    'use strict';

    // control the tabs
    var TabView = Backbone.View.extend({
      events: {
        'click .tabs li': 'showTabSelected'
      },
      showTabSelected:function(evt) {
        this.$selected = $(evt.currentTarget);
        this.$selected.addClass('current')
                      .siblings()
                      .removeClass('current');
      }
    });
  
    return TabView;
  }
);
