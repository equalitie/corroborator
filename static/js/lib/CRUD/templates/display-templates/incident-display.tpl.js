define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"status\">\n        <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        , in <span class=\"location\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.location)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <ul class=\"tags group\">\n      ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_labels), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </ul>\n    ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <li class=\"tag\"> <span class=\"text\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span> </li>\n      ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"description\">\n      <h3>Description</h3>\n      "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_details_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </div>\n    ";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "\n    <div class=\"comments\">\n      <h3>Comments</h3>\n      <div class=\"comments-list\">\n        <div class=\"comment\">\n          <div class=\"text\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue enim sed lacus congue id feugiat nisl vestibulum. Sed suscipit ipsum vel diam consequa</div>\n          <div class=\"meta-history\">\n            <span class=\"date\">2013-05-03 15:35</span> by <span class=\"who\">Martin Scholls</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    ";
  }

function program12(depth0,data) {
  
  
  return "\n      <div class=\"actors group\">\n        <h3>Related actors</h3>\n        <ul class=\"elements\">\n        </ul>\n      </div>\n    ";
  }

function program14(depth0,data) {
  
  
  return "\n      <div class=\"incidents group\">\n        <h3>Incidents</h3>\n        <ul class=\"elements\">\n        </ul>\n      </div>\n    ";
  }

function program16(depth0,data) {
  
  
  return "\n    <div class=\"bulletins group\">\n      <h3>Bulletins</h3>\n      <ul class=\"elements\">\n      </ul>\n    </div>\n    ";
  }

  buffer += "<div class=\"Incident in-view\">\n  <div class=\"header\">\n    <span class=\"id\">\n      ID <span class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.django_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </span>\n    <h2 class=\"title\">\n      <span class=\"i18n with-en with-ar\">\n        <span lang=\"en\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span lang=\"ar\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"toggle\"><span lang=\"en\">EN</span><span lang=\"ar\">AR</span></span></span></h2>\n    <div class=\"group details\">\n      <div class=\"assigned-to\">\n        <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_assigned_user)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n      <div class=\"score\">\n        <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.status), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <div class=\"date-location\">\n        <span class=\"date\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dateFormat || depth0.dateFormat),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_created), options) : helperMissing.call(depth0, "dateFormat", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_created), options)))
    + "</span>\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.location), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n\n    </div>\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_labels), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n\n  <div class=\"body\">\n    <div class=\"media\">\n      <div class=\"placeholder\">&nbsp;</div>\n    </div>\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_details_en), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.incident_comments), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <!-- end comments -->\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors_role), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ref_incidents), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ref_bulletins), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n</div>\n";
  return buffer;
  })

});