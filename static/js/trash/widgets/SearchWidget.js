//GLOBALS

(function ($) {

AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
  init: function () {
    var self = this;
    $('#predefined_options').on('click','.incident-predefined, .bulletin-predefined .actor-predefined', function(){
        var value = $(this).children('input').val();
        var params = self.manager.store.parseString(value);
      //	self.set(value);
        $('#main_spinner').removeClass('hidden');
        self.doRequest();
    });


    $('#search-bulletin').keyup(function(e){
      if(e.keyCode === 13){
        $('#do-search-main').trigger('click');
      }
    });	

    $('#do-search-main').click(function() {
      var objectType = '*:*';
	    var current = $('.current > a > span > span').html();
      if(current === 'Bulletins'){
        objectType = "django_ct:*bulletin";
      }
      else if(current === 'Incidents'){
        objectType = "django_ct:*incident";
      } else {
        objectType = "django_ct:*actor";
      }
      var value = objectType + ' & ' + $("#search-bulletin").val();

      if (value){
        self.manager.store.remove('fq');
        self.set(value);
        var current_query = self.manager.store.string();
        corrob_util.$('#'+current.toLowerCase().slice(0,-1)+'-content').data(current.toLowerCase().slice(0,-1)+'-last-search',current_query);	
        $('#main_spinner').removeClass('hidden');
        self.doRequest();
      }
    });
  },

  afterRequest: function () {
    if(orignRequester === 'embbedSearchWidget'){
      return false;
    }
    var current = $('.current > a > span > span').html();
    if(initialLoad){
      current = initialCurrentGlobal;
    }

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
        $('.is-selector > input').click(function(){
        var checkBox = jQuery(this);
        var numberSelected = parseInt(jQuery('#number-'+current.toLowerCase()+'-selected').html());
        if (checkBox.is(':checked')) {
          numberSelected++;
        }else{
          numberSelected--;
        }
              jQuery('#number-'+current.toLowerCase()+'-selected').html(numberSelected);
      });
        $('table.'+current.toLowerCase()+' .'+current.slice(0,-1)+' .is-description, .elements .Actor .content').click(function(e){
      var current = $('.current > a > span > span').html();
      var currentScreen = $('.current > a > span > span').html().toLowerCase().slice(0,-1);
      $('#'+currentScreen+'_action_result').addClass('hidden');
                  $('#'+currentScreen+'-action_save').addClass('hidden');
      $('.'+currentScreen+'-overlay-annotate').addClass('hidden');
                  $('#'+currentScreen+'-action_edit').removeClass('hidden');
      var doc = '';
      if(currentScreen == 'actor'){
                          doc = $(this).closest('.elements .Actor').data(current.toLowerCase().slice(0,-1)+'_data');			
      }else{
          doc = $(this).closest('table.'+current.toLowerCase()+' .'+current.slice(0,-1)).data(current.toLowerCase().slice(0,-1)+'_data');
      }
      var requestURL = current.toLowerCase().slice(0,-1)+'/'+doc.id.split('.')[2] + '/view/';
            $.ajax({url:requestURL}).done(function(data){
                            $('#view-placeholder-'+current.toLowerCase().slice(0,-1)).empty();
                            $('#view-placeholder-'+current.toLowerCase().slice(0,-1)).append(data);
          $("."+current.toLowerCase().slice(0,-1)+"-overlay:not(.hidden)").addClass('hidden');
                      $('.'+current.toLowerCase().slice(0,-1)+'-overlay').removeClass('hidden');
          corrob_util.$('#view-placeholder-'+current.toLowerCase().slice(0,-1)).on('click','.do-play',function(){ corrob_util.loadVideoPlayer(corrob_util.$(this).siblings('input').val()); });

             });
        });
      corrob_util.$('.elements .Actor').hover(function(){ $(this).toggleClass('is-expanded') });
    

    $('#main_spinner').addClass('hidden');
  
	}
});

})(jQuery);
