define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div data-wireframe=\"incident-view\" class=\"incident-overlay overlay WIREFRAME\">\n  <div class=\"header\">\n    <button class=\"do-hide is-small\">\n      <span class=\"T\">close</span>\n    </button>\n  </div>\n  <div id=\"view-placeholder-incident\" class=\"body\" style=\"bottom: 46px;\">\n    <form id=\"incident_form\" class=\"incident_form\">\n      <div class=\"Incident in-preview is-edited\">\n        <div class=\"Incident is-edited\">\n          <div class=\"col first span-66p hidden incident-expanded-edit\">\n            <div id=\"incident-header-expand\" class=\"header\">\n              <div id=\"incident-title-expand\" class=\"field is-title\">\n                <label>Title</label>\n              </div>\n            </div>\n            <div id=\"incident-body-expand\" class=\"body\"> </div>\n          </div>\n          <div class=\"col last span-33p hidden incident-expanded-edit\">\n          <div id=\"incident-goup-expand\" class=\"body\">\n\n          </div>\n          </div>\n\n\n          <div id=\"incident-id-block-ne\" class=\"header incident-not-expanded-edit\">\n\n            <h2 class=\"title\">\n              <label>Title\n                <span id=\"incident-title-block\" class=\"i18n with-en with-ar\">\n                <div lang=\"en\">\n                  <textarea \n                    id=\"incident_title_en\"\n                    type=\"text\"\n                    name=\"title_en\"\n                    class=\"incident-field\n                    w-100p\"></textarea>\n                </div>\n                <div lang=\"ar\">\n                  <textarea \n                    id=\"incident_title_ar\"\n                    name=\"title_ar\"\n                    type=\"text\"\n                    class=\"incident-field\n                    w-100p\"></textarea>\n                </div>\n                <span class=\"toggle\"><span lang=\"en\">EN</span><span lang=\"ar\">AR</span></span>\n                </span>\n              </label>\n            </h2>\n          </div>\n          <div id=\"incident-group-block-ne\" class=\"body incident-not-expanded-edit\">\n            <div id=\"incident-group-block\" class=\"group details\">\n              <div class=\"field clear-after\">\n\n                <!-- score slider -->\n                <div id=\"incident-score-block\" class=\"is-score right\">\n                  <label>Reliability Score</label>\n                  <span class=\"score\">\n\n                    <span id=\"incident_confidence_score\" class=\"value\">0</span>\n                    <input type=\"hidden\" class=\"incident-field\" name=\"confidence_score\" value=\"0\">\n\n\n                    <div class=\"score-editor\">\n                      <div class=\"rail\">\n                        <div class=\"slider\"></div>  \n                        <!-- <div class=\"cursor\">&nbsp;</div> -->\n                        <div class=\"axis\">\n                          <div class=\"start\">\n                            <span class=\"label\">0%</span>\n                          </div>\n                          <div class=\"middle\">\n                            <span class=\"label\">50%</span>\n                          </div>\n                          <div class=\"end\">\n                            <span class=\"label\">100%</span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </span>\n                </div>\n                \n                <!-- Assigned to user -->\n                <div id=\"incident-assignment-block\" class=\"incidentAssigned left\">\n                  <label>Assigned to</label>\n\n                  <input type=\"text\" class=\"with-clear is-assigned-to\" value=\"\">\n                  <input type=\"hidden\" name=\"assigned_user\" value=\"\">\n\n                <button id=\"clear-user\" class=\"do-clear\">\n                  <span>✓</span>\n                </button>\n                </div>\n\n                <div class=\"clearer\">&nbsp;</div>\n\n                <!-- incident labels -->\n                <div id=\"incident-label-block\" class=\"field is-tags\">\n                </div>\n\n                <!-- Incident Crimes -->\n                <div id=\"incident-crime-block\" class=\"field is-crimes\">\n                  <label>Crime</label>\n                  <ul class=\"crimes editor\">\n\n                    <li class=\"crime is-new\">\n                      <input type=\"text\" value=\"Crime\" class=\"with-select crimes-ac\">\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n            <!-- comments -->\n            <div id=\"incident-comment-block\" class=\"field is-comments\">\n            </div>\n\n            <!-- events -->\n            <div id=\"incident-event-block\" class=\"field is-events clear\">\n            </div>\n\n            <!-- Locations -->\n            <div id=\"incident-location-block\" class=\"field is-locations\">\n            </div>\n\n            <!-- Description -->\n            <div id=\"incident-description-block\" class=\"field is-description\">\n            <label>Description</label>\n            <div class=\"i18n with-en with-ar\">\n                <div lang=\"en\">\n                  <textarea \n                    id=\"description_en\"\n                    name=\"description_en\"\n                    class=\"incident-field w-100p\"></textarea>\n                </div>\n                <div lang=\"ar\">\n                  <textarea \n                    id=\"description_ar\"\n                    name=\"description_ar\"\n                    class=\"incident-field w-100p\"></textarea>\n                </div>\n            <span class=\"toggle\">\n            <span lang=\"en\">EN</span><span lang=\"ar\">AR</span>\n            </span>\n            </div>\n            </div>\n\n            <!-- Actor selection -->\n          <div id=\"incident-actor-list-block\" class=\"field is-actors\">\n          </div>\n\n          <div id=\"incident-bulletin-block\" class=\"field is-bulletins\">\n          </div>\n          <div id=\"incident-incident-block\" class=\"field is-incidents\">\n          </div>\n          </div>\n        </div>\n\n      </div>\n    </form>\n  </div>\n  <div class=\"footer actions\">\n    <div class=\"left\">\n      <div class=\"when-overlay-expanded\">\n        <button class=\"do-collapse\">\n          <span class=\"text T\">Collapse »</span>\n        </button>\n      </div>\n      <div class=\"when-overlay-not_expanded\">\n        <button class=\"do-expand\">\n          <span class=\"text T\">« Expand</span>\n        </button>\n      </div>\n    </div>\n    <div class=\"right\">\n    <span id=\"incident_action_result\" class=\"hidden\">\n    Result saved successfully.\n    </span>\n\n    <!--              <button class=\"do-select\">\n    <span class=\"text T\">Select</span>\n    </button> -->\n    <button id=\"incident-action_cancel\" class=\"hidden do-hide default\">\n    <span class=\"text T\">Cancel</span>\n    </button>\n\n    <button id=\"incident-action_save\" class=\"do-select default\">\n    <span class=\"text T\">Save</span>\n    </button>\n    <button id=\"incident-action_edit\" class=\"do-select default hidden\">\n    <span class=\"text T\">Edit</span>\n    </button>\n\n    </div>\n  </div>\n</div>\n";
  })

});