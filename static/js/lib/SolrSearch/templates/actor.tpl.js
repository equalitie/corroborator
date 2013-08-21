define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <div class=\"avatar\"><img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_thumb)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\"actor avatar\"></div>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n          <div class=\"avatar\">&nbsp;</div>\n        ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <p class=\"sex\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n            ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age_en), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "\n                <p class=\"age\">,&nbsp;</p>\n              ";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"age\"> "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n            ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <p class=\"aka\">aka «"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "»</p>\n            ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                lives in\n                <span class=\"location\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fetchLocation || depth0.fetchLocation),stack1 ? stack1.call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), options) : helperMissing.call(depth0, "fetchLocation", ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), options)));
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " </span>\n              ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return ", ";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <span class='works-as'>\n              works as a \n                <span class=\"occupation\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> \n              </span>\n              ";
  return buffer;
  }

  buffer += "  <div class=\"Actor in-list search-results\">\n    <div class=\"is-selector ";
  if (stack1 = helpers.pos) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n      <input type=\"checkbox\" "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.checked)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ">\n    </div>\n      <a href=\"#actor/"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <div class=\"actor-content\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_thumb), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <div class=\"content\">\n          <div class=\"L1\">\n            <p class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age_en), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          </div>\n\n          <div class=\"L2\">\n            <br/>\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          </div>\n          <div class=\"actor-summary\">\n            <div class=\"L3\">\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.current_location), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n              <br>involved in <span class=\"incidents-count\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_incidents)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " incidents</span>\n            </div>\n          </div>\n       </div> \n     </div>\n   </a>\n  </div>\n";
  return buffer;
  })

});