define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <span class=\"id\">\n            ID <span id=\"view-actor-id\" class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          </span>\n          ";
  return buffer;
  }

  buffer += "  <div class=\"header\">\n    <button class=\"do-hide is-small\">\n      <span class=\"T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.close)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </button>\n  </div>\n  <div class=\"body\" style=\"bottom: 49px;\">\n    <div class=\"Bulletin is-edited is-expanded\">\n      <div class=\"first span-66p\">\n        <div class=\"header\">\n          ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          <div class=\"field is-title\">\n            <label>Title</label>\n            <span class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <textarea type=\"text\" class=\"w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.title_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n              </div>\n              <div lang=\"ar\">\n                <textarea type=\"text\" class=\"w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.mdoel),stack1 == null || stack1 === false ? stack1 : stack1.title_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n              </span>\n            </span>\n          </div>\n        </div>\n        <div class=\"body\">\n\n          <!-- Sources field -->\n          <div id=\"bulletin-source-block\" class=\"field is-sources\">\n          </div>\n\n          <div id=\"bulletin-media-block\" class=\"field is-media\">\n          </div>\n        \n          <!-- description -->\n          <div id=\"bulletin-description-block\" class=\"field is-description\">\n            <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <div class=\"i18n with-en with-ar\">\n              <div lang=\"en\">\n                <textarea id=\"bulletin_description_en\"\n                          name=\"bulletin_description_en\"\n                          type=\"text\"\n                          class=\"bulletin-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n              </div>\n              <div lang=\"ar\">\n                <textarea id=\"bulletin_description_ar\"\n                          name=\"bulletin_description_ar\"\n                          type=\"text\"\n                          class=\"bulletin-field w-100p\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.description_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n              </div>\n              <span class=\"toggle\">\n                <span lang=\"en\">EN</span>\n                <span lang=\"ar\">AR</span>\n              </span>\n            </div>\n          </div>\n\n          <!-- Related Actors -->\n          <div id=\"bulletin-actor-list-block\" class=\"field is-actors\">\n          </div>\n\n          <!-- Related bulletins -->\n          <div id=\"bulletin-bulletin-block\" class=\"field is-bulletins\">\n          </div>\n\n        </div>\n      </div>\n      <!-- end first col -->\n      <div class=\"last span-33p\">\n        <div class=\"body\">\n          <div class=\"group details\">\n            <div class=\"field clear-after\">\n\n              <!-- score slider -->\n              <div id=\"bulletin-score-block\" class=\"is-score right\">\n                <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n                <div class=\"score\">\n\n                  <span id=\"bulletin_confidence_score\" class=\"value\">0</span>\n                  <input type=\"hidden\" \n                         name=\"confidence_score\"\n                         value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.confidence_score)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                         class=\"bulletin-field\">\n\n                  <div class=\"score-editor\">\n\n                    <div class=\"rail\">\n                      <div class=\"slider\">\n                      </a>\n                      </div>  \n                      <!-- <div class=\"cursor\">&nbsp;</div> -->\n                      <div class=\"axis\">\n                        <div class=\"start\">\n                          <span class=\"label\">0%</span>\n                        </div>\n                        <div class=\"middle\">\n                          <span class=\"label\">50%</span>\n                        </div>\n                        <div class=\"end\">\n                          <span class=\"label\">100%</span>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <!-- end score slider -->\n\n\n            <!-- Assigned to field name='assigned_user' -->\n              <div id=\"bulletin-assignment-block\" class=\"bulletinAssigned  left\">\n                <label>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Assigned_to)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n\n                <input type=\"text\" class=\"with-clear is-assigned-to\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_assigned_user)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <input type=\"hidden\" \n                       name=\"assigned_user\"\n                       value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.assigned_user)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\n                       class=\"bulletin-field\" >\n\n              <button id=\"clear-user\" class=\"do-clear\">\n                <span>✓</span>\n              </button>\n              </div>\n              <!-- end assigned_user -->\n\n            </div>\n          </div>\n\n          <!-- Event block -->\n          <div id=\"bulletin-event-block\" class=\"field is-events clear\">\n          </div>\n\n          <!-- location block -->\n          <div id=\"bulletin-location-block\" class=\"field is-locations\">\n          </div>\n\n          <!-- map block -->\n          <div id=\"bulletin-map-block\" class=\"is-bulletin-map field\"></div>\n\n          <!-- Labels field -->\n          <div id=\"bulletin-label-block\" class=\"field is-tags\">\n          </div>\n\n        </div>\n      </div>\n      <div class=\"clearer\"></div>\n    </div>\n  </div>\n  <div class=\"footer with-revision\">\n    <div class=\"actions when-revision hidden Revision-editor clear-after\">\n      <div class=\"col first span-33p\">\n        <div class=\"body\">\n          <div class=\"field is-revision\">\n            <label for=\"revision\" class=\"T\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.bulletin)),stack1 == null || stack1 === false ? stack1 : stack1.Revision)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <div class=\"revision clear-after w-100p\">\n              <span class=\"number\">3</span>\n              <span>by John Doe, March 24th 2013</span>\n            </div>\n          </div>\n          <div class=\"field is-changed\">\n            <label>Changed</label>\n            <ul class=\"changed as-list\">\n              <li class=\"changed\">\n                <span class=\"text T\">Title</span>\n              </li>\n              <li class=\"changed\">\n                <span class=\"text T\">Date</span>\n              </li>\n              <li class=\"changed\">\n                <span class=\"text T\">Labels</span>\n              </li>\n              <li class=\"changed\">\n                <span class=\"text T\">Bulletins</span>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n      <div class=\"col last span-66p\">\n        <div class=\"body\">\n          <div class=\"field is-description\">\n            <label for=\"description\" class=\"T\">Changes Description</label>\n            <div class=\"textarea\">\n              <textarea class=\"w-100p\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</textarea>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"actions clear-after when-not_revision\">\n      <div class=\"left\">\n        <div class=\"when-overlay-expanded\">\n          <button class=\"do-collapse-form\">\n            <span class=\"text t\">» collapse</span>\n          </button>\n        </div>\n        <div class=\"when-overlay-not_expanded\">\n          <button class=\"do-expand-form\">\n            <span class=\"text t\">« expand</span>\n          </button>\n        </div>\n      </div>\n      <div class=\"right\">\n        <button id=\"bulletin-action_save\" class=\"do-select do-toggleRevision default\">\n          <span class=\"text t\">Save changes</span>\n        </button>\n      </div>\n    </div>\n  </div>\n";
  return buffer;
  })

});