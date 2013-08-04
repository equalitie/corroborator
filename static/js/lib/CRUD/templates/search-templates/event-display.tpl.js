define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"actions\">\n  <button class=\"do-edit is-small\">\n  <span class=\"text T\">Edit</span>\n  </button>\n  <button class=\"do-remove is-small\">\n  <span class=\"text T\">Remove</span>\n  </button>\n</div>\n<div class=\"content\">\n  <div class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.event_name_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  <div class=\"time\">\n  from \n  <span class=\"start\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.time_from)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> to  \n  <span class=\"end\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.time_to)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </div>\n</div>\n<div class=\"clearer\">&nbsp;</div>\n";
  return buffer;
  })

});