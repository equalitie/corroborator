define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label>Actors</label>\n<div class=\"search\">\n  <input type=\"text\" class=\"with-clear\">\n  <button class=\"do-clear\">\n    <span>✓</span>\n  </button>\n  <button class=\"do-search do-search-embedded actors\">\n    <span>Search</span>\n  </button>\n</div>\n<ul class=\"elements elements-bulletin\">\n\n</ul>\n<select multiple=\"true\" name=\"actors_role\" id=\"actors_role\" class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field hidden\">\n</select>\n\n<!--<div class=\"drop-target\">Drag &amp; drop actors here</div>-->\n\n";
  return buffer;
  })

});