define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n      <div class=\"is-sources group\">\n        <h4>Sources</h4>\n        <div class=\"value\">\n          ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.sourceList || depth0.sourceList),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_sources), options) : helperMissing.call(depth0, "sourceList", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_sources), options)))
    + "\n        </div>\n      </div>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n      <div class=\"is-media group\">\n        <h4>Media</h4>\n        <div class=\"preview\"></div>\n        <ul class=\"media\">\n          <li count=\"5\" class=\"medium REPEAT\">\n            <span class=\"type\">Photo</span>\n            <span class=\"date\">2013/Apr/21</span>\n          </li><li class=\"medium\">\n            <span class=\"type\">Photo</span>\n            <span class=\"date\">2013/Apr/21</span>\n          </li><li class=\"medium\">\n            <span class=\"type\">Photo</span>\n            <span class=\"date\">2013/Apr/21</span>\n          </li><li class=\"medium\">\n            <span class=\"type\">Photo</span>\n            <span class=\"date\">2013/Apr/21</span>\n          </li><li class=\"medium\">\n            <span class=\"type\">Photo</span>\n            <span class=\"date\">2013/Apr/21</span>\n          </li>\n        </ul>\n        <div class=\"clearer\"></div>\n      </div>\n      ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"is-description group\">\n        <h4>Description</h4>\n        <div class=\"description\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n      ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n      <div class=\"is-actors group\">\n        <div class=\"clearer\"></div>\n      </div>\n      ";
  }

function program9(depth0,data) {
  
  
  return "\n      <div class=\"is-bulletins group\">\n      </div>\n      ";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"is-status group\">\n          <h4>Update status</h4>\n          <div class=\"status\">\n            <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_bulletin)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </div>\n        </div>\n        ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n            <span class=\"value\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchUser || depth0.fetchUser),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), options) : helperMissing.call(depth0, "fetchUser", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), options)))
    + "</span>\n            ";
  return buffer;
  }

function program15(depth0,data) {
  
  
  return "\n            <span class=\"value\">Unassigned</span>\n            ";
  }

function program17(depth0,data) {
  
  
  return "\n      <div class=\"is-events group\">\n      </div>\n      ";
  }

function program19(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <div class=\"is-locations group\">\n        <h4>Locations</h4>\n        <div class=\"locations\">\n          <div class=\"map\"></div>\n          ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_locations), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n      </div>\n      ";
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div class=\"location\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</div>\n          ";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <li class=\"tag\">\n            <span class=\"text\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\n          </li>\n          ";
  return buffer;
  }

  buffer += "<div class=\"Bulletin in-view is-expanded\">\n  <div class=\"header\">\n    <span class=\"id\">\n      ID <span class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.django_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </span>\n    <h2 class=\"title\">\n    <span class=\"i18n with-en with-ar\">\n    <span lang=\"en\" class=\"text\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <span lang=\"ar\" class=\"text\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <span class=\"toggle\"><span lang=\"en\">EN</span><span lang=\"ar\">AR</span></span></span></h2>\n  </div>\n  <div class=\"span-66p\">\n    <div class=\"body\">\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_sources), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.medias), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors_role), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ref_bulletins), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n  </div>\n  <!-- end left column -->\n\n  <!-- start right column -->\n  <div class=\"span-33p\">\n    <div class=\"body\">\n      <div class=\"group\">\n        <div class=\"is-score group\">\n          <h4>Confidence</h4>\n          <div class=\"score\">\n            <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </div>\n        </div>\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.most_recent_status_bulletin), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <div class=\"is-assigned-to group\">\n          <h4>Assigned to</h4>\n          <div class=\"assigned-to\">\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user), {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n          </div>\n        </div>\n        <div class=\"clearer\"></div>\n      </div>\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.times), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.locations), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <div class=\"is-tags group\">\n        <h4>Labels</h4>\n        <ul class=\"tags\">\n          ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_labels), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </ul>\n      </div>\n    </div>\n  </div>\n  <div class=\"clearer\"></div>\n</div>\n";
  return buffer;
  })

});