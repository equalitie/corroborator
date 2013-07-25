define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "  <div class=\"span-70p\">\n    <label>Description</label><br>\n    <input type=\"text\" name=\"event_name_en\" class=\"w-100p ";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field bulletin_event-description\">\n  </div>\n  <div class=\"clearer\">&nbsp;</div>\n  <div class=\"span-70p\">\n    <label>Comment</label><br>\n    <textarea class=\"w-100p bulletin_event-comment ";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field\"></textarea>\n  </div>\n  <div class=\"clearer\">&nbsp;</div>\n  <div class=\"span-70p\">\n    <span class=\"score\">\n      <span class=\"bulletin_event-cscore value\"></span>\n      <input type=\"hidden\" name=\"confidence_score\" value=\"\" class=\"";
  if (stack1 = helpers.entityType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.entityType; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "-field\">\n    </span>\n    <!-- Reliability score slider -->\n    <label>Reliability score</label>\n    <div class=\"score-editor\">\n      <div class=\"rail\">\n        <div class=\"slider\">\n        </div>  \n      <!-- <div class=\"cursor\">&nbsp;</div> -->\n        <div class=\"axis\">\n          <div class=\"start\">\n            <span class=\"label\">0%</span>\n          </div>\n          <div class=\"middle\">\n            <span class=\"label\">50%</span>\n          </div>\n          <div class=\"end\">\n            <span class=\"label\">100%</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"clearer\">&nbsp;</div>\n  <div class=\"event-time-range\">\n  </div>\n  <div class=\"span-30p\">\n    <label></label><br/>\n    <div class=\"pad\">\n      <button class=\"do-addEvent\">\n        <span class=\"T\">Add Event</span>\n      </button>\n    </div>\n  </div>\n  <div class=\"clearer\">&nbsp;</div>\n";
  return buffer;
  })

});