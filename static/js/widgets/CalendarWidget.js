(function ($) {
AjaxSolr.CalendarWidget = AjaxSolr.AbstractFacetWidget.extend({

afterRequest: function () {
  var self = this;
  $(self.target).change(function(){
	datesToFilter = $(this).val().split(' - ');
	self.add('[' + datesToFilter[0].replace(/\//g,'-') + 'T00:00:00Z TO ' + datesToFilter[1].replace(/\//g,'-') + 'T23:59:59Z]')
        self.doRequest();
  });
}
});
})(jQuery);
