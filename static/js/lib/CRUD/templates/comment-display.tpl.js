define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "  <div class=\"actions\">\n    <button class=\"do-edit-comment is-small\">\n      <span class=\"text T\">Edit</span>\n    </button>\n    <button class=\"do-remove is-small\">\n      <span class=\"text T\">Remove</span>\n    </button>\n  </div>\n  <div class=\"content\">\n  <div class=\"text T\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.comment_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"meta\">\n      <span class=\"created\"> "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.comment_created)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      by <span class=\"who\"> cormac</span>\n    <span class=\"bulletin_comment_status\"> - "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </div>\n  </div>\n  <div class=\"clearer\"> &nbsp;</div>\n";
  return buffer;
  })

});