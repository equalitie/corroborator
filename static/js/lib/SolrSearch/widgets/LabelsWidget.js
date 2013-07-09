define(
  [
    'jquery',
    'core/Core',
    'core/AbstractFacetWidget'
  ], 
  function($) {
    AjaxSolr.labelsWidget = AjaxSolr.AbstractFacetWidget.extend({
    init: function(){
      var self = this;
      var facet = 'adult';
      self.manager.store.remove('fq');
      self.add(facet);
      self.doRequest();




      if(this.field != 'status_exact'){return false;}
      // handle bulletin status clicks
      $('#bulletin-status-filter, #bulletin-assigned-filter')
        .on('click', '.zbulletin-option', function(){

        var facet = $(this).html().split('(')[0];

        if ($(this).parent().hasClass('selected')) {
          $(this).parent().removeClass('selected');
          self.manager.store.remove('fq');
          $('.selected').removeClass('selected');
          self.doRequest();
          return false;
        }
        else {
          var facet = $(this).html().split('(')[0];
          var current = $('.current > a > span > span').html();
          if(current == 'Bulletins'){
            objectType = "django_ct:*bulletin";
          }
          else if(current == 'Incidents'){
            objectType = "django_ct:*incident";
          }
          else{
            objectType = "django_ct:*actor";
          }
          var value = objectType;

          self.manager.store.params.q.value = value;

          if(facet !== 'Any'){
          }
          else {
            self.manager.store.remove('fq');
          }
          $('.selected').removeClass('selected');	
          $(this).parent().addClass('selected');
      }

    });

    // handle incident filter clicks
    $('#incident-status-filter, #incident-assigned-filter, #incident-crime-filter')
      .on('click', '.bulletin-option', function(){

        var facet = $(this).html().split('(')[0];
        if($(this).parent().hasClass('selected')){
          $(this).parent().removeClass('selected');
          self.manager.store.remove('fq');
          $('.selected').removeClass('selected');
            
          self.doRequest();
          return false;
        }
        else {
          facet = $(this).html().split('(')[0];
          var current = $('.current > a > span > span').html();
          if(current === 'Bulletins') {
            objectType = "django_ct:*bulletin";
          }
          else if (current === 'Incidents') {
            objectType = "django_ct:*incident";
          }
          else {
            objectType = "django_ct:*actor";
          }
          var value = objectType;
          self.manager.store.params.q.value = value;


          if(facet !== 'Any'){
            self.add(facet);
          }else{
            self.manager.store.remove('fq');
          }
          $('.selected').removeClass('selected');	
          $(this).parent().addClass('selected');
          self.doRequest();
      }
    });


  },// end init


  afterRequest: function () {
    if($('#main_spinner').hasClass('hidden')){

      $('#main_spinner').removeClass('hidden');
    }
      var current = $('.current > a > span > span').html();
    //if(initialLoad){
     //current = initialCurrentGlobal;
    //}

      var links = [];
      if(this.manager.store.params.q.value.indexOf('bulletin') >= 0){
        if(this.field == 'bulletin_labels_exact'){
          $("#"+current.toLowerCase()+"_tags").empty();
          var labels = this.manager.response.facet_counts.facet_fields.bulletin_labels_exact;
          for(k in labels) {
            var labelToAppend = this.template_labels(k,labels[k],current.toLowerCase().slice(0,-1));
            $("#"+current.toLowerCase()+"_tags").append(
                      $(labelToAppend).click(this.clickHandler(k))
                    );
          }
        }else if(this.field == 'most_recent_status_bulletin_exact'){
          $('.'+current.toLowerCase().slice(0,-1)+'_status_filter').remove();
          var status = this.manager.response.facet_counts.facet_fields.bulletin_status_exact;
          for(k in status) {
            var statusToAppend = this.template_status(k,status[k],current.toLowerCase().slice(0,-1));
            $('#'+current.toLowerCase().slice(0,-1)+'-status-filter').append(
              $(statusToAppend).click(this.clickHandler(k)));
          }
        }else if(this.field == 'bulletin_assigned_exact'){
          $('.'+current.toLowerCase().slice(0,-1)+'_assigned_filter').remove();
          var status = this.manager.response.facet_counts.facet_fields.bulletin_assigned_exact;
          for(k in status) {
            var statusToAppend = this.template_assigned(k,status[k],current.toLowerCase().slice(0,-1));
            $('#'+current.toLowerCase().slice(0,-1)+'-assigned-filter').append(
              $(statusToAppend).click(this.clickHandler(k)));
          }
        }
      }else  if(this.manager.store.params.q.value.indexOf('incident') >= 0){
        if(this.field == 'incident_labels_exact'){
          $("#"+current.toLowerCase()+"_tags").empty();
          var labels = this.manager.response.facet_counts.facet_fields.incident_labels_exact;
          for(k in labels) {
            var labelToAppend = this.template_labels(k,labels[k],current.toLowerCase().slice(0,-1));
            $("#"+current.toLowerCase()+"_tags").append(
                      $(labelToAppend).click(this.clickHandler(k))
                    );
          }
        }else if(this.field == 'most_recent_status_incident_exact'){
          $('.'+current.toLowerCase().slice(0,-1)+'_status_filter').remove();
          var status = this.manager.response.facet_counts.facet_fields.incident_status_exact;
          for(k in status) {
            var statusToAppend = this.template_status(k,status[k],current.toLowerCase().slice(0,-1));
            $('#'+current.toLowerCase().slice(0,-1)+'-status-filter').append(
              $(statusToAppend).click(this.clickHandler(k)));
          }
        }else if(this.field == 'incident_assigned_exact'){
          $('.'+current.toLowerCase().slice(0,-1)+'_assigned_filter').remove();
          var status = this.manager.response.facet_counts.facet_fields.incident_assigned_exact;
          for(k in status) {
            var statusToAppend = this.template_assigned(k,status[k],current.toLowerCase().slice(0,-1));
            $('#'+current.toLowerCase().slice(0,-1)+'-assigned-filter').append(
              $(statusToAppend).click(this.clickHandler(k)));
          }
        }else if(this.field == 'crimes_exact'){
          $('.'+current.toLowerCase().slice(0,-1)+'_crime_filter').remove();
          var status = this.manager.response.facet_counts.facet_fields.crimes_exact;
          for(k in status) {
            var statusToAppend = this.template_crime(k,status[k],current.toLowerCase().slice(0,-1));
            $('#'+current.toLowerCase().slice(0,-1)+'-crime-filter').append(
              $(statusToAppend).click(this.clickHandler(k)));
          }
        }
      }else{
        if(this.field == 'civilian_en_exact'){
                            $("#civilian-filter").empty();
                            var labels = this.manager.response.facet_counts.facet_fields.civilian_en_exact;
                            for(k in labels) {
                                    var labelToAppend = this.template_actor(k,labels[k],current.toLowerCase().slice(0,-1));
                                    $("#civilian-filter").append(
                                                                            $(labelToAppend).click(this.clickHandler(k))
                                                                    );
                            }
                    }else if(this.field == 'sex_en_exact'){
                            $("#gender-filter").empty();
                            var labels = this.manager.response.facet_counts.facet_fields.sex_en_exact;
                            for(k in labels) {
                                    var labelToAppend = this.template_actor(k,labels[k],current.toLowerCase().slice(0,-1));
                                    $("#gender-filter").append(
                                                                            $(labelToAppend).click(this.clickHandler(k))
                                                                    );
                      }
        }else if(this.field == 'age_en_exact'){
                            $("#age-filter").empty();
                            var labels = this.manager.response.facet_counts.facet_fields.age_en_exact;
                            for(k in labels) {
                                    var labelToAppend = this.template_actor(k,labels[k],current.toLowerCase().slice(0,-1));
                                    $("#age-filter").append(
                                                                            $(labelToAppend).click(this.clickHandler(k))
                                                                    );
                            }
                    }else if(this.field == 'nationality_en_exact'){
                            $("#nationality-filter").empty();
                            var labels = this.manager.response.facet_counts.facet_fields.nationality_en_exact;
                            for(k in labels) {
                                    var labelToAppend = this.template_actor(k,labels[k],current.toLowerCase().slice(0,-1));
                                    $("#nationality-filter").append(
                                                                            $(labelToAppend).click(
      this.clickHandler(k))
                                                                    );
                            }
                    }		
                    
      
      }



    /*
      var fq = this.manager.store.values('fq');
      for (var i = 0, l = fq.length; i < l; i++) {
            var labelToAdd = this.template_labelSelected(fq[i].split(':')[1],0);
        links.push($(labelToAdd).click(self.removeFacet(fq[i])));
      }
    if (links.length > 1) {
      links.unshift($('<li><a href="#"></a></li>').text('remove all').click(function () {
        var $target = $('#selected-tags');
        $target.empty();
        self.manager.store.get('q').val('*:*');
        self.manager.store.remove('fq');
        self.doRequest();
        return false;
      }));
    }
      if (links.length) {
        $('#selected-label').removeClass('hidden');
        var $target = $('#selected-tags');
        $target.empty();
        $('#selected-label').addClass('hidden');
        for (var i = 0, l = links.length; i < l; i++) {
          $target.append(links[i]);
        }
      }
    */

      $('#main_spinner').addClass('hidden');
    },



    template_labels: function(name,count,current){

      var output =                '<li class="'+current+'_tag tag">' +
                            '<span class="text">'+name+'</span>' +
                            '<span class="value">'+count+'</span>' +
                          '</li>';
      return output;
      },
    template_status: function(name, count,current){
    var output=	'<li class="option '+current+'_status_filter">'+
        '<span class="'+current+'-option text T">'+name+'('+count+')</span>'+
      '</li>';
    return output;
    },
    template_crime: function(name, count,current){
    var output=	'<li class="option '+current+'_crime_filter">'+
        '<span class="'+current+'-option text T">'+name+'('+count+')</span>'+
      '</li>';
    return output;
    },
    template_assigned: function(name, count,current){
    var output=	'<li class="option '+current+'_assigned_filter">'+
        '<span class="'+current+'-option text T">'+name+'('+count+')</span>'+
      '</li>';
    return output;
    },
    template_actor: function(name,count){
    var output=     '<li class="option">'+
                    '<span class="text T">'+name+'('+count+')</span>'+
            '</li>';
    return output;
    },
    template_labelSelected: function(name, count,current){
            var output = '<li class="'+current+'_tag">'+
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
        if (self.manager.store.removeByValue('fq', facet)) {
            var $target = $('#selected-tags');
        $target.empty();
        $('#selected-label').addClass('hidden');
          self.doRequest();
        }
        return false;
      };
    }
      
    });
});




