define(
  [
    'jquery',
    'core/Core',
    'core/AbstractWidget'
  ], 
  function($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({

  afterRequest: function () {
    $(this.target).empty();
    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
      var doc = this.manager.response.response.docs[i];
      $(this.target).append(this.template(doc));

//      var items = [];
//     items = items.concat(this.facetLinks('topics', doc.topics));
//    items = items.concat(this.facetLinks('organisations', doc.organisations));
//      items = items.concat(this.facetLinks('exchanges', doc.exchanges));

//      var $links = $('#links_' + doc.id);
//      $links.empty();
//      for (var j = 0, m = items.length; j < m; j++) {
//        $links.append($('<li></li>').append(items[j]));
//      }
    }
  },

  template: function (doc) {
    var snippet = '';
    if (doc.text.length > 300) {
      snippet += doc.name + ' ' + doc.text.substring(0, 300);
      snippet += '<span style="display:none;">' + doc.text.substring(300);
      snippet += '</span> <a href="#" class="more">more</a>';
    }
    else {
      snippet += doc.dateline + ' ' + doc.text;
    }

    var output = '<div><h2>' + doc.name + '</h2>';
    output += '<p id="links_' + doc.id + '" class="links"></p>';
    output += '<p>' + snippet + '</p></div>';
    return output;
  }
});

})
