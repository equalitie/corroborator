<div data-wireframe="incident-view" class="incident-overlay overlay WIREFRAME">
  <div class="header">
    <button class="do-hide is-small">
      <span class="T">close</span>
    </button>
  </div>
  <div id="view-placeholder-incident" class="body" style="bottom: 46px;">
    <form id="incident_form">
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
              <label>Title
                <span id="incident-title-block" class="i18n with-en with-ar">
                <div lang="en">
                  <textarea id="incident_title_en" type="text" class="validate[required] w-100p"></textarea>
                </div>
                <div lang="ar">
                  <textarea type="text" id="incident_title_ar" class="w-100p"></textarea>
                </div>
                <span class="toggle"><span lang="en">EN</span><span lang="ar">AR</span></span>
                </span>
              </label>
            </h2>
          </div>
          <div id="incident-group-block-ne" class="body incident-not-expanded-edit">
            <div id="incident-group-block" class="group details">
              <div class="field clear-after">

                <!-- score slider -->
                <div id="incident-score-block" class="is-score right">
                  <label>Reliability Score</label>
                  <span class="score">

                    <span id="incident_confidence_score" class="value">0</span>
                    <input type="hidden" name="confidence_score" value="0">


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

                  <input type="text" class="with-clear is-assigned-to" value="">
                  <input type="hidden" name="assigned_user" value="">

                <button id="clear-user" class="do-clear">
                  <span>✓</span>
                </button>
                </div>

                <div class="clearer">&nbsp;</div>

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
            <label>Comments</label>
            <ul class="comments">

            <li class="comment is-new">
            <div id="incident-status-block" class="add">
            <label>Status</label>
            <br>
            <select id="incident_status">

            <option value="Select status">Select Status</option>


            <option value="1">Machine Created</option>



            <option value="2">Human Created</option>



            <option value="3">Updated</option>



            <option value="4">Reviewed</option>



            <option value="5">Finalized</option>


            </select>
            </div>
            <div class="clearer"> </div> 

            <div class="add">
            <label>Comment</label>
            <br>
            <textarea type="text" class="w-100p comment-comment"></textarea>
            </div>
            <button class="do-addComment">
            <span class="T">Add comment</span>
            </button>
            </li>
            </ul>
            </div>

            <!-- events -->
            <div id="incident-event-block" class="field is-events clear">
            <label>Events</label>
            <div class="date-duration">

            </div>
            <ul class="events">

            <li class="event is-new">
            <div class="span-70p">
            <label>Description</label>
            <br>
            <input type="text" class="w-100p incident_event-description">
            </div>
            <div class="clearer">&nbsp;</div>
            <div class="span-70p">
            <label>Comment</label>
            <br>
            <textarea class="w-100p incident_event-comment"></textarea>
            </div>
            <div class="clearer">&nbsp;</div>
            <div class="span-70p">
            <span class="score">
            <span class="incident_event-cscore value"></span>
            </span>
            <label>Reliability score</label>
            <div class="score-editor">
            <div class="rail">
            <div class="slider" aria-disabled="false"><a class="ui-state-default ui-corner-all cursor" href="#" style="left: 0%;"></a></div>  
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
            <div class="clearer">&nbsp;</div>
            <div class="span-30p">
            <label>From</label>
            <br>
            <input class="incident_event-from hasDatepicker" type="text" id="dp1373294954230">
            </div>
            <div class="span-30p">
            <label>To</label>
            <br>
            <input class="incident_event-to hasDatepicker" type="text" id="dp1373294954231">
            </div>
            <div class="span-30p">
            <label></label>
            <br>
            <div class="pad">
            <button class="do-addEvent">
            <span class="T">Add Event</span>
            </button>
            </div>
            </div>
            <div class="clearer">&nbsp;</div>
            </li>
            </ul>
            </div>

            <!-- Locations -->
            <div id="incident-location-block" class="field is-locations">
            <label>Locations</label>
            <ul class="locations locations-incident">

            <li class="location is-new">
            <div class="search">
            <input type="text" class="with-clear">
            <button class="do-clear">
            <span>✓</span>
            </button>
            <button class="do-search do-search-embedded locations">
            <span class="T">Search</span>
            </button>
            </div>
            <!--          <button class="do-addLocation">
            <span class="T">Add location</span>
            </button> -->
            </li>
            </ul>
            </div>

            <!-- Description -->
            <div id="incident-description-block" class="field is-description">
            <label>Description</label>
            <div class="i18n with-en with-ar">
            <div lang="en">
            <textarea id="incident_description_en" type="text" class="w-100p"></textarea>
            </div>
            <div lang="ar">
            <textarea id="incident_description_ar" type="text" class="w-100p"></textarea>
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
          <label>Related bulletins</label>
          <div class="search">
          <input type="text" class="with-clear">
          <button class="do-clear">
          <span>✓</span>
          </button>
          <button class="do-search do-search-embedded bulletins">
          <span>Search</span>
          </button>
          </div>
          <ul class="elements elements-bulletins-incidents">

          </ul>
          <!--      <div class="drop-target">Drag &amp; drop bulletins here</div> -->
          </div>
          <div id="incident-incident-block" class="field is-incidents">
          <label>Related incidents</label>
          <div class="search">
          <input type="text" class="with-clear">
          <button class="do-clear">
          <span>✓</span>
          </button>
          <button class="do-search do-search-embedded incidents">
          <span>Search</span>
          </button>
          </div>
          <ul class="elements elements-incidents-incidents">

          </ul>
          <!--      <div class="drop-target">Drag &amp; drop incidents here</div> -->
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
