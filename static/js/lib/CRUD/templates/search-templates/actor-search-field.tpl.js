define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<label>Actors</label>\n<div class=\"search\">\n  <input type=\"text\" class=\"with-clear\">\n  <button class=\"do-clear\">\n    <span>✓</span>\n  </button>\n  <button class=\"do-search do-search-embedded actors\">\n    <span>Search</span>\n  </button>\n</div>\n<ul class=\"elements elements-bulletin\">\n\n</ul>\n<select multiple=\"true\" name=\"actors_role\" id=\"actors_role\" class=\"hidden\">\n</select>\n\n<!--<div class=\"drop-target\">Drag &amp; drop actors here</div>-->\n\n";
  })

});