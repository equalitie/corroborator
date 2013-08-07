  <div class="Actor in-list">
    <div class="is-selector {{pos}}">
      <input type="checkbox" {{model.checked}}>
    </div>
    <div class="actor-content">
      <a href="#actor/{{model.id}}">
        <div class="avatar">&nbsp;</div>
        <div class="content">
          <div class="L1">
            <div class="status">
              <span class="value">Victim</span>
            </div>
            <p class="name">{{model.fullname_en}}</p>
            <p class="sex">(F)</p>
            <p class="age">27</p>
          </div>
          <div class="L2">
              <p class="aka">aka «{{model.nickname_en}}»</p>
          </div>
          <div class="actor-summary">
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
          <div class="actor-long-summary hidden">
            <div class="actions">
              <div class="button combo is-default">
                <span class="T">Add as</span>
                <ul class="options">
                  <li>
                    <span class="text T">Witness</span>
                  </li>
                  <li>
                    <span class="text T">Victim</span>
                  </li>
                  <li>
                    <span class="text T">Killer</span>
                  </li>
                  <li>
                    <span class="text T">Torturer</span>
                  </li>
                  <li>
                    <span class="text T">Kidnapper</span>
                  </li>
                </ul>
              </div>
            </div>
            <table class="details">
              {{#if model.lives_in.location_en}}
              <tbody><tr>
                <th>Lives in</th>
                <td>{{model.lives_in.location_en}}</td>
              </tr>
              {{/if}}
              <tr>
                <th>Born in</th>
                <td>Damas, 1989</td>
              </tr>
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
              <tr>
                <th>Religion</th>
                <td>{{model.religion_en}}</td>
              </tr>
              {{/if}}
            </tbody></table>
            <div class="stats">
              <div class="is-mentions">
                <h4 class="title">Mentioned in</h4>
                <div class="stat">
                  <div class="value">10</div>
                  <div class="label">Bulletins</div>
                </div>
                <div class="stat">
                  <div class="value">7</div>
                  <div class="label">Incidents</div>
                </div>
              </div>
              <div class="is-related">
                <h4 class="title">Related to</h4>
                <div class="stat">
                  <div class="value">25</div>
                  <div class="label">Actors</div>
                </div>
              </div>
            </div>
            <div class="related">
              Appears in related bulletins: <a href="#">Phasells ur nunc purus</a>, <a href="#">Vitae loboris nulla</a>, <a href="#">Aliquam erat volutpat</a>, <a href="#">Nam urna erat</a>, <a href="#">Lorem ipsum</a>.
            </div>
          </div>
          <div class="when-related">
            <div class="actions">
              <div class="left">
                <div class="button combo is-default">
                  <span class="T">
                    Related as: Victim 
                    <ul class="options">
                      <li>
                        <span class="text T">Witness</span>
                      </li>
                      <li>
                        <span class="text T">Victim</span>
                      </li>
                      <li>
                        <span class="text T">Killer</span>
                      </li>
                      <li>
                        <span class="text T">Torturer</span>
                      </li>
                      <li>
                        <span class="text T">Kidnapper</span>
                      </li>
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
     </a>
   </div>
  </div>
