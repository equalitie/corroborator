<label>{{ display.field_label }}</label>
<ul class="{{display.field_name}} tags editor">

  <li class="{{ display.field_name }} is-new">
  <input type="text" placeholder="{{ field_label }}">
  </li>
</ul>
<select multiple="true" name="{{display.field_name}}" class="hidden {{entityType}}-field">
  <option selected value=""></option>
</select>

