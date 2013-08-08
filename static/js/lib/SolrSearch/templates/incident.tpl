  <td class="is-selector">
    <input type="checkbox" {{model.checked}}>
  </td>
  <td class="is-preview">&nbsp;</td>
  <td class="is-description">
    <a href="#incident/{{model.id}}">
      <div class="title text i18n">
         
        <div lang="en">{{model.title_en}}</div>
        <div lang="ar">{{model.title_ar}}</div>
        <span class="toggle">
          <span lang="en">EN</span><span lang="ar">AR</span>
        </span>
      </div>
      <div class="meta text">
        <span class="actors">{{actors}}</span> actors involved
      </div>
      <div class="details text">
        <span class="date">{{dateFormat model.incident_created}}</span>
        {{#if model.locations}}
        in <span class="location">{{model.locations}}</span>
        {{/if}}
        {{#if model.sources}}
        (<span class="sources">{{model.sources}}</span>)
        {{/if}}
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
