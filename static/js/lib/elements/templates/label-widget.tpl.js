define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label>"
    + escapeExpression(((stack1 = ((stack1 = depth0.display),stack1 == null || stack1 === false ? stack1 : stack1.field_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n<ul class=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.display),stack1 == null || stack1 === false ? stack1 : stack1.field_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " tags editor\">\n\n  <li class=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.display),stack1 == null || stack1 === false ? stack1 : stack1.field_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " is-new\">\n  <input type=\"text\" placeholder=\"";
  if (stack2 = helpers.field_label) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.field_label; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n  </li>\n</ul>\n<select multiple=\"true\" name=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.display),stack1 == null || stack1 === false ? stack1 : stack1.field_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"hidden ";
  if (stack2 = helpers.entityType) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.entityType; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-field\">\n  <option selected value=\"\"></option>\n</select>\n\n";
  return buffer;
  })

});