define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label>Related bulletins</label>\n<div class=\"search\">\n  <input type=\"text\" class=\"with-clear\"/>\n  <button class=\"do-clear\"><span>✓</span></button>\n  <button class=\"do-search-embedded bulletins\"><span>Search</span></button>\n</div>\n<ul class=\"elements elements-bulletins-bulletins\">\n\n</ul>\n<select multiple=\"true\" name=\"ref_bulletins\" id=\"ref_bulletins\"\n  class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field hidden\">\n</select>\n<!--      <div class=\"drop-target\">Drag &amp; drop bulletins here</div> -->\n\n";
  return buffer;
  })

});