define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += " <h3>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.comments)),stack1 == null || stack1 === false ? stack1 : stack1.comments)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n <div class=\"comments-list\">\n </div>\n";
  return buffer;
  })

});