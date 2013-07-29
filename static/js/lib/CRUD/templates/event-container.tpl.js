define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<label>Events</label>\n<div class=\"date-duration\">\n\n</div>\n<ul class=\"events \">\n  <li class=\"event event-form is-new\">\n  </li>\n</ul>\n<select name=\"times\" multiple=\"true\" class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field hidden\">\n  <option value=\"\"></option>\n</select>\n";
  return buffer;
  })

});