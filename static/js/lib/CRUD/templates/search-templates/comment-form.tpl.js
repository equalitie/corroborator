define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- Comment status field  dropdown should match others -->\n<div id=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-status-block\" class=\"add\">\n  <label>Status</label><br/>\n  <select name=\"status\" \n          id=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "_status\" \n          class=\"comment-field\">\n    <option selected value=\"\">Select Status</option>\n  </select>\n</div>\n\n<div class=\"clearer\"></div>\n<!-- Comment content field -->\n<div class=\"add\">\n  <label>Comment</label><br/>\n  <textarea class=\"w-100p comment-comment comment-field\"\n            name=\"comments_en\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.comments_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n</div>\n<button class=\"do-addComment\">\n  <span class=\"T\">Save comment</span>\n</button>\n";
  return buffer;
  })

});