  <div class="Actor in-list">
    <div class="avatar">&nbsp;</div>
    <div class="content">
      <div class="L1">
        {{#if model.roles_en}}
        <div class="status">
          <span class="value">{{model.roles_en}}</span>
        </div>
        {{/if}}
        <span class="name">{{model.fullname_en}}</span>
        <span class="sex">{{model.sex_en}}</span>
        <span class="age">{{model.age_en}}</span>
        <div class="L2">
          {{#if model.nickname_en}}
            <span class="aka">aka «{{model.nickname_en}}»</span>
          {{/if}}
        </div>
      </div>
      <div class="when-not_expanded">
        <div class="L3">
          {{#if model.current_location}}
            lives in 
            <span class="location">{{fetchLocation model.current_location}}</span>
          {{/if}}
          {{#if model.occupation_en}}
            works as a <span class="occupation">secretary</span>
          {{/if}}
          {{#if model.count_incidents}}
          <br>involved in 
          <span class="incidents-count">{{model.count_incidents}} incidents</span>
          {{/if}}
        </div>
      </div>
    </div>
  </div>
