<div class="Actor in-view">
  <div class="header">
    <div class="id">
      ID <span class="value out">{{model.django_id}}</span>
    </div>
    <div class="avatar">&nbsp;</div>
    <div class="infos">
      <h2 class="title">
        <span class="i18n with-en with-ar">
          <span lang="en"><span class="name">{{model.fullname_en}}</span> (<span class="sex">{{model.sex_en}}</span>) <span class="age">{{model.age_en}}</span></span>
          <span lang="ar">{{model.fullname_ar}}</span>
          <span class="toggle"><span lang="en">EN</span><span lang="ar">AR</span></span></span></h2>
      <div class="aka">{{model.nickname_en}}</div>
      <div class="type">{{model.age_en}}, {{model.civilian_en}}</div>
    </div>
  </div>
  <div class="body">
    <table class="details">
      <tbody><tr>
          <th>Lives in</th>
          <td></td>
        </tr>
        <tr>
          <th>Born in</th>
          <td>{{model.pob}}, 1989</td>
        </tr>
        <tr>
          <th>Nationality</th>
          <td>{{model.nationality_en}}</td>
        </tr>
        <tr>
          <th>Ethnicity</th>
          <td>{{model.nationality_en}}</td>
        </tr>
        <tr>
          <th>Speaks</th>
          <td>{{model.spoken_dialect_en}}</td>
        </tr>
        <tr>
          <th>Religion</th>
          <td>{{model.religion_en}}</td>
        </tr>
        <!--<tr>-->
          <!--<th>Spoken dialect</th>-->
          <!--<td>Dialect, dialect</td>-->
        <!--</tr>-->
    </tbody></table>
    <div class="actors group">
      <h3>Related actors</h3>
      <ul class="elements">
      </ul>
    </div>
    <div class="incidents group">
      <h3>Incidents</h3>
      <ul class="elements">
      </ul>
    </div>
    <div class="bulletins group">
      <h3>Bulletins</h3>
      <ul class="elements">
      </ul>
    </div>
  </div>
</div>
