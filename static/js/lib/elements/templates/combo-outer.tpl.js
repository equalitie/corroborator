define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['combo-outer.tpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"button combo do-search is-default\">\n  <span class=\"combo-main T selected-option\">";
  if (stack1 = helpers.search_request) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.search_request; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n  <ul class=\"options\" id=\"predefined_options\">\n    <!--\n       -<li id=\"show_save_current_search\" class=\"option selected\">\n       -  <span class=\"text T\">Save current seach...</span>\n       -</li>\n       -->\n  </ul>\n</div>\n";
  return buffer;
  });
});