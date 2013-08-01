define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<label>Related incidents</label>\n<div class=\"search\">\n  <input type=\"text\" class=\"with-clear\"/>\n  <button class=\"do-clear\"><span>✓</span></button>\n  <button class=\"do-search do-search-embedded incidents\"><span>Search</span></button>\n</div>\n<ul class=\"elements elements-incidents-incidents\">\n\n</ul>\n<select multiple=\"true\" name=\"ref_incidents\" id=\"ref_incidents\" class=\"hidden\">\n</select>\n<!--      <div class=\"drop-target\">Drag &amp; drop incidents here</div> -->\n";
  })

});