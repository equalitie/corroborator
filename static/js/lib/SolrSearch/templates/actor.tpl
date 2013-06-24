<li class="">
  <div class="Actor in-list">
    <div class="when-hover">
      <div class="is-selector">
        <input type="checkbox">
      </div>
    </div>
    <div class="avatar">&nbsp;</div>
    <div class="content">
      <div class="L1">
        <div class="status">
          <span class="value">Victim</span>
        </div>
        <span class="name">{{model.fullname_en}}</span>
        <span class="sex">{{model.sex_en}}</span>
        <span class="age">{{model.age_en}}</span>
        <div class="L2">
          <span class="aka">{{model.nickname_en}}</span>
        </div>
      </div>
      <div class="when-not_expanded">
        <div class="L3">
          lives in <span class="location"></span>, works as a <span class="occupation">{{model.position_en}}</span> 
          <br>involved in <span class="incidents-count">{{model.count_incidents}} incidents</span>
        </div>
      </div>
      <div class="when-expanded">
        <table class="details">
          <tbody><tr>
            <th>Lives in</th>
            <td>Damas</td>
          </tr>
          <tr>
            <th>Born in</th>
            <td>Damas, 1989</td>
          </tr>
          <tr>
            <th>Nationality</th>
            <td>Libanese</td>
          </tr>
          <tr>
            <th>Ethnicity</th>
            <td>Arab</td>
          </tr>
          <tr>
            <th>Speaks</th>
            <td>Arabic, English</td>
          </tr>
          <tr>
            <th>Religion</th>
            <td>Muslim</td>
          </tr>
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
  </div>
</li>
