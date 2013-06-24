define(
  [
    'jquery',
    'core/Core',
    'core/AbstractSpatialWidget'
  ], 
  function ($) {

    AjaxSolr.SpatialSearchWidget = AjaxSolr.AbstractSpatialWidget.extend({
      init: function () {
        var self = this;
     $('#map_data_conduit').click(function(){
            coords = $(this).data('coords').split(',');
            coords = '34.615,37.965'.split(',');
            var params = {}

            params.lat = coords[0];
            params.lng = coords[1];
            params.radius = 10;


      var objectType = '*:*';
          var current = $('.current > a > span > span').html()
      if(current == 'Bulletins'){
        objectType = "django_ct:*bulletin";
      }else if(current == 'Incidents'){
        objectType = "django_ct:*incident";
      }else{
        objectType = "django_ct:*actor";
      }
            var value = objectType + ' & ' + $("#search-bulletin").val();

            if (params){// && self.set(value)) {
    self.manager.store.remove('fq');
    self.set(params);
              self.doRequest();
            }
        });
      },

    mapSearch: function(coords){
            $('#map_data_conduit').data('coords',coords);
            $('#map_data_conduit').trigger('click');
    },
      afterRequest: function () {
        if(orignRequester == 'embbedSearchWidget'){
      return false;
        }
          var current = $('.current > a > span > span').html();
          $("#search-bulletin").val('');

          $("#"+current.toLowerCase()+"-table").empty();

          for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
             var doc = this.manager.response.response.docs[i];
             var htmlToAppend = '';
             if(current == 'Actors'){
          htmlToAppend = corrob_util.template_actor(doc);
             }else{
          htmlToAppend = corrob_util.template_bulletin_incident(doc,current.slice(0,-1));
             }	
             $("#"+current.toLowerCase()+"-table").append(htmlToAppend);
             $('#'+current.toLowerCase().slice(0,-1)+'_'+doc.id.split('.')[2]).data(current.toLowerCase().slice(0,-1)+'_data',doc);
          }
          $('.'+current.toLowerCase().slice(0,-1)+'-count').html(l); 
          $(".i18n").each(function(){
        corroborator.widgets.bindI18N(this)
          }); 
          $('table.'+current.toLowerCase()+' .'+current.slice(0,-1)+', .elements .Actor').click(function(e){
        var currentScreen = $('.current > a > span > span').html().toLowerCase().slice(0,-1);
                    $('#'+currentScreen+'-action_save').addClass('hidden');
                    $('#'+currentScreen+'-action_edit').removeClass('hidden');

              var numberSelected = parseInt(jQuery('#number-'+current.toLowerCase()+'-selected').html())
        var checkBox = jQuery(this).find('input');
              checkBox.prop("checked", !checkBox.prop("checked"));
              if (checkBox.is(':checked')) {
             var doc = $(this).data(current.toLowerCase().slice(0,-1)+'_data');
                 var requestURL = current.toLowerCase().slice(0,-1)+'/'+doc.id.split('.')[2] + '/view/';
                 $.ajax({url:requestURL}).done(function(data){
                              $('#view-placeholder-'+current.toLowerCase().slice(0,-1)).empty();
                              $('#view-placeholder-'+current.toLowerCase().slice(0,-1)).append(data);
            $("."+current.toLowerCase().slice(0,-1)+"-overlay:not(.hidden)").addClass('hidden');
                        $('.'+current.toLowerCase().slice(0,-1)+'-overlay').removeClass('hidden');

                 });

                                  numberSelected++;
              } else {
                $('.'+current.toLowerCase().slice(0,-1)+'-overlay').addClass('hidden');
                      numberSelected--;
              }
              jQuery('#number-'+current.toLowerCase()+'-selected').html(numberSelected);
          });
        corrob_util.$('.elements .Actor').hover(function(){ $(this).toggleClass('is-expanded') });
      }

    });

});
