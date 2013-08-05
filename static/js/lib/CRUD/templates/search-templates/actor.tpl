<div class="actor-overlay overlay WIREFRAME">
  <div class="header">
    <button class="do-hide is-small">
      <span class="T">close</span>
    </button>
  </div>
  <div id="view-placeholder-actor" class="body" style="bottom: 50px;">
    <form id="actor_form">
      <div class="Actor in-preview is-edited">
        <!-- start header fields -->
        <div class="header">
          <!-- id field - hide for new actor -->
          {{#if model.id}}
          <span class="id">
            ID <span id="view-actor-id" class="value out">{{model.django_id}}</span>
          </span>
          {{/if}}
            
          <!-- actor name -->
          <div class="field clear-after">
            <label>Name</label>
            <span class="i18n with-en with-ar">
              <div lang="en">
                <input type="text" name="fullname_en" id="fullname_en" 
                  value="{{model.fullname_en}}" class="actor-field w-100p">
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
          <div class="field clear-after">
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
        <!-- end form header -->

        <!-- start form body -->
        <div class="body">
          <div class="group details">
            <div class="field span-33p">
              <label>Sex</label>
              <div id="sex_en" class="button combo">
        
                <span class="T selected-option">Sex</span>
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
        
                <span class="T selected-option">Age</span>
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
        
                <span class="T selected-option">Civilian</span>
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
          <div class="field clear-after is-birthdate field ">
            <label>Date of birth</label>
            <input type="text" name="DOB" value="{{model.DOB}}" class="w-50p" class="actor-field">
          </div>

          <!-- Place of birth -->
          <div class="field">
            <label>Place of birth</label>
            <input id="actor_pob_hidden" name="POB" type="hidden" value="{{model.POB}}">
            <input type="text" class="with-select w-50p ui-autocomplete-input" 
              id="actor_pob" value="" autocomplete="off">
            <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>
          </div>

          <!-- Current Location -->
          <div class="field">
            <label>Lives in</label>
            <input id="actor_lives_in_hidden" name="current_location" type="hidden" value="">
            <input type="text" class="with-select w-50p ui-autocomplete-input" 
              id="actor_lives_in" value="" autocomplete="off">
            <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>
          </div>

          <!-- Occupation -->
          <div class="field is-occupation">
            <label>Occupation</label>
            <input type="text" class="with-select w-30p" value="{{model.occupation_en}}" 
              name="occupation_en" id="actor_occupation_en" class="actor-field">
          </div>

          <!-- Position -->
          <div class="field is-position">
            <label>Position (rank)</label>
            <input type="text" class="with-select w-30p" value="{{model.position_en}}" 
              name="position_en" id="actor_position_en" class="actor-field">
          </div>
          <!-- Ethnicity -->
          <div class="field is-ethnicity">
            <label>Ethnicity</label>
            <input type="text" class="with-select w-30p" value="{{model.ethnicity_en}}"
              name="ethnicity_en" id="actor_ethnicity_en" class="actor-field">
          </div>

          <!-- Nationality -->
          <div class="field is-nationality">
            <label>Nationality</label>
            <input type="text" class="with-select w-30p" value="{{model.nationality_en}}"
              name="nationality_en" id="actor_nationality_en" class="actor-field">
          </div>

          <!-- Religion -->
          <div class="field is-religion">
            <label>Religion</label>
            <input type="text" class="with-select w-30p" value="{{model.religion_en}}"
              name="religion_en" id="actor_religion_en" class="actor-field">
          </div>

          <!-- Spoken Dialects -->
          <div class="field is-dialect">
            <label>Spoken dialects</label>
            <input type="text" class="with-select w-30p" name="spoken_dialect_en"
              value="{{model.spoken_dialect_en}}" id="actor_spoken_dialect_en" class="actor-field">
          </div>
        </div>

        <!-- end form body -->

          <!-- 
            embedded search bit 
            TODO: q: does this need it's own template
                  a: yes it does
                  a1: we'll see, so we will
          -->

          <!-- searches for actors: why? -->
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
          <div id="actor-media-block" class="field is-media">
            <div class="actor-preview preview"> </div>
            <label>Actor Image</label>

        <div id="actor-media-search-block" class="search">
              <input type="text" class="with-clear">
              <button class="do-clear">
                <span>✓</span>
              </button>
              <button class="do-search do-search-embedded medias">
                <span>Search</span>
              </button>
        <button class="do-search upload-media">
                <span>Upload New Media</span>
              </button>
            </div>
            <ul class="actor-media media">
        
            </ul>

          </div>



        </div>

      </form>
      <!-- end form -->
    </div>

          <div class="footer actions">
            <div class="left">
              <div class="when-overlay-expanded">
                <button class="do-collapse">
                  <span class="text T">Collapse »</span>
                </button>
              </div>
              <div class="when-overlay-not_expanded">
                <button class="do-expand">
                  <span class="text T">« Expand</span>
                </button>
              </div>
            </div>
            <div class="right">
    <span id="actor_action_result" class="hidden">
      Result saved successfully.
    </span>

              <button id="actor-action_edit" class="do-select default hidden">
                <span class="text T">Edit</span>
              </button>
    <div class="button combo invert is-default hidden">
      <span class="T">
        Save related as: 
        <ul class="options">
          <li>
      <span class="text T actor-action_save_relate">Witness</span>
          </li>
          <li>
      <span class="text T actor-action_save_relate">Victim</span>
          </li>
          <li>
      <span class="text T actor-action_save_relate ">Killer</span>
          </li>
          <li>
      <span class="text T actor-action_save_relate">Torturer</span>
          </li>
          <li>
      <span class="text T actor-action_save_relate">Kidnapper</span>
          </li>
        </ul>
      </span>
    </div>
              <button id="actor-action_cancel" class="hidden do-hide default">
                <span class="text T">Cancel</span>
              </button>

              <button id="actor-action_save" class="do-select default">
                <span class="text T">Save</span>
              </button>

            </div>
          </div>
</div>
