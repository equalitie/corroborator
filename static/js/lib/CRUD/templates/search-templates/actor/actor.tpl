  <div class="header">
    <a href="#" class="display do-hide is-small">
      <span aria-hidden="true" data-icon="&#x78"></span>
      <span class="screen-reader-text">Hide</span>
    </a>
  </div>
  <div class="body" style="bottom: 49px;">
    <div class="first initial span-66p">
    <!-- switch class here is-expanded -> in-preview -->
      <div class="Actor is-edited is-expanded">
        <div class="header">
          <!-- id field - hide for new actor -->
          {{#if model.id}}
          <span class="id">
            ID <span class="value out">{{model.id}}</span>
          </span>
          {{/if}}
          <!-- actor name -->
          <div class="field clear-after hide-multiple">
            <label>Name</label>
            <p class="error-text">
              Name must be entered
            </p>
            <span class="i18n with-en with-ar">
              <div lang="en">
                <input type="text"
                       name="fullname_en"
                       id="fullname_en" 
                       value="{{model.fullname_en}}"
                       class="required actor-field w-100p">
              </div>
              <div lang="ar">
                <input type="text" name="fullname_ar" id="fullname_ar"
                  value="{{model.fullname_ar}}" class="actor-field w-100p">
              </div>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </span>
          </div>

          <!-- actor nickname -->
          <div class="field clear-after hide-multiple">
            <label>Nickname</label>
            <span class="i18n with-en with-ar">
              <div lang="en">
                <input type="text" name="nickname_en" id="nickname_en" 
                  value="{{model.nickname_en}}" class="actor-field w-100p">
              </div>
              <div lang="ar">
                <input type="text" name="nickname_ar" id="nickname_ar" 
                  value="{{model.nickname_ar}}" class="actor-field w-100p">
              </div>
              <span class="toggle">
                <span lang="en">EN</span><span lang="ar">AR</span>
              </span>
            </span>
          </div>

        </div>
        <!-- end header -->

        <!-- start body -->
        <div class="body">
          <div class="group details">
            <div class="field span-33p">
              <label>Sex</label>
              <div id="sex_en" class="button combo">
        
                <span class="T selected-option">
                  {{#if model.sex_en}}
                    {{model.sex_en}}
                  {{else}}
                    Sex
                  {{/if}}
                <span aria-hidden="true" data-icon="&#x64;"></span>
                </span>
                <input name="sex_en" type="hidden" value="{{model.sex_en}}"class="actor-field">
        
                <ul class="options">
                  <li class="option selected">
                    <span class="text T">Male</span>
                  </li>
                  <li class="option">
                    <span class="text T">Female</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="field span-33p">
              <label>Child/Adult</label>
              <div id="age_en" class="button combo">
        
                <span class="T selected-option">
                  {{#if model.sex_en}}
                    {{model.age_en}}
                  {{else}}
                    Age
                  {{/if}}
                <span aria-hidden="true" data-icon="&#x64;"></span>
                </span>
                <input name="age_en" type="hidden" value="{{model.age_en}}" class="actor-field">
        

                <ul class="options">
                  <li class="option selected">
                    <span class="text T">Child</span>
                  </li>
                  <li class="option">
                    <span class="text T">Adult</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="field span-33p">
              <label>Civilian/Non-civilian</label>
              <div id="civilian_en" class="button combo">
        
                <span class="T selected-option">
                  {{#if model.civilian_en}}
                    {{model.civilian_en}}
                  {{else}}
                    Civilian
                  {{/if}}
                <span aria-hidden="true" data-icon="&#x64;"></span>
                </span>
                <input type="hidden" name="civilian_en" value="" class="actor-field">
        

                <ul class="options">
                  <li class="option selected">
                    <span class="text T">Civilian</span>
                  </li>
                  <li class="option">
                    <span class="text T">Non-civilian</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Date of birth -->
          <div class="field clear-after is-birthdate field hide-multiple">
            <label>Date of birth</label>
            <input type="text" name="DOB" value="{{formDateFormat model.DOB}}"
            class="w-50p actor-field"/>
          </div>

          <!-- Place of birth -->
          <div id="actor-pob-block" class="field hide-multiple">
          </div>

          <!-- map block -->
          <div id="actor-pob-map-block" class="field hide-multiple"></div>

          <!-- Current Location -->
          <div id="actor-current-location-block" class="field"></div>

          <!-- map block -->
          <div id="actor-current-map-block" class="field"></div>

          <!-- Occupation -->
          <div class="field is-occupation">
            <label>Occupation</label>
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <input type="text" 
                        class="actor-field with-select w-30p" 
                        value="{{model.occupation_en}}" 
                        name="occupation_en" 
                        id="actor_occupation_en">
                </div>
                <div lang="ar">
                    <input type="text" 
                        class="actor-field with-select w-30p" 
                        value="{{model.occupation_ar}}" 
                        name="occupation_ar" 
                        id="actor_occupation_ar">
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>  
          </div>

          <!-- Position -->
          <div class="field is-position">
            <label>Position (rank)</label>
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <input type="text" 
                        class="with-select actor-field w-30p" 
                        value="{{model.position_en}}" 
                        name="position_en" 
                        id="actor_position_en" >

                </div>
                <div lang="ar">
                    <input type="text" 
                        class="with-select actor-field w-30p" 
                        value="{{model.position_ar}}" 
                        name="position_ar" 
                        id="actor_position_ar" >
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>      
          </div>

          <!-- Ethnicity -->
          <div class="field is-ethnicity">
            <label>Ethnicity</label>
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <input type="text" 
                        class="with-select actor-field w-30p" 
                        value="{{model.ethnicity_en}}"
                        name="ethnicity_en" 
                        id="actor_ethnicity_en" >
                </div>
                <div lang="ar">
                    <input type="text" 
                        class="with-select actor-field w-30p" 
                        value="{{model.ethnicity_ar}}"
                        name="ethnicity_ar" 
                        id="actor_ethnicity_ar" >
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>
          </div>

          <!-- Nationality -->
          <div class="field is-nationality">
            <label>Nationality</label>
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <input type="text" 
                        class="with-select actor-field w-30p" 
                        value="{{model.nationality_en}}"
                        name="nationality_en" 
                        id="actor_nationality_en">
                </div>
                <div lang="ar">
                    <input type="text" 
                        class="with-select actor-field w-30p" 
                        value="{{model.nationality_ar}}"
                        name="nationality_ar" 
                        id="actor_nationality_ar">
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>    
          </div>

          <!-- Religion -->
          <div class="field is-religion">
            <label>Religion</label>
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <input type="text" 
                    class="with-select actor-field w-30p" 
                    value="{{model.religion_en}}"
                    name="religion_en" 
                    id="actor_religion_en" >
                </div>
                <div lang="ar">
                    <input type="text" 
                    class="with-select actor-field w-30p" 
                    value="{{model.religion_ar}}"
                    name="religion_ar" 
                    id="actor_religion_ar" >
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>          
          </div>

          <!-- Spoken Dialects -->
          <div class="field is-dialect">
            <label>Spoken dialects</label>
            <span class="i18n with-en with-ar">
                <div lang="en">
                    <input type="text" 
                    class="with-select actor-field w-30p" 
                    name="spoken_dialect_en"
                    value="{{model.spoken_dialect_en}}" 
                    id="actor_spoken_dialect_en" >
                </div>
                <div lang="ar">
                    <input type="text" 
                    class="with-select actor-field w-30p" 
                    name="spoken_dialect_ar"
                    value="{{model.spoken_dialect_ar}}" 
                    id="actor_spoken_dialect_ar" >
                </div>
                <span class="toggle">
                    <span lang="en">EN</span><span lang="ar">AR</span>
                </span>
            </span>          
          </div>

          <!-- Actor Field -->
          <div id="actor-actor-list-block" class="field is-actors">
            <label>Actors</label>
            <div id="actor-actor-search-block" class="search">
              <input type="text" class="with-clear">
              <button class="do-clear">
                <span>✓</span>
              </button>
              <button class="do-search do-search-embedded actors">
                <span>Search</span>
              </button>
            </div>
            <ul class="elements elements-actor">
            </ul>
          </div>

          <!-- media search - search for actor images -->
          <div id="actor-media-block" class="field is-media hide-multiple">
          </div>

          <div id="actor-version-block" class="">
            <div id="actor-status-block" class="field add">
              <p class="error-text">
                Select a status for this actor
              </p>
              <label>Status</label>
              <select name="status" 
                      id="status" 
                      class="required actor-field">
                <option value="">Select Status</option>
                {{#each statuses}}
                  <option
                    value="{{this.resource_uri}}"
                  >{{this.comment_status}}</option>
                {{/each}}
              </select>
            </div>

            <div class="clearer"></div>
            <!-- Comment content field -->
            <div id="actor-status-comment" class="add field">

              <p class="error-text">
                Comment field is required
              </p>
              <label>Comment</label>
              <textarea 
                id="comment"
                name="comment"
                class="required actor-field w-100p"></textarea>

            </div>
          </div>
          <!-- end version info -->

        </div>
      </div>
    <div class="clearer"></div>
  </div>
  <!-- show revision details -->
  <div class="revision-container"></div>
</div>
<div class="footer actions form">
  <div class="when-overlay-expanded">
    <button class="do-collapse-form">
      <span class="text t">» collapse</span>
    </button>
  </div>
  <div class="when-overlay-not_expanded">
    <button class="do-expand-form">
      <span class="text t">« expand</span>
    </button>
  </div>
  <button id="expanded-actor-save" class="do-save">
    <span class="text t">Save</span>
  </button>
</div>
