<span class="text T" data-key="{{model.key}}" data-filter="{{model.filterName}}">
  {{#if model.name_en}}
    {{model.name_en}}({{model.numItems}})
  {{else}}
    {{model.filterName}}({{model.numItems}})
  {{/if}}
</span>
