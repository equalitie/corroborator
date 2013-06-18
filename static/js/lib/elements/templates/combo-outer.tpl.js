define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['combo-outer.tpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"button combo do-search is-default\">\n  <span class=\"combo-main T selected-option\">";
  if (stack1 = helpers.name_en) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name_en; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n  <ul class=\"options\" id=\"predefined_options\">\n  </ul>\n</div>\n";
  return buffer;
  });
});