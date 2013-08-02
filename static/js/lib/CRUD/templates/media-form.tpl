<span class="i18n with-en with-ar">
  <div lang="en">
    <input type="text" name="name_en"
      value="" class="{{entityType}}-field w-100p" />
  </div>
  <div lang="ar">
    <input type="text" name="name_ar" id="fullname_ar"
    value="" class="{{entityType}}-field w-100p" />
  </div>
  <span class="toggle">
    <span lang="en">EN</span><span lang="ar">AR</span>
  </span>
  <select name="media_type" id="{{entityType}}-media_type"
    class="{{entityType}}-field">
    {{#each mediaTypes}}
    <option value="{{value}}">{{text}}</option>
    {{/each}}
  </select>
  <input id="{{entityType}}-file-upload"
    name="file" type="file" 
    class="{{entityType}}-field" />
  <input type="submit" value="Attach File Details"  class="hidden" />
</span>
