define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form>\n  <table>\n    <tr>\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.media_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td><input type=\"text\" name=\"media_dir\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.media_params)),stack1 == null || stack1 === false ? stack1 : stack1.media_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></td>\n    </tr>\n    <tr>\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.actor_csv_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td><input type=\"text\" name=\"actors_dir\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.actors_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></td>\n    </tr>\n    <tr>\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.bulletin_csv_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td><input type=\"text\" name=\"bulletins_dir\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.model),stack1 == null || stack1 === false ? stack1 : stack1.bulletins_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></td>\n    </tr>\n    <tr>\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.mysql_directory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td><input type=\"text\" name=\"mysql_dir\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.models),stack1 == null || stack1 === false ? stack1 : stack1.mysql_dir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></td>\n    </tr>\n    <tr>\n      <td>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.set_job_time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td><input type=\"text\" name=\"job_time\" value=\"\"></td>\n    </tr>\n    <tr>\n      <td></td>\n      <td><input type=\"submit\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.i18n),stack1 == null || stack1 === false ? stack1 : stack1.importer)),stack1 == null || stack1 === false ? stack1 : stack1.save_config)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></td>\n    </tr>\n  </table>\n</form>\n";
  return buffer;
  })

});