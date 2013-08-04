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
        <li count="5" class="REPEAT">
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
              <span class="name">Jane Doe</span>
              <span class="sex">(F)</span>
              <span class="age">24 yo.</span>
              <div class="L2">
                <span class="aka">aka «Jenny»</span>
              </div>
            </div>
            <div class="when-not_expanded">
              <div class="L3">
                lives in <span class="location">Damas</span>, works as a <span class="occupation">secretary</span> 
                <br>involved in <span class="incidents-count">10 incidents</span>
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
        </li><li class="">
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
              <span class="name">Jane Doe</span>
              <span class="sex">(F)</span>
              <span class="age">24 yo.</span>
              <div class="L2">
                <span class="aka">aka «Jenny»</span>
              </div>
            </div>
            <div class="when-not_expanded">
              <div class="L3">
                lives in <span class="location">Damas</span>, works as a <span class="occupation">secretary</span> 
                <br>involved in <span class="incidents-count">10 incidents</span>
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
        </li><li class="">
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
              <span class="name">Jane Doe</span>
              <span class="sex">(F)</span>
              <span class="age">24 yo.</span>
              <div class="L2">
                <span class="aka">aka «Jenny»</span>
              </div>
            </div>
            <div class="when-not_expanded">
              <div class="L3">
                lives in <span class="location">Damas</span>, works as a <span class="occupation">secretary</span> 
                <br>involved in <span class="incidents-count">10 incidents</span>
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
        </li><li class="">
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
              <span class="name">Jane Doe</span>
              <span class="sex">(F)</span>
              <span class="age">24 yo.</span>
              <div class="L2">
                <span class="aka">aka «Jenny»</span>
              </div>
            </div>
            <div class="when-not_expanded">
              <div class="L3">
                lives in <span class="location">Damas</span>, works as a <span class="occupation">secretary</span> 
                <br>involved in <span class="incidents-count">10 incidents</span>
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
        </li><li class="">
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
              <span class="name">Jane Doe</span>
              <span class="sex">(F)</span>
              <span class="age">24 yo.</span>
              <div class="L2">
                <span class="aka">aka «Jenny»</span>
              </div>
            </div>
            <div class="when-not_expanded">
              <div class="L3">
                lives in <span class="location">Damas</span>, works as a <span class="occupation">secretary</span> 
                <br>involved in <span class="incidents-count">10 incidents</span>
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
      </ul>
    </div>
    <div class="incidents group">
      <h3>Incidents</h3>
      <ul class="elements">
        <li count="5" class="REPEAT">
        <div class="Incident in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Incident's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
          </div>
        </div>
        </li><li class="">
        <div class="Incident in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Incident's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
          </div>
        </div>
        </li><li class="">
        <div class="Incident in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Incident's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
          </div>
        </div>
        </li><li class="">
        <div class="Incident in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Incident's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
          </div>
        </div>
        </li><li class="">
        <div class="Incident in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Incident's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
          </div>
        </div>
        </li>
      </ul>
    </div>
    <div class="bulletins group">
      <h3>Bulletins</h3>
      <ul class="elements">
        <li count="5" class="REPEAT">
        <div class="Bulletin in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Bulletin's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
            <div class="involved">
              <span class="actors-count">10</span> actors involved
            </div>
          </div>
        </div>
        </li><li class="">
        <div class="Bulletin in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Bulletin's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
            <div class="involved">
              <span class="actors-count">10</span> actors involved
            </div>
          </div>
        </div>
        </li><li class="">
        <div class="Bulletin in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Bulletin's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
            <div class="involved">
              <span class="actors-count">10</span> actors involved
            </div>
          </div>
        </div>
        </li><li class="">
        <div class="Bulletin in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Bulletin's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
            <div class="involved">
              <span class="actors-count">10</span> actors involved
            </div>
          </div>
        </div>
        </li><li class="">
        <div class="Bulletin in-list">
          <div class="L1">
            <div class="meta">
              <div class="score">
                <span class="value">80</span>
              </div>
              <div class="status">
                <span class="value">Reviewed</span>
              </div>
            </div>
            <div class="title i18n">

              <span lang="en">Bulletin's title with lots of words to show what a really long title looks like</span>
              <span lang="ar">يَجِبُ عَلَى الإنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </div>
          </div>
          <div class="L3">
            <div class="date-location">
              <span class="date">2012/Mar/23</span> in <span class="location">Damas, Syriah</span>
            </div>
            <div class="involved">
              <span class="actors-count">10</span> actors involved
            </div>
          </div>
        </div>
        </li>
      </ul>
    </div>
  </div>
</div>
