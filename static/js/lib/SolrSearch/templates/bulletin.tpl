  <td class="is-selector">
    <input type="checkbox" {{model.checked}}>
  </td>
  <td class="is-preview">&nbsp;</td>
  <td class="is-description">
    <a href="#bulletin/{{model.id}}">
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
        <span class="date">{{dateFormat model.bulletin_created}}</span>
        {{#if model.bulletin_locations}}
          in 
          {{#each model.bulletin_locations}}
            <span class="location">{{#if @index}}, {{/if}}{{this}}</span>
          {{/each}}
        {{/if}}

        {{#if model.bulletin_sources}}
          (
          {{#each model.bulletin_sources}}
            <span class="sources">{{this}}</span>
            {{#if @index}}
            , 
            {{/if}}
          {{/each}}
          )
        {{/if}}
      </div>
    </a>
    </td>
    <td class="is-status">
    {{#if model.most_recent_status_bulletin}}
    <span class="status">
    <span class="text">{{model.most_recent_status_bulletin}}</span>
    </span>
    {{/if}}
    </td>
  <td class="is-score">
  <span class="value">{{model.confidence_score}}</span>
  </td>
