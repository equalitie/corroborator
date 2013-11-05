<div class="version-dropdown"></div>
<div class="version-description">
  <label>REVISIONS</label>

  <div class="drop-down-container">
    <p class="selected-revision-label">
      {{comments.[0].status_label}} - {{dateFormat comments.[0].comment_created}}</p>
    <button class="drop-down-handle">
      <span aria-hidden="true" data-icon="d"></span>
      <span class="screen-reader-text">show revision list</span>
    </button>

    <ul class="all-revisions hidden">
      {{#each comments}}
      <li class="revision-label">{{status_label}} - {{dateFormat comment_created}}</li>
      {{/each}}
    </ul>
  </div>

  <textarea 
    class="version-description-text"
    disabled="true"
    cols="50"
    rows="10">{{comments.[0].comments_en}}</textarea>
</div>
