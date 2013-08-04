define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"Actor in-view\">\n  <div class=\"header\">\n    <div class=\"id\">\n      ID <span class=\"value out\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.django_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </div>\n    <div class=\"avatar\">&nbsp;</div>\n    <div class=\"infos\">\n      <h2 class=\"title\">\n        <span class=\"i18n with-en with-ar\">\n          <span lang=\"en\"><span class=\"name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> (<span class=\"sex\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.sex_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>) <span class=\"age\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></span>\n          <span lang=\"ar\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.fullname_ar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          <span class=\"toggle\"><span lang=\"en\">EN</span><span lang=\"ar\">AR</span></span></span></h2>\n      <div class=\"aka\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nickname_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      <div class=\"type\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.age_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", "
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.civilian_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </div>\n  </div>\n  <div class=\"body\">\n    <table class=\"details\">\n      <tbody><tr>\n          <th>Lives in</th>\n          <td></td>\n        </tr>\n        <tr>\n          <th>Born in</th>\n          <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.pob)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", 1989</td>\n        </tr>\n        <tr>\n          <th>Nationality</th>\n          <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        <tr>\n          <th>Ethnicity</th>\n          <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.nationality_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        <tr>\n          <th>Speaks</th>\n          <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.spoken_dialect_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        <tr>\n          <th>Religion</th>\n          <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.religion_en)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        <!--<tr>-->\n          <!--<th>Spoken dialect</th>-->\n          <!--<td>Dialect, dialect</td>-->\n        <!--</tr>-->\n    </tbody></table>\n    <div class=\"actors group\">\n      <h3>Related actors</h3>\n      <ul class=\"elements\">\n      </ul>\n    </div>\n    <div class=\"incidents group\">\n      <h3>Incidents</h3>\n      <ul class=\"elements\">\n      </ul>\n    </div>\n    <div class=\"bulletins group\">\n      <h3>Bulletins</h3>\n      <ul class=\"elements\">\n      </ul>\n    </div>\n  </div>\n</div>\n";
  return buffer;
  })

});