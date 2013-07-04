define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "  <input type=\"hidden\" value=\"";
  if (stack1 = helpers.search_request) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.search_request; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n  <span class=\"text T\">";
  if (stack1 = helpers.name_en) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name_en; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n\n";
  return buffer;
  })

});