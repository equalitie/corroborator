<form>
  <table>
    <tr>
      <td>{{i18n.importer.media_directory}}</td>
      <td><input type="text" name="media_dir" value="{{model.media_params.media_dir}}"></td>
    </tr>
    <tr>
      <td>{{i18n.importer.actor_csv_directory}}</td>
      <td><input type="text" name="actors_dir" value="{{model.actors_dir}}"></td>
    </tr>
    <tr>
      <td>{{i18n.importer.bulletin_csv_directory}}</td>
      <td><input type="text" name="bulletins_dir" value="{{model.bulletins_dir}}"></td>
    </tr>
    <tr>
      <td>{{i18n.importer.mysql_directory}}</td>
      <td><input type="text" name="mysql_dir" value="{{models.mysql_dir}}"></td>
    </tr>
    <tr>
      <td>{{i18n.importer.set_job_time}}</td>
      <td><input type="text" name="job_time" value=""></td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" value="{{i18n.importer.save_config}}"></td>
    </tr>
  </table>
</form>
