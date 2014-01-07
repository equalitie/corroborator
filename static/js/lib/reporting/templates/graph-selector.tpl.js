define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <option value=\"status\">"
    + escapeExpression(((stack1 = depth0.label),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n  ";
  return buffer;
  }

  buffer += "<div class=\"filter\">\n  <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.filters)),stack1 == null || stack1 === false ? stack1 : stack1.bulletins_by)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n  <select id=\"\" name=\"\">\n  ";
  stack2 = helpers.each.call(depth0, depth0.collection, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</div>\n";
  return buffer;
  })

});