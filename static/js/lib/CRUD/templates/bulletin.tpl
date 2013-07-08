<div data-wireframe="bulletin-view" class="bulletin-overlay overlay WIREFRAME">
          <div class="header">
            <button class="do-hide is-small">
              <span class="T">close</span>
            </button>
          </div>
          <div id="view-placeholder-bulletin" class="body" style="bottom: 50px;">
<script type="text/javascript">
    gl_ac_labels_list = [];
    gl_ac_users_list = [{label:"admin",id:"1"}];
    special_global_ac_sources_list = [];
</script>
 <form id="bulletin_form" onsubmit="return false;">
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
    
    <h2 class="title">
          <label>Title</label>
    <span id="bulletin-title-block" class="i18n with-en with-ar">
    <div lang="en">
    <textarea id="bulletin_title_en" type="text" class="validate[required] w-100p"></textarea></div>
    <div lang="ar">
    <textarea id="bulletin_title_ar" type="text" class="w-100p"></textarea></div>
    <span class="toggle"><span lang="en">EN</span><span lang="ar">AR</span></span></span></h2>
  </div>
  <div id="bulletin-group-block-ne" class="body bulletin-not-expanded-edit">
    <div id="bulletin-group-block" class="group details">
      <div class="field clear-after">
        <div id="bulletin-score-block" class="is-score right">
          <label>Score</label>
          <span class="score">
  
            <span id="bulletin_confidence_score" class="value">0</span>
  
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
          </span>
        </div>
        <div id="bulletin-assignment-block" class="is-assigned-to left">
          <label>Assigned to</label>
  
    <input id="user-ac-bulletin_1" type="text" class="validate[required] with-clear ui-autocomplete-input" value="admin" autocomplete="off"><span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span> 
  
          <button id="clear-user" class="do-clear">
            <span>✓</span>
          </button>
        </div>
      </div>
    </div>
    <div id="bulletin-source-block" class="field is-sources">
      <label>Sources</label>
      <ul class="sources editor">
  
  <li class="source is-new">
    <input class="source-ac with-select ui-autocomplete-input" type="text" value="Source" autocomplete="off"><span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>
  </li>
      </ul>
    </div>
    <div id="bulletin-label-block" class="field is-tags">
      <label>Labels</label>
      <ul class="tags editor">
  
        <li class="tag is-new">
          <input type="text" value="Label" class="labels-ac with-select ui-autocomplete-input" autocomplete="off"><span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>
        </li>
      </ul>
    </div>

    <div id="incident-comment-block" class="field is-comments">
      <label>Comments</label>
      <ul class="comments">
        
        <li class="comment is-new">
        <div id="incident-status-block" class="add">
          <label>Status</label>
          <br>
          <select id="bulletin_status">

            <option value="Select status">Select Status</option>
                
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
    <div id="bulletin-event-block" class="field is-events clear">
      <label>Events</label>
      <div class="date-duration">
       
      </div>
      <ul class="events">
  
        
<li class="event is-new">
              <div class="span-70p">
                <label>Description</label>
                <br>
                <input type="text" class="w-100p bulletin_event-description">
              </div>
              <div class="clearer">&nbsp;</div>
              <div class="span-70p">
                <label>Comment</label>
                <br>
                <textarea class="w-100p bulletin_event-comment"></textarea>
              </div>
              <div class="clearer">&nbsp;</div>
              <div class="span-70p">
                <span class="score">
                  <span class="bulletin_event-cscore value"></span>
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
                <input class="bulletin_event-from hasDatepicker" type="text" id="dp1373273955968">
              </div>
              <div class="span-30p">
                <label>To</label>
                <br>
                <input class="bulletin_event-to hasDatepicker" type="text" id="dp1373273955969">
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
    <div id="bulletin-location-block" class="field is-locations">
      <label>Locations</label>
      <ul class="locations locations-bulletin">
  
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
    <div id="bulletin-media-block" class="field is-media">
      <div id="bulletin-video-player" clas="hidden"></div>  
      <div class="bulletin-preview preview"> </div>
      <label>Media</label>
  <div id="bulletin-media-search-block" class="search">
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

      <ul class="bulletin-media media">
  
      </ul>
      <div class="clearer">&nbsp;</div>
<!--      <div class="media editor">
        <div class="drop-target">Drag &amp; drop files here</div>
      </div>
      <button class="do-addMedia">
        <span class="T">Add media</span>
      </button> -->
    </div>
    <div id="bulletin-description-block" class="field is-description">
      <label>Description</label>
      <div class="i18n with-en with-ar">
        <div lang="en">
          <textarea id="bulletin_description_en" type="text" class="w-100p"></textarea>
        </div>
        <div lang="ar">
          <textarea id="bulletin_description_ar" type="text" class="w-100p"></textarea>
        </div>
        <span class="toggle">
          <span lang="en">EN</span><span lang="ar">AR</span>
        </span>
      </div>
    </div>
    <div id="bulletin-actor-list-block" class="field is-actors">
      <label>Actors</label>
      <div id="bulletin-actor-search-block" class="search">
        <input type="text" class="with-clear">
        <button class="do-clear">
          <span>✓</span>
        </button>
        <button class="do-search do-search-embedded actors">
          <span>Search</span>
        </button>
      </div>
      <ul class="elements elements-bulletin">
  
      </ul>
<!--      <div class="drop-target">Drag &amp; drop actors here</div> -->
    </div>
<div id="bulletin-bulletin-block" class="field is-bulletins">
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
      <ul class="elements elements-bulletins-bulletins">
  
      </ul>
<!--      <div class="drop-target">Drag &amp; drop bulletins here</div> -->
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
<!--              <button class="do-select">
                <span class="text T">Select</span>
              </button>
-->              <button id="bulletin-action_edit" class="do-select default hidden">
                <span class="text T">Edit</span>
              </button>
              <button id="actor-action_cancel" class="hidden do-hide default">
                <span class="text T">Canel</span>
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
