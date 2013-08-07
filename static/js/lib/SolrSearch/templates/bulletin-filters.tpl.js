define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"header bulletin-display\">\n  <div class=\"padding\">\n    <div class=\"group is-creator\">\n      <button class=\"do-create-bulletin create\">\n        <span class=\"text T\">New bulletin</span>\n      </button>\n    </div>\n  </div>\n</div>\n<div class=\"body bulletin-filter\" style=\"top: 62px;\">\n  <div class=\"padding\">\n    <div class=\"group is-filters filters\">\n      <!-- enabled filters -->\n      <div class=\"selected-bulletin-filters filter is-labels\">\n      </div>\n      <!-- filter groups go in here -->\n      <div class=\"filter-groups\">\n        <div class=\"date-range\"></div>\n        <div class=\"date-range\"></div>\n      </div>\n\n    </div>\n  </div>\n</div>\n";
  })

});