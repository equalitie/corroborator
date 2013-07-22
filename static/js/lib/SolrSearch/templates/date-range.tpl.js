define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<label >Date Range</label>\n<br/>\n<label for=\"from\">From</label>\n<input type=\"text\" class=\"from-date\" name=\"from\" />\n<label for=\"to\">to</label>\n<input type=\"text\" class=\"to-date\" name=\"to\" />\n";
  })

});