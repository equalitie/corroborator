define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"padding\">\n  <div class=\"Selection\">\n    <div class=\"description\">\n      <span class=\"text T\">\n      <span id=\"number-selected\"></span>\n    </div>\n    <div class=\"actions\">\n    </div>\n  </div>\n</div>\n\n<table class=\"incidents\">\n  <thead>\n    <tr class=\"filters\">\n      <th class=\"is-selector\">&nbsp;</th>\n      <th class=\"is-preview\">&nbsp;</th>\n      <th class=\"is-description sort-header\">\n        <a href=\"#+mode=date\" class=\"T current date is-descending\">date</a>\n        <a href=\"#+mode=location\" class=\"T location\">location</a>\n        <a href=\"#+mode=title\" class=\"T title\">title</a>\n      </th>\n      <th class=\"is-status sort-header\">\n        <a href=\"#+mode=status\" class=\"T sort-status\">status</a>\n      </th>\n      <th class=\"is-score sort-header\">\n        <a href=\"#+mode=score\" class=\"T sort-score\">score</a>\n      </th>\n    </tr>\n  </thead>\n</table>\n";
  })

});