  <td class="is-selector">
    <input type="checkbox" {{model.checked}}>
  </td>
  <td class="is-description">
    <a href="#incident/{{model.id}}">
      <div class="title text">
        {{#if model.title_en }}
        <span >{{model.title_en}}</span>
        {{/if}}
        {{#if model.title_ar }}
        <span >{{model.title_ar}}</span>
        {{/if}}
      </div>
      <div class="meta text">
        {{#if model.actors.length}}
        <span class="actors">{{model.actors.length}}</span>
        {{pluralise word="actor" numItems=model.actors.length }} {{i18n.results.involved}}
        </span> 
        {{/if}}
      </div>
      <div class="details text">
        <span class="date">{{dateFormat model.incident_created}}</span>
        {{#if model.locations}}
          {{i18n.results.in}}
          {{commaSeparatedList model.incident_locations}}
        {{/if}}
      </div>
    </a>
  </td>
  <td class="is-status">
    {{#if model.most_recent_status_incident}}
      <span class="status">
        <span class="text">{{model.most_recent_status_incident}}</span>
      </span>
    {{/if}}
  </td>
  <td class="is-score">
    <span class="value">{{model.confidence_score}}</span>
  </td>
