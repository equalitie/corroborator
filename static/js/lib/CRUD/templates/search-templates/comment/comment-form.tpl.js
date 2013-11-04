define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!-- Comment status field  dropdown should match others -->\n<div class=\"clearer\"></div>\n<!-- Comment content field -->\n<div class=\"add\">\n\n  <div class=\"i18n with-en with-ar\">\n      <div lang=\"en\">\n      <label>Comment</label>\n        <textarea \n          id=\"comments_en\"\n          name=\"comments_en\"\n          class=\"comment-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.comments_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n      </div>\n      <div lang=\"ar\">\n        <textarea \n          id=\"comments_ar\"\n          name=\"comments_ar\"\n          class=\"comment-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.comments_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n      </div>\n  <span class=\"toggle\">\n  <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n  </span>\n  </div>\n\n\n\n</div>\n\n\n<button class=\"do-addComment\">\n  <span class=\"T\">Save comment</span>\n</button>\n";
  return buffer;
  })

});