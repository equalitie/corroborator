<div class="comment">
  <div class="text i18n">
     
    <span lang="en">{{model.comments_en}}</span>
    <span lang="ar">{{model.comments_ar}}</span>
    <span class="toggle">
      <span lang="en">EN</span><span lang="ar">AR</span>
    </span>
  </div>
    <div class="meta-history">
      <span class="date">{{dateFormat model.comment_created}}</span>
      by <span class="who">{{fetchUser model.assigned_user}}</span>
  </div>
</div>
