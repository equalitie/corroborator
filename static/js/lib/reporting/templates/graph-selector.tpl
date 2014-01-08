<div class="filter">
  <label>{{by}}</label>
  <!-- available graphs -->
  <select id="graph-type" name="">
    {{#each collection}}
      <option value="{{this.key}}">{{this.label}}</option>
    {{/each}}
  </select>

  <!--user selector -->
  <label class="user-select hidden">User</label>
  <select id="" name="" class="user-select hidden">
    {{#each users}}
      <option value="{{this.id}}">{{this.label}}</option>
    {{/each}}
  </select>
</div>
