<!-- Comment status field  dropdown should match others -->
<div class="clearer"></div>
<!-- Comment content field -->
<div class="add">

  <div class="i18n with-en with-ar">
      <div lang="en">
      <label>{{i18n.comment.Comment}}</label>
        <textarea 
          id="comments_en"
          name="comments_en"
          class="comment-field w-100p">{{model.comments_en}}</textarea>
      </div>
      <div lang="ar">
        <textarea 
          id="comments_ar"
          name="comments_ar"
          class="comment-field w-100p">{{model.comments_ar}}</textarea>
      </div>
  <span class="toggle">
  <span lang="en">EN</span><span lang="ar">AR</span>
  </span>
  </div>



</div>


<button class="do-addComment">
  <span class="T">{{i18n.comment.Save_comment}}</span>
</button>
