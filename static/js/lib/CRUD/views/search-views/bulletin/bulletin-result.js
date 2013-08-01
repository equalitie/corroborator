/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// display an embedded search result for an bulletin

define (
  [
    'jquery', 'backbone',
    'lib/streams',
    'lib/CRUD/templates/bulletin-result.tpl',
  ],
  function ($, Backbone, Streams, bulletinResultTmp) {
    'use strict';

    var BulletinResultView,
        crudBus = Streams.crudBus;

    // ### BulletinResultView
    // 
    BulletinResultView = Backbone.View.extend({
      template: bulletinResultTmp,
      tagName: 'li',
      events: {
        'click .do-relate': 'relateToEntity',
        'click .do-remove': 'removeBulletin'
      },
      // constructor
      initialize: function(options) {
        if (options.type === undefined) {
          throw "You must specify a type";
        }
        this.type = options.type;
        this.render();
      },
      // send a message asking to relate this bulletin to the current  
      // entity being edited
      relateToEntity: function(evt) {
        this.collection.remove(this.model);
        crudBus.push({
          type: 'relate_bulletin_request',
          content: {
            model: this.model
          }
        });
      },

      // remove the bulletin from the current entity
      removeBulletin: function(evt) {
        evt.preventDefault();
        this.collection.remove(this.model);
        crudBus.push({
          type: 'unrelate_bulletin_request',
          content: {
            model: this.model
          }
        });
      },

      resetFlags: function() {
        this.model.unset('selected');
        this.model.unset('result');
      },

      // render the template
      render: function() {
        this.resetFlags();
        this.model.set(this.type, true);
        var templateVars = {
          model: this.model.toJSON(),
        };
        var html = this.template(templateVars);
        this.$el.append(html);
      }
    });

    return BulletinResultView;
    
});
