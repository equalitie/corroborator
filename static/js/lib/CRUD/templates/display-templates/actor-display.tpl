<div class="Actor in-view">
  <div class="header">
    <div class="id">
      ID <span class="value out">{{model.django_id}}</span>
    </div>
    {{#if model.thumbnail_url}}
    <div class="avatar"><img src="{{model.thumbnail_url}}" alt="actor thumbnail"></div>
    {{else}}
    <div class="avatar">&nbsp;</div>
    {{/if}}
    <div class="infos">
      <h2 class="title">
        <span class="i18n with-en with-ar">
          <span lang="en"><span class="name">{{model.fullname_en}}</span> (<span class="sex">{{model.sex_en}}</span>) <span class="age"></span></span>
          <span lang="ar">{{model.fullname_ar}}</span>
          <span class="toggle">
            <span lang="en">EN</span>
            <span lang="ar">AR</span>
          </span>
        </span>
      </h2>
      <div class="aka">{{model.nickname_en}}</div>
      <div class="type">
        {{#if model.age_en}}
          {{model.age_en}}
          {{#if model.civilian_en}}, {{/if}}
        {{/if}}
        {{#if model.civilian_en}}
          {{model.civilian_en}}
        {{/if}}
      </div>
    </div>
  </div>
  <div class="body">
    <table class="details">
      <tbody>
        {{#if model.current_location}}
        <tr>
          <th>Lives in </th>
          <td>{{fetchLocation model.current_location}}</td>
        </tr>
        {{/if}}
        <tr>
          <th>Born in</th>
          <td>
            {{#if model.pob}}{{model.pob}}{{#if model.DOB}}, {{/if}}{{/if}}
            {{#if model.DOB }}{{dateFormat model.DOB}}{{/if}}
          </td>
        </tr>
        {{#if model.nationality_en}}
        <tr>
          <th>Nationality</th>
          <td>
            <span class="i18n with-en with-ar">
              <span lang="en"><span class="name">{{model.nationality_en}}</span></span>
              <span lang="ar"><span class="name">{{model.nationality_ar}}</span></span>
              <span class="toggle">
                <span lang="en">EN</span>
                <span lang="ar">AR</span>
              </span>
            </span>
        </td>
        </tr>
        {{/if}}
        {{#if model.ethnicity_en}}
        <tr>
          <th>Ethnicity</th>
          <td>
            <span class="i18n with-en with-ar">
              <span lang="en"><span class="name">{{model.ethnicity_en}}</span></span>
              <span lang="ar"><span class="name">{{model.ethnicity_ar}}</span></span>
              <span class="toggle">
                <span lang="en">EN</span>
                <span lang="ar">AR</span>
              </span>
            </span>
            </td>
        </tr>
        {{/if}}
        {{#if model.spoken_dialect_en}}
        <tr>
          <th>Speaks</th>
            <td>
            <span class="i18n with-en with-ar">
              <span lang="en"><span class="name">{{model.spoken_dialect_en}}</span></span>
              <span lang="ar"><span class="name">{{model.spoken_dialect_ar}}</span></span>
              <span class="toggle">
                <span lang="en">EN</span>
                <span lang="ar">AR</span>
              </span>
            </span>
            </td>
        </tr>
        {{/if}}
        {{#if model.religion_en}}
        <tr>
          <th>Religion</th>
            <td>
            <span class="i18n with-en with-ar">
              <span lang="en"><span class="name">{{model.religion_en}}</span></span>
              <span lang="ar"><span class="name">{{model.religion_ar}}</span></span>
              <span class="toggle">
                <span lang="en">EN</span>
                <span lang="ar">AR</span>
              </span>
            </span>
            </td>
        </tr>
        {{/if}}
      </tbody>
    </table>
    {{#if model.actors_role}}
      <div class="actors group">
      </div>
    {{/if}}
  </div>
</div>
