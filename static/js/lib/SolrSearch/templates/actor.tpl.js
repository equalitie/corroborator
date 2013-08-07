define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <p class='lives-in'>lives in \n                  <span class=\"location\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                </p>\n              ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n              <p class='works-as'>\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              works as a \n                <span class=\"occupation\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> \n              </p>\n              ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\n              , \n              ";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tbody><tr>\n                <th>Lives in</th>\n                <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n              ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                <th>Nationality</th>\n                <td>";
  if (stack1 = helpers.nationality_en) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nationality_en; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n              </tr>\n              ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                <th>Ethnicity</th>\n                <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n              ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                <th>Speaks</th>\n                <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n              ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n              <tr>\n                <th>Religion</th>\n                <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n              ";
  return buffer;
  }

  buffer += "  <div class=\"Actor in-list\">\n    <div class=\"is-selector ";
  if (stack1 = helpers.pos) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n      <input type=\"checkbox\" "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.checked)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ">\n    </div>\n    <div class=\"actor-content\">\n      <a href=\"#actor/"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"avatar\">&nbsp;</div>\n        <div class=\"content\">\n          <div class=\"L1\">\n            <div class=\"status\">\n              <span class=\"value\">Victim</span>\n            </div>\n            <p class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n            <p class=\"sex\">(F)</p>\n            <p class=\"age\">27</p>\n          </div>\n          <div class=\"L2\">\n              <p class=\"aka\">aka «"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "»</p>\n          </div>\n          <div class=\"actor-summary\">\n            <div class=\"L3\">\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.position_en), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n              <br>involved in <span class=\"incidents-count\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.count_incidents)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " incidents</span>\n            </div>\n          </div>\n          <div class=\"actor-long-summary hidden\">\n            <div class=\"actions\">\n              <div class=\"button combo is-default\">\n                <span class=\"T\">Add as</span>\n                <ul class=\"options\">\n                  <li>\n                    <span class=\"text T\">Witness</span>\n                  </li>\n                  <li>\n                    <span class=\"text T\">Victim</span>\n                  </li>\n                  <li>\n                    <span class=\"text T\">Killer</span>\n                  </li>\n                  <li>\n                    <span class=\"text T\">Torturer</span>\n                  </li>\n                  <li>\n                    <span class=\"text T\">Kidnapper</span>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <table class=\"details\">\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.lives_in)),stack1 == null || stack1 === false ? stack1 : stack1.location_en), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              <tr>\n                <th>Born in</th>\n                <td>Damas, 1989</td>\n              </tr>\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_en), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.ethnicity_en), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n              ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </tbody></table>\n            <div class=\"stats\">\n              <div class=\"is-mentions\">\n                <h4 class=\"title\">Mentioned in</h4>\n                <div class=\"stat\">\n                  <div class=\"value\">10</div>\n                  <div class=\"label\">Bulletins</div>\n                </div>\n                <div class=\"stat\">\n                  <div class=\"value\">7</div>\n                  <div class=\"label\">Incidents</div>\n                </div>\n              </div>\n              <div class=\"is-related\">\n                <h4 class=\"title\">Related to</h4>\n                <div class=\"stat\">\n                  <div class=\"value\">25</div>\n                  <div class=\"label\">Actors</div>\n                </div>\n              </div>\n            </div>\n            <div class=\"related\">\n              Appears in related bulletins: <a href=\"#\">Phasells ur nunc purus</a>, <a href=\"#\">Vitae loboris nulla</a>, <a href=\"#\">Aliquam erat volutpat</a>, <a href=\"#\">Nam urna erat</a>, <a href=\"#\">Lorem ipsum</a>.\n            </div>\n          </div>\n          <div class=\"when-related\">\n            <div class=\"actions\">\n              <div class=\"left\">\n                <div class=\"button combo is-default\">\n                  <span class=\"T\">\n                    Related as: Victim \n                    <ul class=\"options\">\n                      <li>\n                        <span class=\"text T\">Witness</span>\n                      </li>\n                      <li>\n                        <span class=\"text T\">Victim</span>\n                      </li>\n                      <li>\n                        <span class=\"text T\">Killer</span>\n                      </li>\n                      <li>\n                        <span class=\"text T\">Torturer</span>\n                      </li>\n                      <li>\n                        <span class=\"text T\">Kidnapper</span>\n                      </li>\n                    </ul>\n                  </span>\n                </div>\n              </div>\n              <div class=\"right\">\n                <button class=\"do-removeActor\">\n                  <span class=\"text T\">Remove</span>\n                </button>\n              </div>\n              <div class=\"clearer\">&nbsp;</div>\n            </div>\n          </div>\n       </div> \n     </a>\n   </div>\n  </div>\n";
  return buffer;
  })

});