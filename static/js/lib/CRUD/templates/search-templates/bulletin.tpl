<div data-wireframe="bulletin-view" class="bulletin-overlay overlay WIREFRAME">
  <div class="header">
    <button class="do-hide is-small">
      <span class="T">close</span>
    </button>
  </div>
  <div id="view-placeholder-bulletin" class="body" style="bottom: 50px;">
    <form id="bulletin_form">
      <div class="Bulletin is-edited">
        <div class="col first span-66p hidden bulletin-expanded-edit">
          <div id="bulletin-header-expand" class="header">

            <div id="bulletin-title-expand" class="field is-title">
              <label>Title</label>
            </div>
          </div>
          <div id="bulletin-body-expand" class="body">

          </div>
        </div>
        <div class="col last span-33p hidden bulletin-expanded-edit">
          <div id="bulletin-goup-expand" class="body">

          </div>
        </div>


        <div id="bulletin-id-block-ne" class="header bulletin-not-expanded-edit">

          <!-- title -->
          <h2 class="title">
            <label>Title</label>
            <span id="bulletin-title-block" class="i18n with-en with-ar">
              <div lang="en">
                <textarea name="title_en"
                          type="text"
                          class="bulletin-field w-100p"></textarea>
              </div>
              <div lang="ar">
                <textarea name="title_ar"
                          type="text"
                          class="bulletin-field w-100p"></textarea>
              </div>
              <span class="toggle">
                <span lang="en">EN</span>
                <span lang="ar">AR</span>
              </span>
            </span>
          </h2>
        </div>

        <div id="bulletin-group-block-ne" class="body bulletin-not-expanded-edit">
          <div id="bulletin-group-block" class="group details">
            <div class="field clear-after">

              <!-- score slider name=confidence_score -->
              <div id="bulletin-score-block" class="is-score right">
                <label>Score</label>
                <div class="score">

                  <span id="bulletin_confidence_score" class="value">0</span>
                  <input type="hidden" 
                         name="confidence_score"
                         value="0"
                         class="bulletin-field">

                  <div class="score-editor">

                    <div class="rail">
                      <div class="slider">
                      </a>
                      </div>  
                      <!-- <div class="cursor">&nbsp;</div> -->
                      <div class="axis">
                        <div class="start">
                          <span class="label">0%</span>
                        </div>
                        <div class="middle">
                          <span class="label">50%</span>
                        </div>
                        <div class="end">
                          <span class="label">100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end score slider -->

            <!-- Assigned to field name='assigned_user' -->
              <div id="bulletin-assignment-block" class="bulletinAssigned  left">
                <label>Assigned to</label>

                <input type="text" class="with-clear is-assigned-to" value="">
                <input type="hidden" 
                       name="assigned_user"
                       value=""
                       class="bulletin-field" >

              <button id="clear-user" class="do-clear">
                <span>✓</span>
              </button>
              </div>
            </div>
          </div>

          <!-- Sources field -->
          <div id="bulletin-source-block" class="field is-sources">
          </div>

          <!-- Labels field -->
          <div id="bulletin-label-block" class="field is-tags">
          </div>

          <!-- Comments block bulletin_comments -->
          <div id="bulletin-comment-block" class="field is-comments">
          </div>
          <!-- Event block -->
          <div id="bulletin-event-block" class="field is-events clear">
          </div>
        <div id="bulletin-location-block" class="field is-locations">
        </div>

        <div id="bulletin-media-block" class="field is-media">
        </div>

        <div id="bulletin-description-block" class="field is-description">
          <label>Description</label>
          <div class="i18n with-en with-ar">
            <div lang="en">
              <textarea id="bulletin_description_en"
                        name="bulletin_description_en"
                        type="text"
                        class="bulletin-field w-100p"></textarea>
            </div>
            <div lang="ar">
              <textarea id="bulletin_description_ar"
                        name="bulletin_description_ar"
                        type="text"
                        class="bulletin-field w-100p"></textarea>
            </div>
            <span class="toggle">
              <span lang="en">EN</span>
              <span lang="ar">AR</span>
            </span>
          </div>
        </div>

        <!-- Related Actors -->
        <div id="bulletin-actor-list-block" class="field is-actors">
        </div>

        <!-- Related bulletins -->
        <div id="bulletin-bulletin-block" class="field is-bulletins">
        </div>

        </div>
      </div>
    </form>
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
      <span id="bulletin_action_result" class="hidden">
      Result saved successfully.
      </span>
      <!--
      <button class="do-select">
      <span class="text T">Select</span>
      </button>
      -->
      <button id="bulletin-action_edit" class="do-select default hidden">
        <span class="text T">Edit</span>
      </button>
      <button id="actor-action_cancel" class="hidden do-hide default">
        <span class="text T">Cancel</span>
      </button>

      <button id="bulletin-action_save_relate" class="hidden do-select default">
        <span class="text T">Save &amp; Relate</span>
      </button>

      <button id="bulletin-action_save" class="do-select default">
        <span class="text T">Save</span>
      </button>
    </div>
  </div>
</div>
