/*global define, document*/
// Author: Cormac McGuire
// ### Description
// Create an overlay for forms while they are saving

define (
  [
    'jquery', 'underscore'//, 'spin'
  ],
  function ($, _/*, Spinner*/) {
    'use strict';

    var OverlayManager = function(options) {
      this.setDefaults(options);
      this.setStyles();
    };

    var prototypeFunctions = {
      defaults: {
        $overlayEl: $('<div id="osfosfj-form-cover"></div>'),
        widthOffset: 0,
        color: 'black',
        successText: 'Saved!',
        errorText: 'Save Failed'
      },
      completedCallback: function() {
      },

      setDefaults: function(options) {
        this.defaults = _.defaults(options, this.defaults);
        _.each(this.defaults, function(value, key) {
          this[key] = value;
        }, this);
        delete(this.defaults);
      },

      setStyles: function() {
        this.$overlayEl.height(this.$targetEl.height());
        this.$overlayEl.width(this.$targetEl.width() - this.widthOffset);
        this.$overlayEl.css('opacity', '0.5');
        this.$overlayEl.css('z-index', '2000');
        this.$overlayEl.css('background-color', 'black');
      },
      /*
      showSpinner: function() {
        var opts = {
          lines: 13, // The number of lines to draw
          length: 14, // The length of each line
          width: 6, // The line thickness
          radius: 17, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#000', // #rgb or #rrggbb
          speed: 1, // Rounds per second
          trail: 75, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: true, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: '100px', // Top position relative to parent in px
          left: '100px' // Left position relative to parent in px
        };
        this.spinner = new Spinner(opts).spin();
        this.$overlayEl.append(this.spinner.el);
        $(this.spinner.el).css('z-index', '2001');
      },*/

      hideOverlay: function() {
        this.$overlayEl.remove();
        this.completedCallback();
      },

      createSavedText: function() {
        var $savedTextEl = $('<p>' + this.successText + '</p>');
        $savedTextEl.css('color', 'white');
        $savedTextEl.css('text-align', 'center');
        $savedTextEl.css('font-size', '18px');
        this.$overlayEl.append($savedTextEl);
        $savedTextEl.position({
          my: "center center",
          at: "center center",
          of: this.$overlayEl
        });

      },

      displaySaved: function(completedCallback) {
        this.createSavedText();
        this.completedCallback = completedCallback;
        setTimeout(this.hideOverlay.bind(this), 250);
      },

      showOverlay: function() {
        this.$targetEl.append(this.$overlayEl);
        this.$overlayEl.position({
          my: "left top",
          at: "left top",
          of: this.$targetEl
        });
        //this.showSpinner();
      }
      
    };

    _.extend(OverlayManager.prototype, prototypeFunctions);

    return OverlayManager;
});

