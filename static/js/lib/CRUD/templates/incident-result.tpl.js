define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"Incident in-list\">\n  <div class=\"L1\">\n    <div class=\"meta\">\n      <div class=\"score\">\n        <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n      <div class=\"status\">\n        <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n    </div>\n    <div class=\"title i18n\">\n      <span lang=\"en\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      <span lang=\"ar\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      <span class=\"toggle\">\n        <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n      </span>\n    </div>\n  </div>\n  <div class=\"L3\">\n    <div class=\"date-location\">\n      <span class=\"date\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormat || depth0.dateFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_created), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_created), options)))
    + "</span> in <span class=\"location\">Damas, Syriah</span>\n    </div>\n  </div>\n</div>\n";
  return buffer;
  })

});