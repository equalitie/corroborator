define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "  <p class=\"validateTips form-error\"></p>\n  <fieldset>\n    <label for=\"name\">Search title</label>\n    <input type=\"text\"\n           name=\"search-title\" \n           id=\"search-title\"\n           class=\"text ui-widget-content ui-corner-all\" />\n  </fieldset>\n";
  })

});