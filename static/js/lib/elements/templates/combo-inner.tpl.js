define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n    <span aria-hidden=\"true\" data-icon=\"Y\" class=\"delete-saved-search\"></span>\n    <span class=\"screen-reader-text\">Delete Saved search</span>\n  ";
  }

  buffer += "<input type=\"hidden\" value=\"";
  if (stack1 = helpers.search_request) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.search_request; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n<span class=\"text T\">\n  <span class=\"select-search\">\n    ";
  if (stack1 = helpers.name_en) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name_en; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n  </span>\n  ";
  options = {hash:{
    'compare': ("predefined_search")
  },inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.if_eq || depth0.if_eq),stack1 ? stack1.call(depth0, depth0.search_request, options) : helperMissing.call(depth0, "if_eq", depth0.search_request, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</span>\n\n";
  return buffer;
  })

});