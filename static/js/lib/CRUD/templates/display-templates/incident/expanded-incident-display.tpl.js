define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <div class=\"is-crimes group\">\n        <h4>Crimes</h4>\n        <ul class=\"crimes\">\n          ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_crimes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </ul>\n      </div>\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <li class=\"crime\">\n            <span class=\"text\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\n          </li>\n          ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"is-description group\">\n        <h4>Description</h4>\n        <div class=\"description\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n      ";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "\n      <div class=\"comments group\">\n      </div>\n      ";
  }

function program8(depth0,data) {
  
  
  return "\n      <div class=\"is-actors group\">\n      </div>\n      ";
  }

function program10(depth0,data) {
  
  
  return "\n      <div class=\"is-bulletins group\">\n      </div>\n      ";
  }

function program12(depth0,data) {
  
  
  return "\n      <div class=\"is-incidents group\">\n      </div>\n      ";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"is-status group\">\n          <h4>Update status</h4>\n          <div class=\"status\">\n            <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.most_recent_status_incident),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </div>\n        </div>\n        ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <span class=\"value\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchUser || depth0.fetchUser),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), options) : helperMissing.call(depth0, "fetchUser", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), options)))
    + "</span>\n            ";
  return buffer;
  }

function program18(depth0,data) {
  
  
  return "\n            <span class=\"value\">Unassigned</span>\n            ";
  }

function program20(depth0,data) {
  
  
  return "\n      <div class=\"is-events group\">\n      </div>\n      ";
  }

function program22(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <div class=\"is-locations group\">\n        <h4>Locations</h4>\n        <div class=\"locations\">\n          <div class=\"map\"></div>\n          ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_locations), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n      </div>\n      ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div class=\"location\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</div>\n          ";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <div class=\"is-tags group\">\n        <h4>Labels</h4>\n        <ul class=\"tags\">\n          ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_labels), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </ul>\n      </div>\n      ";
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <li class=\"tag\">\n            <span class=\"text\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\n          </li>\n          ";
  return buffer;
  }

  buffer += "<div class=\"Incident in-view is-expanded\">\n  <div class=\"header\">\n    <span class=\"id\">\n      ID <span class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.django_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </span>\n    <h2 class=\"title\">\n    <span class=\"i18n with-en with-ar\">\n    <span lang=\"en\" class=\"text\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <span lang=\"ar\" class=\"text\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <span class=\"toggle\"><span lang=\"en\">EN</span><span lang=\"ar\">AR</span></span></span></h2>\n  </div>\n  <div class=\" span-66p\">\n    <div class=\"body\">\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_crimes), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_comments), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors_role), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ref_bulletins), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ref_incidents), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n  </div>\n  <div class=\"last span-33p\">\n    <div class=\"body\">\n      <div class=\"group\">\n        <div class=\"is-score group\">\n          <h4>Confidence</h4>\n          <div class=\"score\">\n            <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </div>\n        </div>\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.most_recent_status_incident),stack1 == null || stack1 === false ? stack1 : stack1[0]), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <div class=\"is-assigned-to group\">\n          <h4>Assigned to</h4>\n          <div class=\"assigned-to\">\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          </div>\n        </div>\n        <div class=\"clearer\"></div>\n      </div>\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.times), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_locations), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_labels), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <div class=\"is-history group\">\n      </div>\n    </div>\n  </div>\n  <div class=\"clearer\"></div>\n</div>\n";
  return buffer;
  })

});