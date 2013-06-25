define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['actor.tpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"\">\n  <div class=\"Actor in-list\">\n    <div class=\"when-hover\">\n      <div class=\"is-selector\">\n        <input type=\"checkbox\">\n      </div>\n    </div>\n    <div class=\"avatar\">&nbsp;</div>\n    <div class=\"content\">\n      <div class=\"L1\">\n        <div class=\"status\">\n          <span class=\"value\">Victim</span>\n        </div>\n        <span class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"sex\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"age\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <div class=\"L2\">\n          <span class=\"aka\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </div>\n      </div>\n      <div class=\"when-not_expanded\">\n        <div class=\"L3\">\n          lives in <span class=\"location\"></span>, works as a <span class=\"occupation\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> \n          <br>involved in <span class=\"incidents-count\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_incidents)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " incidents</span>\n        </div>\n      </div>\n      <div class=\"when-expanded\">\n        <table class=\"details\">\n          <tbody><tr>\n            <th>Lives in</th>\n            <td>Damas</td>\n          </tr>\n          <tr>\n            <th>Born in</th>\n            <td>Damas, 1989</td>\n          </tr>\n          <tr>\n            <th>Nationality</th>\n            <td>Libanese</td>\n          </tr>\n          <tr>\n            <th>Ethnicity</th>\n            <td>Arab</td>\n          </tr>\n          <tr>\n            <th>Speaks</th>\n            <td>Arabic, English</td>\n          </tr>\n          <tr>\n            <th>Religion</th>\n            <td>Muslim</td>\n          </tr>\n        </tbody></table>\n        <div class=\"stats\">\n          <div class=\"is-mentions\">\n            <h4 class=\"title\">Mentioned in</h4>\n            <div class=\"stat\">\n              <div class=\"value\">10</div>\n              <div class=\"label\">Bulletins</div>\n            </div>\n            <div class=\"stat\">\n              <div class=\"value\">7</div>\n              <div class=\"label\">Incidents</div>\n            </div>\n          </div>\n          <div class=\"is-related\">\n            <h4 class=\"title\">Related to</h4>\n            <div class=\"stat\">\n              <div class=\"value\">25</div>\n              <div class=\"label\">Actors</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"related\">\n          Appears in related bulletins: <a href=\"#\">Phasells ur nunc purus</a>, <a href=\"#\">Vitae loboris nulla</a>, <a href=\"#\">Aliquam erat volutpat</a>, <a href=\"#\">Nam urna erat</a>, <a href=\"#\">Lorem ipsum</a>.\n        </div>\n        <div class=\"actions\">\n          <div class=\"button combo is-default\">\n            <span class=\"T\">Add as</span>\n            <ul class=\"options\">\n              <li>\n                 \n                <span class=\"text T\">Witness</span>\n              </li>\n              <li>\n                 \n                <span class=\"text T\">Victim</span>\n              </li>\n              <li>\n                 \n                <span class=\"text T\">Killer</span>\n              </li>\n              <li>\n                 \n                <span class=\"text T\">Torturer</span>\n              </li>\n              <li>\n                 \n                <span class=\"text T\">Kidnapper</span>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n      <div class=\"when-related\">\n        <div class=\"actions\">\n          <div class=\"left\">\n            <div class=\"button combo is-default\">\n              <span class=\"T\">\n                Related as: Victim \n                <ul class=\"options\">\n                  <li>\n                     \n                    <span class=\"text T\">Witness</span>\n                  </li>\n                  <li>\n                     \n                    <span class=\"text T\">Victim</span>\n                  </li>\n                  <li>\n                     \n                    <span class=\"text T\">Killer</span>\n                  </li>\n                  <li>\n                     \n                    <span class=\"text T\">Torturer</span>\n                  </li>\n                  <li>\n                     \n                    <span class=\"text T\">Kidnapper</span>\n                  </li>\n                </ul>\n              </span>\n            </div>\n          </div>\n          <div class=\"right\">\n            <button class=\"do-removeActor\">\n              <span class=\"text T\">Remove</span>\n            </button>\n          </div>\n          <div class=\"clearer\">&nbsp;</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</li>\n";
  return buffer;
  });
});