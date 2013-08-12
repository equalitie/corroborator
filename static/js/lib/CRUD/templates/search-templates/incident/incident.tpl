<div data-wireframe="incident-view" class="incident-overlay overlay WIREFRAME">
  <div class="header">
    <button class="do-hide is-small">
      <span class="T">close</span>
    </button>
  </div>
  <div id="view-placeholder-incident" class="body" style="bottom: 49px;">
    <form id="incident_form" class="incident_form">
          {{#if model.id}}
          <span class="id">
            ID <span id="view-actor-id" class="value out">{{model.django_id}}</span>
          </span>
          {{/if}}
      <div class="Incident in-preview is-edited">
        <div class="Incident is-edited">
          <div class="col first span-66p hidden incident-expanded-edit">
            <div id="incident-header-expand" class="header">
              <div id="incident-title-expand" class="field is-title">
                <label>Title</label>
              </div>
            </div>
            <div id="incident-body-expand" class="body"> </div>
          </div>
          <div class="col last span-33p hidden incident-expanded-edit">
          <div id="incident-goup-expand" class="body">

          </div>
          </div>


          <div id="incident-id-block-ne" class="header incident-not-expanded-edit">

            <h2 class="title">
                <span id="incident-title-block" class="i18n with-en with-ar">
                <label>Title</label>
                <div lang="en">
                  <textarea 
                    id="incident_title_en"
                    type="text"
                    name="title_en"
                    class="incident-field
                    w-100p">{{model.title_en}}</textarea>
                </div>
                <div lang="ar">
                  <label>Title</label>
                  <textarea 
                    id="incident_title_ar"
                    name="title_ar"
                    type="text"
                    class="incident-field
                    w-100p">{{model.title_ar}}</textarea>
                </div>
                <span class="toggle"><span lang="en">EN</span><span lang="ar">AR</span></span>
                </span>
            </h2>
          </div>
          <div id="incident-group-block-ne" class="body incident-not-expanded-edit">
            <div id="incident-group-block" class="group details">
              <div class="field clear-after">

                <!-- score slider -->
                <div id="incident-score-block" class="is-score right">
                  <label>Reliability Score</label>
                  <span class="score">

                    <span id="incident_confidence_score" class="value">{{model.confidence_score}}</span>
                    <input type="hidden" class="incident-field" name="confidence_score" value="{{model.confidence_score}}">


                    <div class="score-editor">
                      <div class="rail">
                        <div class="slider"></div>  
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
                  </span>
                </div>
                
                <!-- Assigned to user -->
                <div id="incident-assignment-block" class="incidentAssigned left">
                  <label>Assigned to</label>

                  <input type="text" class="with-clear is-assigned-to"
                    value="{{model.incident_assigned}}">
                  <input type="hidden" name="assigned_user"
                    value="{{model.assigned_user}}">

                <button id="clear-user" class="do-clear">
                  <span>✓</span>
                </button>
                </div>

                <div class="clearer">&nbsp;</div>

                <!-- incident labels -->
                <div id="incident-location-block" class="field is-tags">
                </div>

                <!-- incident labels -->
                <div id="incident-label-block" class="field is-tags">
                </div>

                <!-- Incident Crimes -->
                <div id="incident-crime-block" class="field is-crimes">
                  <label>Crime</label>
                  <ul class="crimes editor">

                    <li class="crime is-new">
                      <input type="text" value="Crime" class="with-select crimes-ac">
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- comments -->
            <div id="incident-comment-block" class="field is-comments">
            </div>

            <!-- events -->
            <div id="incident-event-block" class="field is-events clear">
            </div>

            <!-- Locations -->
            <div id="incident-location-block" class="field is-locations">
            </div>

            <!-- Description -->
            <div id="incident-description-block" class="field is-description">
            <div class="i18n with-en with-ar">
            <label>Description</label>
                <div lang="en">
                  <textarea 
                    id="incident_details_en"
                    name="incident_details_en"
                    class="incident-field w-100p">{{model.description_en}}</textarea>
                </div>
                <div lang="ar">
                  <textarea 
                    id="incident_details_ar"
                    name="incident_details_ar"
                    class="incident-field w-100p">{{model.description_ar}}</textarea>
                </div>
            <span class="toggle">
            <span lang="en">EN</span><span lang="ar">AR</span>
            </span>
            </div>
            </div>

            <!-- Actor selection -->
          <div id="incident-actor-list-block" class="field is-actors">
          </div>

          <div id="incident-bulletin-block" class="field is-bulletins">
          </div>
          <div id="incident-incident-block" class="field is-incidents">
          </div>
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
    <span id="incident_action_result" class="hidden">
    Result saved successfully.
    </span>

    <!--              <button class="do-select">
    <span class="text T">Select</span>
    </button> -->
    <button id="incident-action_cancel" class="hidden do-hide default">
    <span class="text T">Cancel</span>
    </button>

    <button id="incident-action_save" class="do-select default">
    <span class="text T">Save</span>
    </button>
    <button id="incident-action_edit" class="do-select default hidden">
    <span class="text T">Edit</span>
    </button>

    </div>
  </div>
</div>
