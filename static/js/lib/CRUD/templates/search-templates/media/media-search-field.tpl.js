define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " multiple=\"";
  if (stack1 = helpers.multiple) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.multiple; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

  buffer += "<div id=\"video-edit-preview\"></div>\n<label>";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n<div class=\"search\">\n  <input type=\"text\" class=\"with-clear\">\n  <button class=\"do-clear\">\n    <span>✓</span>\n  </button>\n  <button class=\"do-search do-search-embedded medias\">\n    <span>Search</span>\n  </button>\n</div>\n\n<ul class=\"media\"></ul>\n\n<button class=\"do-upload upload-media\">\n  <span>Upload New Media</span>\n</button>\n<select ";
  stack1 = helpers['if'].call(depth0, depth0.multiple, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"media-added-field\"\n  class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field hidden\"></select>\n";
  return buffer;
  })

});