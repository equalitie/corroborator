define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"search\">\n  <input type=\"text\" class=\"with-clear\">\n  <button class=\"do-clear\">\n    <span>✓</span>\n  </button>\n  <button class=\"do-search do-search-embedded medias\">\n    <span>Search</span>\n  </button>\n</div>\n\n<ul class=\"media\"></ul>\n\n<button class=\"do-upload upload-media\">\n  <span>Upload New Media</span>\n</button>\n";
  })

});