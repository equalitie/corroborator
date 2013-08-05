define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div data-wireframe=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-view\" class=\"overlay WIREFRAME\">\n  <div class=\"header\">\n    <button class=\"do-hide is-small\">\n      <span class=\"T\">hide</span>\n    </button>\n  </div>\n  <div class=\"body\" style=\"bottom: 49px;\">\n  </div>\n  <div class=\"footer actions\">\n    <div class=\"left\">\n      <div class=\"when-overlay-expanded\">\n        <button class=\"do-collapse\">\n          <span class=\"text T\">Collapse »</span>\n        </button>\n      </div>\n      <div class=\"when-overlay-not_expanded\">\n        <button class=\"do-expand\">\n          <span class=\"text T\">« Expand</span>\n        </button>\n      </div>\n    </div>\n    <div class=\"right\">\n      <button class=\"do-select\">\n        <span class=\"text T\">Select</span>\n      </button>\n      <button class=\"do-select edit default\">\n        <span class=\"text T\">Edit</span>\n      </button>\n    </div>\n  </div>\n</div>\n";
  return buffer;
  })

});