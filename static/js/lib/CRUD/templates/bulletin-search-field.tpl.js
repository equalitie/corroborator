define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<label>Related bulletins</label>\n<div class=\"search\">\n  <input type=\"text\" class=\"with-clear\"/>\n  <button class=\"do-clear\"><span>✓</span></button>\n  <button class=\"do-search do-search-embedded bulletins\"><span>Search</span></button>\n</div>\n<ul class=\"elements elements-bulletins-bulletins\">\n\n</ul>\n<select multiple=\"true\" name=\"ref_bulletins\" id=\"ref_bulletins\" class=\"hidden\">\n  <option value=\"\"></option>\n</select>\n<!--      <div class=\"drop-target\">Drag &amp; drop bulletins here</div> -->\n\n";
  })

});