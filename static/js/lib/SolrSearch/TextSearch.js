define(
  [
    'underscore',
    'lib/streams'
  ],
  function(_, Streams) {

    AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function () {
        Streams.searchBus.toEventStream().filter(function(value) {
        });
        
      },

      afterRequest: function () {
        $(this.target).find('input').val('');
      }
    });
    var init = function() {
    };

    return init;


});

