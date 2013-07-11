define(
  [
    'jquery',
    'core/Core',
    'core/AbstractFacetWidget'
  ], 
  function($) {
    AjaxSolr.labelsWidget = AjaxSolr.AbstractFacetWidget.extend({

    init: function(){
      var self = this;
      var facet = 'adult';
      self.manager.store.remove('fq');
      self.add(facet);
      self.doRequest();






    },// end init
    
    beforeRequest: function() {
    },


    afterRequest: function () {
    }

  });



});




