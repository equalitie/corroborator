define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <option value=\"";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n        ";
  return buffer;
  }

  buffer += "<div class=\"Application\" lang=\"en\">\n  <div class=\"message-text\">\n    <p class=\"server fail message\">Upload Failed - Problem contacting server</p>\n    <p class=\"file fail message\">No file attached</p>\n    <p class=\"success message\"> Media uploaded successfully </p>\n  </div>\n  <div class=\"media-progressbar\"></div>\n  <form \n    method=\"post\"\n    class=\"media-form\">\n    <!--enctype=\"multipart/form-data\"-->\n    <div class=\"field\">\n      <label>file label</label>\n      <div class=\"i18n with-en with-ar\">\n        <div lang=\"en\">\n          <input type=\"text\" name=\"name_en\"\n            value=\"\" class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field w-100p\" />\n        </div>\n        <div lang=\"ar\">\n          <input type=\"text\" name=\"name_ar\" id=\"fullname_ar\"\n          value=\"\" class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field w-100p\" />\n        </div>\n        <span class=\"toggle\">\n          <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n        </span>\n      </div>\n    </div>\n    <div class=\"field\">\n      <label>file type</label>\n      <select name=\"media_type\" id=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-media_type\"\n        class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field\">\n        ";
  stack1 = helpers.each.call(depth0, depth0.mediaTypes, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </select>\n    </div>\n    <div class=\"field\">\n      <label>file upload</label>\n      <input id=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-file-upload\"\n        name=\"media_file\" type=\"file\" \n        class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field\" />\n      <input type=\"submit\" value=\"Attach File Details\"  class=\"hidden\" />\n    </div>\n  </form>\n</div>\n";
  return buffer;
  })

});