define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"header actor-display\">\n  <div class=\"padding\">\n    <div class=\"group is-creator\">\n      <button class=\"do-create-actor create\">\n        <span class=\"text T\">New actor</span>\n      </button>\n    </div>\n  </div>\n</div>\n<div class=\"body actor-filter\" style=\"top: 62px;\">\n  <div class=\"padding\">\n    <div class=\"group is-filters filters\">\n      <!-- enabled filters -->\n      <div class=\"selected-actor-filters filter is-labels\">\n      </div>\n\n      <!-- filter groups go in here -->\n      <div class=\"filter-groups\">\n      </div>\n    </div>\n  </div>\n</div>\n";
  })

});