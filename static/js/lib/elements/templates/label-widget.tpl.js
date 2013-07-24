define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label>";
  if (stack1 = helpers.field_label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.field_label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n<ul class=\"";
  if (stack1 = helpers.field_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.field_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " tags editor\">\n\n  <li class=\"";
  if (stack1 = helpers.field_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.field_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " is-new\">\n  <input type=\"text\" placeholder=\"";
  if (stack1 = helpers.field_label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.field_label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  </li>\n</ul>\n<select multiple=\"true\" name=\"";
  if (stack1 = helpers.field_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.field_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"hidden\">\n</select>\n\n";
  return buffer;
  })

});