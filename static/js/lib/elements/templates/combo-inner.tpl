<input type="hidden" value="{{search_request}}" />
<span class="text T">
  <span class="select-search">
    {{name}}
  </span>
  {{#if_eq search_request compare='predefined_search' }}
    <span aria-hidden="true" data-icon="x" class="delete-saved-search"></span>
    <span class="screen-reader-text">Delete Saved search</span>
  {{/if_eq}}
</span>

