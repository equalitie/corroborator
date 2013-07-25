  <div class="span-70p">
    <label>Description</label><br>
    <input type="text" name="event_name_en" class="w-100p {{entityType}}-field bulletin_event-description">
  </div>
  <div class="clearer">&nbsp;</div>
  <div class="span-70p">
    <label>Comment</label><br>
    <textarea class="w-100p bulletin_event-comment {{entityType}}-field"></textarea>
  </div>
  <div class="clearer">&nbsp;</div>
  <div class="span-70p">
    <span class="score">
      <span class="bulletin_event-cscore value"></span>
      <input type="hidden" name="confidence_score" value="" class="{{entityType}}-field">
    </span>
    <!-- Reliability score slider -->
    <label>Reliability score</label>
    <div class="score-editor">
      <div class="rail">
        <div class="slider">
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
  <div class="clearer">&nbsp;</div>
  <div class="event-time-range">
  </div>
  <div class="span-30p">
    <label></label><br/>
    <div class="pad">
      <button class="do-addEvent">
        <span class="T">Add Event</span>
      </button>
    </div>
  </div>
  <div class="clearer">&nbsp;</div>
