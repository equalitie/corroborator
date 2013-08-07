<!-- Comment status field  dropdown should match others -->
<div id="{{entityType}}-status-block" class="add">
  <label>Status</label><br/>
  <select name="status" 
          id="{{entityType}}_status" 
          class="comment-field">
    <option selected value="">Select Status</option>
    {{#each statuses}}
      <option value="{{this.resource_uri}}">{{this.comment_status}}</option>
    {{/each}}
  </select>
</div>

<div class="clearer"></div>
<!-- Comment content field -->
<div class="add">
  <label>Comment</label><br/>
  <textarea class="w-100p comment-comment comment-field"
            name="comments_en">{{model.comments_en}}</textarea>
</div>
<button class="do-addComment">
  <span class="T">Save comment</span>
</button>
