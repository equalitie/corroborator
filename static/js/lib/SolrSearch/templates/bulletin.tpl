  <td class="is-selector">
    <input type="checkbox" {{model.checked}}>
  </td>
  <td class="is-preview">&nbsp;</td>
  <td class="is-description">
    <a href="#bulletin/0">
      <div class="title text i18n">
        <span lang="en">{{model.title_en}}</span>
        <span lang="ar">{{model.title_ar}}</span>
        <span class="toggle">
          <span lang="en">EN</span><span lang="ar">AR</span>
        </span>
      </div>
      <div class="meta text">
        <span class="actors">{{total}}</span> actors involved
      </div>
      <div class="details text">
        <span class="date">{{model.bulletin_created}}</span> in <span class="location">{{model.location}}</span> (<span class="sources">{{model.sources}}</span>)
      </div>
    </a>
    </td>
    <td class="is-status">
    <span class="status">
    <span class="text">reviewed</span>
    </span>
    </td>
  <td class="is-score">
  <span class="value">{{model.confidence_score}}</span>
  </td>
