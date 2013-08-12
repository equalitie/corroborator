<label>{{label}}</label>
<div class="search">
  <input type="text" class="with-clear">
  <button class="do-clear">
    <span>✓</span>
  </button>
  <button class="do-search do-search-embedded medias">
    <span>Search</span>
  </button>
</div>

<ul class="media"></ul>

<button class="do-upload upload-media">
  <span>Upload New Media</span>
</button>
<select {{#if multiple}} multiple="{{multiple}}"{{/if}} name="{{name}}" id="media-added-field"
  class="{{entityType}}-field hidden"></select>
