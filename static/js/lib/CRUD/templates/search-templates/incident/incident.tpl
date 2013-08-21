<div class="header">
    <a href="#" class="display do-hide is-small">
      <span aria-hidden="true" data-icon="Y"></span>
      <span class="screen-reader-text">Hide</span>
    </a>
</div>
<div class="body" style="bottom: 49px;">
  <div class="Incident is-edited is-expanded">
    <div class="first span-66p">
      <div class="header">
        {{#if model.id}}
        <span class="id">
          ID <span id="view-actor-id" class="value out">{{model.django_id}}</span>
        </span>
        {{/if}}
        <div class="field is-title">
          <label>Title</label>
          <span class="i18n with-en with-ar">
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
            <span class="toggle">
              <span lang="en">EN</span><span lang="ar">AR</span>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="last span-33p">
      <div class="group details">
        <div class="field clear-after">

          <!-- score slider -->
          <div id="incident-score-block" class="is-score right">
            <label>Reliability Score</label>
            <span class="score">

              <span id="incident_confidence_score" class="value">
                {{model.confidence_score}}
              </span>
              <input type="hidden" 
                      class="incident-field"
                      name="confidence_score"
                      value="{{model.confidence_score}}">
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
              value="{{model.incident_assigned_user}}">
            <input
              type="hidden"
              name="assigned_user"
              class="incident-field"
              value="{{model.assigned_user}}">

          <button id="clear-user" class="do-clear">
            <span>✓</span>
          </button>
          </div>
        </div>
      </div>
    </div>
    <div class="first span-66p">

      <!-- end header -->
      <div class="body">

        <!-- Incident Crimes -->
        <div id="incident-crime-block" class="field is-crimes">
          <label>Crime</label>
          <ul class="crimes editor">

            <li class="crime is-new">
              <input type="text" value="Crime" class="with-select crimes-ac">
            </li>
          </ul>
        </div>

        <!-- Description -->
        <div id="incident-description-block" class="field detail is-description">
          <div class="i18n with-en with-ar">
            <label>Description</label>
            <div lang="en">
              <textarea 
                id="incident_details_en"
                name="incident_details_en"
                class="incident-field w-100p">{{model.incident_details_en}}</textarea>
            </div>
            <div lang="ar">
              <textarea 
                id="incident_details_ar"
                name="incident_details_ar"
                class="incident-field w-100p">{{model.incident_details_ar}}</textarea>
            </div>
            <span class="toggle">
              <span lang="en">EN</span><span lang="ar">AR</span>
            </span>
          </div>
        </div>

        <!-- comments -->
        <div id="incident-comment-block" class="field is-comments">
        </div>

          <!-- Actor selection -->
        <div id="incident-actor-list-block" class="field is-actors">
        </div>

        <!-- Bulletin selection block -->
        <div id="incident-bulletin-block" class="field is-bulletins">
        </div>

        <!-- Incident selection block -->
        <div id="incident-incident-block" class="field is-incidents">
        </div>

      </div>
    </div>
    <!-- second column -->
    <div class="last span-33p">
      <div class="body">

        <!-- events -->
        <div id="incident-event-block" class="field is-events clear">
        </div>

        <!-- Locations -->
        <div id="incident-location-block" class="field is-locations">
        </div>
        <!-- map block -->
        <div id="incident-map-block" class="field"></div>


        <!-- incident labels -->
        <div id="incident-location-block" class="field is-tags">
        </div>

      </div>
    </div>
    <div class="clearer"></div>
  </div>
</div>
<div class="footer with-revision">
  <div class="actions form when-not_revision">
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
    <button id="incident-action_save" class="do-save do-toggleRevision default">
      <span class="text t">Save changes</span>
    </button>
  </div>
</div>
