  <div class="Actor in-list embedded">
    <div class="actor-content">
      <div class="avatar">&nbsp;</div>
      <div class="content">
        <div class="L1">
          <p class="name">{{model.fullname_en}}</p>
          <p class="sex">{{model.sex_en}}</p>
          <p class="age">{{model.age_en}}</p>
        </div>
        <div class="L2">
            <p class="aka">aka «{{model.nickname_en}}»</p>
        </div>
        {{#if model.selected }}
        <div class="actor-summary hidden">
          <div class="L3">
            {{#if model.lives_in.location_en}}
              <p class='lives-in'>lives in 
                <span class="location">{{model.lives_in.location_en}}</span>
              </p>
            {{/if}}
            {{#if model.position_en}}
            <p class='works-as'>
            {{#if model.lives_in.location_en}}
            , 
            {{/if}}
            works as a 
              <span class="occupation">{{model.position_en}}</span> 
            </p>
            {{/if}}

            <br>involved in <span class="incidents-count">{{model.count_incidents}} incidents</span>
          </div>
        </div>
        {{/if}}
        {{#if model.result }}
        <div class="actor-long-summary">
          <table class="details">
            <tbody>
              {{#if model.lives_in.location_en}}
                <tr>
                  <th>Lives in</th>
                  <td>{{model.lives_in.location_en}}</td>
                </tr>
              {{/if}}
              {{#if model.POB}}
                <tr>
                  <th>Born in</th>
                  <td>{{ model.POB }}</td>
                </tr>
              {{/if}}
              {{#if model.nationality_en}}
                <tr>
                  <th>Nationality</th>
                  <td>{{nationality_en}}</td>
                </tr>
              {{/if}}
              {{#if model.ethnicity_en}}
                <tr>
                  <th>Ethnicity</th>
                  <td>{{model.ethnicity_en}}</td>
                </tr>
              {{/if}}
              {{#if model.spoken_dialect_en}}
                <tr>
                  <th>Speaks</th>
                  <td>{{model.spoken_dialect_en}}</td>
                </tr>
              {{/if}}
              {{#if model.religion_en}}
                <tr>
                  <th>Religion</th>
                  <td>{{model.religion_en}}</td>
                </tr>
              {{/if}}
            </tbody>
          </table>
          <div class="stats">
            <div class="is-mentions">
              <h4 class="title">Mentioned in</h4>
              <div class="stat">
                <div class="value">{{ model.count_bulletins }}</div>
                <div class="label">Bulletins</div>
              </div>
              <div class="stat">
                <div class="value">{{ model.count_incidents }}</div>
                <div class="label">Incidents</div>
              </div>
            </div>
          </div>
        </div>
        <div class="actions search-result">
          <div class="button combo is-default">
            <span class="T">Add as</span>
            <ul class="options">
              {{#each roles}}
              <li>
                <span class="text T">{{role}}</span>
              </li>
              {{/each}}
            </ul>
          </div>
        </div>
        {{/if}}
        <div class="when-related">
          <div class="actions">
            <div class="left">
              <div class="button combo is-default">
                <span class="T">
                  Related as: {{roleModel.role_en}} 
                  <ul class="options">
                    {{#each roles}}
                    <li>
                      <span class="text T">{{role}}</span>
                    </li>
                    {{/each}}
                  </ul>
                </span>
              </div>
            </div>
            <div class="right">
              <button class="do-removeActor">
                <span class="text T">Remove</span>
              </button>
            </div>
            <div class="clearer">&nbsp;</div>
          </div>
        </div>
     </div> 
   </div>
  </div>
