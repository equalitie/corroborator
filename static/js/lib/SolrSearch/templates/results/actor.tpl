  <div class="Actor in-list search-results">
    <div class="is-selector {{pos}}">
      <input type="checkbox" {{model.checked}}>
    </div>
      <a href="#actor/{{model.id}}">
      <div class="actor-content">
        {{#if model.thumbnail_url}}
          <div class="avatar"><img src="{{model.thumbnail_url}}" alt="actor thumbnail"></div>
        {{else}}
          <div class="avatar">&nbsp;</div>
        {{/if}}
        <div class="content">
          <div class="L1">
            {{#if model.fullname_en}}
            <p class="name"> {{model.fullname_en}}</p>
            {{/if}}
            {{#if model.fullname_ar}}
            <p class="name"> {{model.fullname_ar}}</p>
            {{/if}}

            {{#if model.sex_en}}
              <p class="sex">{{model.sex_en}}</p>
            {{/if}}
            {{#if model.sex_en}}
              {{#if model.age_en}}
                <p class="age">,&nbsp;</p>
              {{/if}}
            {{/if}}
            {{#if model.age_en}}
            <p class="age"> {{model.age_en}}</p>
            {{/if}}
          </div>

          <div class="L2">
            <br/>
            {{#if model.nickname_en}}
              <p class="aka">{{i18n.results.aka}} «{{model.nickname_en}}»</p>
            {{/if}}
          </div>
          <div class="actor-summary">
            <div class="L3">
              {{#if model.current_location}}
                {{i18n.results.lives_in}}
                <span class="location">{{fetchLocation model.current_location}}{{#if model.position_en}}, {{/if}} </span>
              {{/if}}
              {{#if model.position_en}}
              <span class='works-as'>
              {{i18n.results.works_as_a}}
                <span class="occupation">{{model.position_en}}</span> 
              </span>
              {{/if}}

              {{#if model.count_incidents}}
              <br>{{i18n.results.involved_in}} <span class="incidents-count">
              {{model.count_incidents}}
              {{pluralise word='incident' numItems=model.count_incidents}}</span>
              {{/if}}
            </div>
          </div>
       </div> 
     </div>
   </a>
  </div>
