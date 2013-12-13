  <div class="Actor in-list">
    {{#if model.thumbnail_url}}
      <div class="avatar"><img src="{{model.thumbnail_url}}" alt="actor thumbnail"></div>
    {{else}}
      <div class="avatar">&nbsp;</div>
    {{/if}}
    <div class="content">
      <div class="L1">
        {{#if model.most_recent_status_actor}}
          <span class="status">
            <span class="text">{{model.most_recent_status_actor}}</span>
          </span>
        {{/if}}
        {{#if model.role}}
        <span class="status" style="margin-right:5px;">
          <span class="text">{{fetchRole model.role}}</span>
        </span>
        {{/if}}
        <a href="#actor/{{model.id}}/{{expanded}}">
          <h3 class="">
            {{#if model.fullname_en}}
              <p>{{model.fullname_en}}</p>
            {{/if}}
            {{#if model.fullname_ar}}
              <p>{{model.fullname_ar}}</p>
            {{/if}}
          </h3>
        </a>
        <span class="sex">{{model.sex_en}}</span>
        <span class="age">{{model.age_en}}</span>
        <div class="L2">
          {{#if model.nickname_en}}
            <span class="aka">{{i18n.actor.aka}} «{{model.nickname_en}}»</span>
          {{/if}}
        </div>
      </div>
      <div class="when-not_expanded">
        <div class="L3">
          {{#if model.current_location}}
            {{i18n.actor.lives_in}}
            <span class="location">{{fetchLocation model.current_location}}</span>
          {{/if}}
          {{#if model.occupation_en}}
            {{i18n.actor.works_as_a}} <span class="occupation">{{model.occupation_en}}</span>
          {{/if}}
          {{#if model.count_incidents}}
          <br>{{i18n.actor.involved_in}} 
          <span class="incidents-count">{{model.count_incidents}} incidents</span>
          {{/if}}
        </div>
      </div>
    </div>
  </div>
