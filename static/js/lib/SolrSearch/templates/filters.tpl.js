define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<th class=\"is-selector\">&nbsp;</th>\n<th class=\"is-preview\">&nbsp;</th>\n<th class=\"is-description sort-header\">\n  <a href=\"#\" class=\"T current date is-descending\">date</a>\n  <a href=\"#\" class=\"T ";
  if (stack1 = helpers.variableFilter) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.variableFilter; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.variableFilter) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.variableFilter; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n  <a href=\"#\" class=\"T title\">title</a>\n</th>\n<th class=\"is-status sort-header\">\n  <a href=\"#\" class=\"T sort-status\">status</a>\n</th>\n<th class=\"is-score sort-header\">\n  <a href=\"#\" class=\"T sort-score\">score</a>\n</th>\n\n";
  return buffer;
  })

});