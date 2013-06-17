//GLOBALS
var orignRequester = '';
var gl_annotate = '';
(function ($) {

AjaxSolr.EmbeddedSearchWidget = AjaxSolr.AbstractTextWidget.extend({
  init: function () {
    var self = this;

    $('#view-placeholder-bulletin,#view-placeholder-incident,#view-placeholder-actor,#view-placeholder-annotate-bulletin,#view-placeholder-annotate-incident,#view-placeholder-annotate-actor').on('click','.do-search-embedded',function() {
	if($(this).closest('.overlay').attr('class').contains('annotate')){
		gl_annotate = '-annotate';
	}
	var objectType = '*:*';
	    var current = $(this).attr('class').split(/\s+/)[2];
	if(current == 'bulletins'){
		objectType = "django_ct:*bulletin";
	}else if(current == 'incidents'){
		objectType = "django_ct:*incident";
	}else if(current == 'actors'){
		objectType = "django_ct:*actor";
	}else if(current == 'medias'){
		objectType = "django_ct:*media";
	}else{
		objectType = "django_ct:*location";
	}
        var value = objectType + ' & ' + $(this).siblings('input').val();
	$(this).siblings('input').val('');
	var currentView = $('.current > a > span > span').html();
	$('.embedded-search-'+currentView.toLowerCase().slice(0,-1)).data('current-search',current);
	orignRequester = 'embbedSearchWidget';
        if (value){// && self.set(value)) {
self.manager.store.remove('fq');
self.set(value)
	$('#main_spinner').removeClass('hidden');
          self.doRequest();
        }
    });
  },
  afterRequest: function () {
	if(orignRequester == 'embbedSearchWidget'){
	    orignRequester = '';
	    var current = $('.current > a > span > span').html();
	    var currentView = current.toLowerCase().slice(0,-1);
	    var currentSearch = $('.embedded-search-'+current.toLowerCase().slice(0,-1)).data('current-search').slice(0,-1);
	    $('.EmbeddedSearch-'+ current.toLowerCase().slice(0,-1) +' .elements').empty();

	    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
		     var doc = this.manager.response.response.docs[i];
		     var htmlToAppend = '';
		     if(currentSearch == 'actor'){
			htmlToAppend = this.template_actor(doc,currentSearch);
		     }else if(currentSearch == 'media'){
			htmlToAppend = this.template_media(doc,currentSearch);
			htmlToAppend = '<ul class="media">' + htmlToAppend + '</ul>';
		     }else if(currentSearch == 'location'){
			htmlToAppend = this.template_location(doc,currentSearch);
			$('.EmbeddedSearch-'+currentView+' .elements').addClass('locations');
		     }else{
			htmlToAppend = this.template_bulletin_incident(doc,currentSearch);
		     }	
		     $('.EmbeddedSearch-'+currentView+' .elements').append(htmlToAppend);
	
		     $('#EmbeddedSearchElem_'+currentView+'_'+currentSearch+'_'+doc.id.split('.')[2]).data('EmbeddedSearchElem_'+currentView+'_'+currentSearch+'_'+doc.id.split('.')[2]+'_data',doc);
			$('#EmbeddedSearchElem_'+currentView+'_'+currentSearch+'_'+doc.id.split('.')[2]).hover(
			function(){
				if(currentSearch == 'actor'){
					$(this).children('.Actor').addClass('is-expanded')
				}else if(currentSearch == 'bulletin'){
					$(this).children('.Bulletin').addClass('is-expanded');
				}else{
					$(this).children('.Incident').addClass('is-expanded');
				}
			},
			function(){
				if(currentSearch == 'actor'){
					$(this).children('.Actor').removeClass('is-expanded')
				}else if(currentSearch == 'bulletin'){
					$(this).children('.Bulletin').removeClass('is-expanded');
				}else{
					$(this).children('.Incident').removeClass('is-expanded');
				}
			});
		     
	    }

	   $('.do-relate').click(function(){ corrob_util.relateEntity($(this).closest('li')) });
	   $('.do-add-embedded-actor, .do-add-embedded-location, .do-add-embedded-media').click(function(){
	
		var current = $('.current > a > span > span').html();
		var annotate = '';
		if(!corrob_util.$('.'+current.toLowerCase().slice(0,-1)+'-overlay-annotate').hasClass('hidden')){
                	annotate = '_annotate';
	        }
		var currentSearch = $('.embedded-search-'+current.toLowerCase().slice(0,-1)).data('current-search');
		var master = $(this).closest("[id^='EmbeddedSearchElem']");
		var copyData = master.data(master.attr('id')+'_data');
		var copyNode = master.clone();	
		
		copyNode.attr('id', current.toLowerCase().slice(0,-1) +'_'+currentSearch.slice(0,-1)+annotate+'_'+master.attr('id').split('_')[3]);
		var appendClass = '';
		if(currentSearch == 'actors'){
			var status = $(this).children('span').html();
			copyData.status = status;
			copyNode.find('.status > span').html(status);
			appendClass = 'elements-'+current.toLowerCase().slice(0,-1);
			$(copyNode).find('.is-expanded').removeClass('is-expanded');

			
		}else if(currentSearch == 'locations'){
			appendClass = 'locations-'+current.toLowerCase().slice(0,-1);
			$(copyNode).find('.hidden').removeClass('hidden');			
			$(copyNode).find('.do-add-embedded-location').addClass('hidden');	
		}else if(currentSearch == 'bulletins'){
			appendClass = 'elements-'+current.toLowerCase().slice(0,-1);
		}else if(currentSearch == 'medias'){
			currentSearch = currentSearch.slice(0,-1);
			appendClass = current.toLowerCase().slice(0,-1)+'-media';
			$(copyNode).find('.do-remove').removeClass('hidden');
			$(copyNode).find('.do-play').removeClass('hidden');
			$(copyNode).find('.do-add-embedded-media').remove();

		}else{
			appendClass = 'elements-'+current.toLowerCase().slice(0,-1);

		}
		$('.is-'+currentSearch+' > .'+appendClass+annotate).prepend(copyNode);
		$(copyNode).data(currentSearch.slice(0,-1)+'-data',copyData);
	   });

	   var current = $('.current > a > span > span').html();
	   var overlayHolder = $("."+current.toLowerCase().slice(0,-1)+"-overlay"+gl_annotate+":not(.hidden)")
	   gl_annotate = '';
	   if(!overlayHolder.hasClass('is-expanded')){
		overlayHolder.addClass('is-middle');
	   }
	if($.inArray(currentSearch,['actor','bulletin','incident']) != -1){
	   
	   $('.embedded-search-'+currentView +' > .footer').find('.search-entity').closest('.left').removeClass('hidden');
	   $('.embedded-search-'+currentView +' > .footer').find('.search-entity').html(currentSearch);
	   $('.search-entity').closest('button').click(function(){
		var entity = $(this).find('.search-entity').html();
		corrob_util.loadCreateNewEntity(entity);
	   });	   
	}else{
	   $('.embedded-search-'+currentView +' > .footer').find('.search-entity').closest('.left').addClass('hidden');

	}
	   $('.do-hideResults').click(function(){
	 	$('.embedded-search-'+current.toLowerCase().slice(0,-1)).addClass('hidden');
	        $("."+current.toLowerCase().slice(0,-1)+"-overlay:not(.hidden)").removeClass('is-middle');
	        $("."+current.toLowerCase().slice(0,-1)+"-overlay-annotate:not(.hidden)").removeClass('is-middle');
	   });


	   $('.embedded-search-'+current.toLowerCase().slice(0,-1)).removeClass('hidden');
	    $(".i18n").each(function(){
		corroborator.widgets.bindI18N(this)
	    }); 
	}

	$('#main_spinner').addClass('hidden');
  },


  template_location: function (doc,currentView) {
var trimmedId = (doc.id).split('.')[2];
var current = $('.current > a > span > span').html().toLowerCase().slice(0,-1);
var output = '<li id="EmbeddedSearchElem_'+current+'_'+currentView+'_'+trimmedId+'" class="location" style="height:22px;">'+
          '<div class="actions">'+
            '<button class="do-add-embedded-location is-small">'+
              '<span class="text T">Add</span>'+
            '</button>'+
            '<button class="hidden do-remove is-small">'+
              '<span class="text T">Remove</span>'+
            '</button>'+
          '</div>'+
          '<div class="content">'+
            '<div class="name">'+doc.name+'</div>'+
          '</div>'+
        '</li>';
return output;
},

  template_bulletin_incident: function (doc,currentView) {
var dateToAdd = '';
if('times' in doc){
	if(doc.times.length > 0){
		var d = doc.times[0].split('T')[0];
		var dateElems = d.split('-');
		dateToAdd = new Date(dateElems[0], (dateElems[1] - 1), dateElems[2]);
		dateToAdd = dateToAdd.getDate()+'/'+ (dateToAdd.getMonth()+1)+'/'+ dateToAdd.getFullYear();
	}
}
var trimmedId = (doc.id).split('.')[2];
var current = $('.current > a > span > span').html();
var currentSearch = $('.embedded-search-'+current.toLowerCase().slice(0,-1)).data('current-search');
currentSearch=currentSearch[0].toUpperCase() + '' +currentSearch.slice(1,-1)
var output = '<li id="EmbeddedSearchElem_'+current.toLowerCase().slice(0,-1)+'_'+currentView+'_'+trimmedId+'">'+
'                      <div class="'+currentSearch+' in-list">'+
'			<div class="content">'+
'                        <div class="L1">'+
'                          <div class="meta">'+
'                            <div class="score">'+
'                              <span class="value">'+doc.confidence_score+'</span>'+
'                            </div>'+
'                           <div class="status">'+
'                              <span class="value">'+doc['most_recent_status_'+currentSearch.toLowerCase()+'_exact']+'</span>'+
'                            </div>'+
'                          </div>'+
'                          <div class="title i18n">'+
                             
'                            <span lang="en">'+doc.title_en+'</span>'+
'                           <span lang="ar">'+doc.title_ar+'</span>'+
'                            <span class="toggle">'+
'                              <span lang="en">EN</span><span lang="ar">AR</span>'+
'                            </span>'+
'                          </div>'+
'                        </div>'+
'                        <div class="L3">'+
'                          <div class="date-location">'+
'                            <span class="date">'+ dateToAdd +'</span> in <span class="location">Damas, Syriah</span>'+
'                          </div>'+
'                          <div class="involved">'+
'                            <span class="actors-count">'+doc.count_actors[0]+'</span> actors involved'+
'                          </div>'+
'                        </div>'+
'		<div class="when-expanded">'+
'                <div class="actions">'+
'                  <div class="left">'+
'                    <button class="do-relate">'+
'                      <span class="text T">Relate</span>'+
'                    </button>'+
'                  </div>'+
'                  <div class="clearer">&nbsp;</div>'+
'                </div>'+
'              </div>'+
'                      </div>'+
'		      </div>'+
'                    </li>';

    return output;
  },
template_media: function(doc,currentView){
var trimmedId = (doc.id).split('.')[2];
var current = $('.current > a > span > span').html().toLowerCase().slice(0,-1);
	var ouput = '<li class="medium" id="EmbeddedSearchElem_'+current.toLowerCase().slice(0,-1)+'_'+currentView+'_'+trimmedId+'">'+
'	 <input type="hidden" value="'+doc.uri+'">'+
'          <span class="type"></span>'+
'<!--          <span class="date">2013/Apr/21</span> -->'+
'          <span class="date">'+doc.name+'</span>'+
'          <button class="do-remove is-small hidden">'+
             
'            <span class="text">remove</span>'+
'          </button>'+
'	<button class="do-play is-small hidden">'+
             
'            <span class="text">play</span>'+
'          </button>'+
'	<button class="do-add-embedded-media is-small">'+
             
'            <span class="text">add</span>'+
'          </button>'+
'        </li>';
return ouput;
},
 template_actor: function (doc,currentView) {

var trimmedId = (doc.id).split('.')[2];
var current = $('.current > a > span > span').html();

var output = 		'<li id="EmbeddedSearchElem_'+current.toLowerCase().slice(0,-1)+'_'+currentView+'_'+trimmedId+'">' + 
'                     <div class="Actor in-list">' +
'                        <div class="when-hover">' +
'                          <div class="is-selector">' +
'                            <input type="checkbox" />' +
'                          </div>' +
'                        </div>';
if(doc.media_uri == undefined){
output += '                        <div class="avatar">&nbsp;</div>';
}else{
output +='      <div class="avatar"><img src="'+gl_s3_aws_media_url+doc.media_uri[0]+'"/></div>';
}
output += '                        <div class="content">' +
'                          <div class="L1">' +
'                            <div class="status">' +
'                              <span class="value">Victim</span>' +
'                            </div>' +
'                            <span class="name">'+doc.fullname_en+'</span>' +
'                            <span class="sex">'+doc.sex_en+'</span>' +
'                            <span class="age">'+doc.age_en+'</span>' +
'                            <div class="L2">';

var localNickName = (doc.nickname_en!=undefined)?doc.nickname_en:'';

output +='                              <span class="aka">aka &laquo;'+localNickName+'&raquo;</span>' +
'                            </div>' +
'                          </div>' +
'                          <div class="when-not_expanded">' +
'                            <div class="L3">';
if(doc.lives_in != undefined){
output += '                              lives in <span class="location">'+doc.lives_in+'</span>,';
}
output +=' works as a <span class="occupation">'+doc.occupation_en+'</span>' + 

'                              <br>involved in <span class="incidents-count">'+doc.count_incidents+'</span>' +
'                            </div>' +
'                          </div>' +
'                          <div class="when-expanded">' +
'                            <table class="details">' +
'                              <tr>' +
'                                <th>Lives in</th>';
var localLivesIn = (doc.lives_in!=undefined)?doc.lives_in:'';

output+='                                <td>'+ localLivesIn +'</td>' +
'                              </tr>' +
'                              <tr>';
var localBorn = (doc.pob!=undefined)?doc.pob:''
output +='                                <th>Born in</th>' +
'                                <td>'+localBorn+'</td>' +
'                              </tr>' +
'                              <tr>';
var localNat = (doc.nationality_en!=undefined)?doc.nationality_en:''
output+='                                <th>Nationality</th>' +
'                                <td>'+localNat+'</td>' +
'                              </tr>' +
'                              <tr>';
var localEth = (doc.ethnicity_en!=undefined)?doc.ethnicity_en:'';

output+='                                <th>Ethnicity</th>' +
'                                <td>'+localEth+'</td>' +
'                              </tr>' +
'                              <tr>' +
'                               <th>Speaks</th>';
var localSpoken = (doc.spoken_dialect_en!=undefined)?doc.spoken_dialect_en:'';
output+='                                <td>'+localSpoken+'</td>' +
'                             </tr>' +
'                              <tr>' +
'                                <th>Religion</th>';
var localRel = (doc.religion_en!=undefined)?doc.religion_en:'';
output+='                                <td>'+localRel+'</td>' +
'                              </tr>' +
'                            </table>' +
'                            <div class="stats">' +
'                              <div class="is-mentions">' +
'                                <h4 class="title">Mentioned in</h4>' +
'                                <div class="stat">' +
'                                  <div class="value">'+doc.count_bulletins+'</div>' +
'                                  <div class="label">Bulletins</div>' +
'                                </div>' +
'                               <div class="stat">' +
'                                  <div class="value">'+doc.count_incidents+'</div>' +
'                                  <div class="label">Incidents</div>' +
'                                </div>' +
'                              </div>' +
/*
'                              <div class="is-related">' +
'                                <h4 class="title">Related to</h4>' +
'                                <div class="stat">' +
'                                  <div class="value">25</div>' +
'                                  <div class="label">Actors</div>' +
'                               </div>' +
'                              </div>' +
*/
'                            </div>';


/*
'                            <div class="related">' +
'                              Appears in related bulletins: <a href="#">Phasells ur nunc purus</a>, <a href="#">Vitae loboris nulla</a>, ' +
'				<a href="#">Aliquam erat volutpat</a>, <a href="#">Nam urna erat</a>, <a href="#">Lorem ipsum</a>.' +
'                            </div>' +
*/

if(current != 'Actors'){
output += '                            <div class="actions">' +
'                             <div class="button combo is-default">' +
'                                <span class="T">Add as</span>' +

'                                <ul class="options">';
for(var i = 0; i <gl_ac_role_list.length;i++ ){
output+='                                  <li class="do-add-embedded-actor">' +
'                                    <span class="text T">'+gl_ac_role_list[i].role+'</span>' +
'                                  </li>';
}

output += '                                </ul>' +
'                              </div>' +
'                            </div>' +
'                          </div>';
}else{
output += '                            <div class="actions">' +
'                             <div class="button combo is-default">' +
'                                <span class="T">Add as</span>' +

'                                <ul class="options">';
for(var i = 0; i <gl_ac_relation_list.length;i++ ){
output+='                                  <li class="do-add-embedded-actor">' +
'                                    <span class="text T">'+gl_ac_relation_list[i].relation+'</span>' +
'                                  </li>';
}

output += '                                </ul>' +
'                              </div>' +
'                            </div>' +
'                          </div>';
}
output += '                          <div class="when-related">' +
'                            <div class="actions">' +
/*'                              <div class="left">' +
'                                <div class="button combo is-default">' +
'                                  <span class="T">' +
'                                    Related as: Victim ' +
'                                    <ul class="options">' +
'                                      <li>' +
'                                        <span class="text T">Witness</span>' +
'                                      </li>' +
'                                      <li>' +
'                                        <span class="text T">Victim</span>' +
'                                      </li>' +
'                                      <li>' +
'                                        <span class="text T">Killer</span>' +
'                                      </li>' +
'                                      <li>' +
'                                        <span class="text T">Torturer</span>' +
'                                      </li>' +
'                                      <li>' +
'                                        <span class="text T">Kidnapper</span>' +
'                                      </li>' +
'                                    </ul>' +
'                                  </span>' +
'                                </div>' +
'                              </div>' + */
'                              <div class="right">' +
'                                <button class="do-view">' +
'                                  <span class="text T">View</span>' +
'                                </button>' +
'                                <button class="do-remove">' +
'                                  <span class="text T">Remove</span>' +
'                                </button>' +
'                              </div>' +
'                              <div class="clearer">&nbsp;</div>' +
'                            </div>' +
'                          </div>' +
'                        </div>' +
'                      </div>' +
'                    </li>';

return output;
}

});

})(jQuery);
