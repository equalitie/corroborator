define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <span class=\"actors\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        ";
  options = {hash:{
    'word': ("actor"),
    'numItems': (((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors)),stack1 == null || stack1 === false ? stack1 : stack1.length))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.pluralise || depth0.pluralise),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "pluralise", options)))
    + " "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.results)),stack1 == null || stack1 === false ? stack1 : stack1.involved)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </span> \n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n          "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.results)),stack1 == null || stack1 === false ? stack1 : stack1['in'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n          ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.commaSeparatedList || depth0.commaSeparatedList),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_locations), options) : helperMissing.call(depth0, "commaSeparatedList", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_locations), options)))
    + "\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <span class=\"status\">\n        <span class=\"text\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_incident)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </span>\n    ";
  return buffer;
  }

  buffer += "  <td class=\"is-selector\">\n    <input type=\"checkbox\" "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.checked)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ">\n  </td>\n  <td class=\"is-preview\">&nbsp;</td>\n  <td class=\"is-description\">\n    <a href=\"#incident/"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <div class=\"title text i18n\">\n         \n        <div lang=\"en\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div lang=\"ar\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <span class=\"toggle\">\n          <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n        </span>\n      </div>\n      <div class=\"meta text\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n      <div class=\"details text\">\n        <span class=\"date\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormat || depth0.dateFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_created), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_created), options)))
    + "</span>\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.locations), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n    </a>\n  </td>\n  <td class=\"is-status\">\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_incident), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </td>\n  <td class=\"is-score\">\n    <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </td>\n";
  return buffer;
  })

});