define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "  <td class=\"is-selector\">\n    <input type=\"checkbox\" "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.checked)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ">\n  </td>\n  <td class=\"is-preview\">&nbsp;</td>\n  <td class=\"is-description\">\n    <a href=\"#bulletin/0\">\n      <div class=\"title text i18n\">\n        <span lang=\"en\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span lang=\"ar\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"toggle\">\n          <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n        </span>\n      </div>\n      <div class=\"meta text\">\n        <span class=\"actors\">";
  if (stack2 = helpers.total) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.total; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span> actors involved\n      </div>\n      <div class=\"details text\">\n        <span class=\"date\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_created)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> in <span class=\"location\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.location)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> (<span class=\"sources\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sources)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)\n      </div>\n    </a>\n    </td>\n    <td class=\"is-status\">\n    <span class=\"status\">\n    <span class=\"text\">reviewed</span>\n    </span>\n    </td>\n  <td class=\"is-score\">\n  <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </td>\n";
  return buffer;
  })

});