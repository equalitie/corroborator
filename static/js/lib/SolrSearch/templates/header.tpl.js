define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['header.tpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"padding\">\n  <div class=\"Selection\">\n    <div class=\"description\">\n      <span class=\"text T\">\n        <em><span id=\"number-incidents-selected\">0</span> ";
  if (stack1 = helpers.domain) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.domain; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</em> selected\n      </span>\n    </div>\n    <div class=\"actions\">\n    </div>\n  </div>\n</div>\n\n<table class=\"incidents\">\n  <thead>\n    <tr>\n      <th class=\"is-selector\">&nbsp;</th>\n      <th class=\"is-preview\">&nbsp;</th>\n      <th class=\"is-description\">\n        <a href=\"#+mode=date\" class=\"T current is-descending\">date</a>\n        <a href=\"#+mode=location\" class=\"T\">location</a>\n        <a href=\"#+mode=title\" class=\"T\">title</a>\n      </th>\n      <th class=\"is-status\">\n        <a href=\"#+mode=status\" class=\"T\">status</a>\n      </th>\n      <th class=\"is-score\">\n        <a href=\"#+mode=score\" class=\"T\">score</a>\n      </th>\n    </tr>\n  </thead>\n</table>\n";
  return buffer;
  });
});