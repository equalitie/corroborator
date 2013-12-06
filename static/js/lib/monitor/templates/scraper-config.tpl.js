define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<table>\n  <tr>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.scraper)),stack1 == null || stack1 === false ? stack1 : stack1.Scraper)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td><input id=\"scraper1\" type=\"checkbox\" name=\"\"></td>\n  </tr>\n</table>\n\n";
  return buffer;
  })

});