define(
  [
    'jquery',
    'core/Core',
    'core/AbstractWidget'
  ], 
  function($) {
    AjaxSolr.CurrentFiltersWidget = AjaxSolr.AbstractWidget.extend({

    start: 0,

    afterRequest: function () {
    if($('#main_spinner').hasClass('hidden')){

      $('#main_spinner').removeClass('hidden');
    }
      var self = this;
      var links = [];
    var current = $('.current > a > span > span').html().toLowerCase().slice(0,-1);
    if(initialLoad){
     current = initialCurrentGlobal;
            if(current=="Actors"){
                       Manager.store.removeByValue('sort', 'actor_created');
                       Manager.store.addByValue('sort', 'bulletin_created');
                       Manager.store.addByValue('q', 'django_ct:*bulletin');
                       initialCurrentGlobal = 'Bulletins';
                       Manager.doRequest();
               }else if(current == 'Bulletins'){
                    Manager.store.removeByValue('sort', 'bulletin_created');
                    Manager.store.addByValue('sort', 'incident_created');
                    Manager.store.addByValue('q', 'django_ct:*incident');
                    initialCurrentGlobal = 'Incidents';
                    Manager.doRequest();
               }else{
                    Manager.store.removeByValue('sort', 'incident_created');
               }
     if(current == "Incidents"){
            initialLoad = false;
     }
     current = current.toLowerCase().slice(0,-1);
    }
    current_query = self.manager.store.string();
    $('#'+current+'-content').data(current+'-last-search',current_query);

    /*  var q = this.manager.store.get('q').val();
      if (q != '*:*') {
        links.push($('<a href="#"></a>').text('(x) ' + q).click(function () {
          self.manager.store.get('q').val('*:*');
          self.doRequest();
          return false;
        }));
      }
    */

      var fq = this.manager.store.values('fq');
      for (var i = 0, l = fq.length; i < l; i++) {
        if (fq[i].match(/[\[\{]\S+ TO \S+[\]\}]/)) {
            var field = fq[i].match(/^\w+:/)[0];
            var value = fq[i].substr(field.length + 1, 10);
      value += ' - ' + fq[i].substr(field.length+value.length + 1+14, 10);
            var labelToAdd = this.template_labelSelected(value,0);
            links.push($(labelToAdd).click(self.removeFacet(fq[i])));
          }
          else {
      var labelToAdd = this.template_labelSelected(fq[i].split(':')[1],0);
            links.push($(labelToAdd).click(self.removeFacet(fq[i])));
          }
      }
    if (links.length > 1) {
      links.unshift($('<li><a href="#"></a></li>').text('remove all').click(function () {
        var current = $('.current > a > span > span').html().toLowerCase().slice(0,-1);
        var $target = $('#'+current+'-selected-tags');
        $target.empty();
        $('#'+current+'-selected-label').addClass('hidden');
        self.manager.store.get('q').val('django_ct:*'+current);
        self.manager.store.remove('fq');
        self.doRequest();
        return false;
      }));
    }
      if (links.length) {
        $('#'+current+'-selected-label').removeClass('hidden');	
        var $target = $('#'+current+'-selected-tags');
        $target.empty();
        for (var i = 0, l = links.length; i < l; i++) {
          $target.append(links[i]);
        }
      }

      $('#main_spinner').addClass('hidden');
    },
    template_labelSelected: function(name, count){
      var output = '<li class="tag">'+
                          '<span class="text">'+name+'</span>'+
                          '<button class="do-clear">'+
                            '<span>~\~S</span>'+
                          '</button>'+
                        '</li>';
    return output;
    },
    removeFacet: function (facet) {
      var self = this;
      return function () {
    var current = $('.current > a > span > span').html().toLowerCase().slice(0,-1);
        if (self.manager.store.removeByValue('fq', facet)) {
      var $target = $('#'+current+'-selected-tags');
        $target.empty();
        $('#'+current+'-selected-label').addClass('hidden');	
          self.doRequest();
        }
        return false;
      };
    }

    });
});

