var monthNames = {
	Jan:'01', 
	Feb:'02', 
	Mar:'03', 
	Apr:'04', 
	May:'05', 
	Jun:'06', 
	Jul:'07', 
	Aug:'08', 
	Sep:'09', 
	Oct:'10', 
	Nov:'11', 
	Dec:'12'};
var opts = {
  lines: 13, // The number of lines to draw
  length: 16, // The length of each line
  width: 10, // The line thickness
  radius: 34, // The radius of the inner circle
  corners: 0.6, // Corner roundness (0..1)
  rotate: 19, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb
  speed: 1.4, // Rounds per second
  trail: 74, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};

var corrob_util=corrob_util||{};

(function(corrob_util){
  var self=corrob_util;


corrob_util.$=jQuery.noConflict();

  corrob_util.loadVideoPlayer = function(media_data){
    video_url = 'https://sjac.rightscase.org/static/video/' + media_data;
  var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);

  corrob_util.$('.' + current + '-video-player').empty();
  //Flowplayer
  /*var video_html = '<video id="'+current+'_player" class="video-js vjs-default-skin" controls preload="none" width="640" height="360">'+
   '<source src="'+video_url+'" type="video/mp4" />'+
  '</video>';
    var player_id = current+'_player';	
    corrob_util.$('.' + current + '-video-player').append(video_html);
    _V_(player_id, {}, function(){
  // Player (this) is initialized and ready.
    });*/
  //JWPlayer
  var player_id = current+'-video-player';	

  jwplayer("bulletin-video-player").setup({
    file: video_url
      });

    corrob_util.$('#' + current + '-video-player').removeClass('hidden');
    corrob_util.$('.' + current + '-preview').addClass('hidden');
  };

  corrob_util.save_predefined_search = function(name,current,query){
    var dataToSave = {
      'name_en' : name,
      'name_ar' : '',
      'search_request' : query,
      'search_type' : current						
    };
    var id= 0;
    var requestURL = 'predefined/search/'+id+'/add/';
    corrob_util.$('#main_spinner').removeClass('hidden');
    corrob_util.$.ajax({
                  url:requestURL,
                  type: 'POST',
                  headers: { "X-CSRFToken": corrob_util.getCookie("csrftoken")},
                  data:JSON.stringify(dataToSave),
                  contentType: 'application/json',
                  processData:false,
                  success: function(data){
        corrob_util.$('#main_spinner').addClass('hidden');
        var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
        var node = corrob_util.$('.'+current+'-predefined');
        if(node.length > 0){
          node[node.length-1].after(data);
        }else{
          corrob_util.$('#show_save_current_search').after(data);
        }
                  },
                  error: function(textStatus){
        corrob_util.$('#main_spinner').addClass('hidden');
                          alert(textStatus);
                  }
          });


  };

  corrob_util.switchTabs = function(target){
    if(target === 'Incidents'){
      var current = corrob_util.$('.current > a > span > span').html();
      corrob_util.$('.overlay:not(".hidden")').addClass(current+'-active').addClass('hidden');
      corrob_util.$('.Incidents-active').removeClass('Incidents-active').removeClass('hidden');
      corrob_util.$('.current').removeClass('current');
      corrob_util.$('.as-2:not(.hidden)').addClass('hidden');
      corrob_util.$('.is-incidents').addClass('current');
      corrob_util.$('#incident-content').removeClass('hidden');
  //		corroborator.layout.relayout();
    }else{
      corrob_util.$('#'+target.toLowerCase()+'-tab').trigger('click');
    }
  };
  corrob_util.loadViewEntity = function(id, type){
    var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
          var requestURL = type+'/'+id+'/view/';
                          var tabTarget =  type[0].toUpperCase() + '' +type.slice(1,type.length) + 's';
                          corrob_util.switchTabs(tabTarget);
                  corrob_util.$.ajax({url:requestURL}).done(function(data){
        corrob_util.$('#view-placeholder-'+type).empty();
        corrob_util.$('#view-placeholder-'+type).append(data);
                          corrob_util.$('.'+type+'-overlay').removeClass('hidden');
                  });	

  };
  corrob_util.loadCreateNewEntity = function(entity_type){
    var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
    corrob_util.$('.'+entity_type+'-overlay').data('related_entity',current);
          var requestURL = entity_type+'/0/new/';
                  corrob_util.$.ajax({url:requestURL}).done(function(data){
                          var tabTarget =  entity_type[0].toUpperCase() + '' +entity_type.slice(1,entity_type.length) + 's';
                          corrob_util.switchTabs(tabTarget);
                          corrob_util.loadEditableOverlay(data,'saveAndRelate');
                          corrob_util.$('.'+entity_type+'-overlay').removeClass('hidden');
                  });
  };


corrob_util.delete = function(){
	
	var current = corrob_util.$('.current > a > span > span').html();
	var ids = [];
	var selected = corrob_util.$('table.'+current.toLowerCase()+' .'+current.slice(0,-1)+', .elements .Actor').find('input:checked').each(function(){
		ids.push(parseInt(corrob_util.$(this).closest('.'+current.slice(0,-1)).attr('id').split('_')[1]));
		corrob_util.$(this).closest('.'+current.slice(0,-1)).remove();
	});

	var requestURL = current.toLowerCase().slice(0,-1)+'/0/delete/';
	corrob_util.$('#main_spinner').removeClass('hidden');
        corrob_util.$.ajax({
                url:requestURL,
                type: 'POST',
                headers: { "X-CSRFToken": corrob_util.getCookie("csrftoken")},
                data:JSON.stringify(ids),
                contentType: 'application/json',
                processData:false,
                success: function(data){
			corrob_util.$('#main_spinner').addClass('hidden');
                },
                error: function(textStatus){
			corrob_util.$('#main_spinner').addClass('hidden');
                        alert(textStatus);
                }
        });	
}

corrob_util.relateEntity = function(entity){
	var current = corrob_util.$('.current > a > span > span').html();
	var currentSearch = corrob_util.$('.embedded-search-'+current.toLowerCase().slice(0,-1)).data('current-search').slice(0,-1);
	var entity_id = entity.attr('id').split('_')[3];
	var copyData = entity.data('EmbeddedSearchElem_'+current.toLowerCase().slice(0,-1)+'_'+currentSearch+'_'+entity_id+'_data');
	var currentFirstUpper = currentSearch[0].toUpperCase() + '' +currentSearch.slice(1,current.length)

        var copyBulletin = corrob_util.template_bulletin_overlay_item(copyData,currentFirstUpper);
        corrob_util.$(copyBulletin).data(currentSearch+'-data',copyData);
	if(currentSearch == 'bulletin'){
        	corrob_util.$('.elements-bulletins-incidents').prepend(copyBulletin);
	}else{
        	corrob_util.$('.elements-incidents-incidents').prepend(copyBulletin);
	}

}

corrob_util.associateBulletins = function(bulletins){

	bulletins.each(function(){
		var copyData = corrob_util.$(this).data('bulletin_data');
		var copyBulletin = corrob_util.template_bulletin_overlay_item(copyData,'Bulletin');
		corrob_util.$(copyBulletin).data('bulletin-data',copyData);
		corrob_util.$('.elements-bulletins-incidents').prepend(copyBulletin);
	});
}

corrob_util.template_bulletin_overlay_item = function(data, search){


/*	var dateSet = new Array();
        data.times.each(function(){
                var event_data = this.
                dateSet.push(event_data.from);
                dateSet.push(event_data.to);
        });
        var d = new Date(0);
        var minT = new Date(Math.min.apply(null, dateSet));
        var maxT = new Date(Math.max.apply(null, dateSet));
        var fromString = minT.getFullYear() + '/' + (minT.getMonth()+1) + '/' + minT.getDate();
        var toString = maxT.getFullYear() + '/' + (maxT.getMonth()+1) + '/' + maxT.getDate();
        var date_duration = currentElem.closest('.is-events').find('.date-duration');
        var duration = (maxT-minT)/(1000*60*60*24);
        date_duration.children('.date').html( fromString + ' &rarr; ' + toString);
        date_duration.children('.duration').html('(' + duration  + ' days)');
*/
var location = '';
var dateToAdd = '';
if('times' in data){
        if(data.times.length > 0){
                var d = data.times[0].split('T')[0];
                var dateElems = d.split('-');
                dateToAdd = new Date(dateElems[0], (dateElems[1] - 1), dateElems[2]);
                dateToAdd = dateToAdd.getDate()+'/'+ (dateToAdd.getMonth()+1)+'/'+ dateToAdd.getFullYear();
        }
}
if("locations" in data){
        location = (data.locations.length>0)?data.locations[0]:'';
}
var current = corrob_util.$('.current > a > span > span').html();
var currentSearch = corrob_util.$('.embedded-search-'+current.toLowerCase().slice(0,-1)).data('current-search').slice(0,-1);
var trimmedId = (data.id).split('.')[2];
var output = '<li id="'+current.toLowerCase().slice(0,-1)+'_'+search.toLowerCase()+'_'+trimmedId+'">'+
'                       <div class="content">'+
'<div class="'+search+' in-list">'+
'<div class="L1">'+
'<div class="meta">'+
'<div class="score">'+
'<span class="value">'+data.confidence_score+'</span>'+
'</div>'+
'<div class="status">'+
'<span class="value">'+data[currentSearch+'_status']+'</span>'+
'</div>'+
'</div>'+
'<div class="title i18n">'+
'<span lang="en">'+data.title_en+'</span>'+
'<span lang="ar">'+data.title_ar+'</span>'+
'<span class="toggle">'+
'</div>'+
'</div>'+
'<div class="L3">'+
'<div class="date-location">'+
'<span class="date">'+dateToAdd+'</span>'+
' in'+
'<span class="location">'+location+'</span>'+
'</div>'+
'<div class="involved">'+
'<span class="actors-count">'+data.count_actors[0]+'</span> actors involved'+
'</div>'+
'</div>'+
'               <div class="when-related">'+
'                <div class="actions">';
var mangledCurrent = current.toLowerCase().slice(0,-1);
if(( currentSearch =='bulletin' && mangledCurrent == 'incident' ) || ( currentSearch == 'incident' && mangledCurrent == 'bulletin' )){
output += '                  <div class="left">'+
'                    <button class="do-view">'+
'                      <span class="text T">View</span>'+
'                    </button>'+
'                  </div>';
}
output += '                  <div class="right">'+
'                    <button class="do-remove">'+ 
'                      <span class="text T">Remove</span>'+
'                    </button>'+
'                  </div>'+  
'                  <div class="clearer">&nbsp;</div>'+
'                </div>'+
'              </div>'+
'</div>'+
'</div>'+
'</li>';
return output;
}

corrob_util.template_bulletin_incident = function (doc,current) {
var dateToAdd = '';
var location = '';
if('times' in doc){
        if(doc.times.length > 0){
                var d = doc.times[0].split('T')[0];
                var dateElems = d.split('-');
                dateToAdd = new Date(dateElems[0], (dateElems[1] - 1), dateElems[2]);
		dateToAdd = dateToAdd.getDate()+'/'+ (dateToAdd.getMonth()+1)+'/'+ dateToAdd.getFullYear();
        }
}

if("locations" in doc){
	location = (doc.locations.length>0)?doc.locations[0]:'';
}

var trimmedId = (doc.id).split('.')[2];
var output = '<tr id="'+current.toLowerCase()+'_'+ trimmedId +'" class="'+current+' in-table">' + 
  '<td class="is-selector">' +
    '<input type="checkbox" />' +
  '</td>' +
  '<td class="is-preview">&nbsp;</td>' +
  '<td class="is-description">' +
    '<a href="#bulletin/0">' +
      '<div class="title text i18n">' +
         
        '<span lang="en">'+ doc.title_en +'</span>' +
        '<span lang="ar">يَجِبُ عَلَى ا�إنْسَانِ أن يَكُونَ أمِيْنَاً وَصَادِقَاً مَعَ نَفْسِهِ وَمَعَ أَهْلِهِ وَجِيْرَانِهِ وَأَنْ يَبْذُلَ كُلَّ جُهْدٍ فِي</span>'+
        '<span class="toggle">'+
          '<span lang="en">EN</span><span lang="ar">AR</span>' +
        '</span>' +
      '</div>' +
      '<div class="meta text">' +
        '<span class="actors">'+doc.count_actors[0]+'</span> actors involved' +
      '</div>'+
      '<div class="details text">'+
        '<span class="date">'+  dateToAdd +'</span> in <span class="location">'+location+'</span>';

	if(current.toLowerCase() == 'bulletins'){
		output += '(<span class="sources">'+doc.sources[0]+'</span>)';
	}
output +=      '</div>'+
    '</a>'+
  '</td>'+
  '<td class="is-status">'+
    '<span class="status">'+
      '<span class="text">'+doc[current.toLowerCase()+'_status']+'</span>'+
    '</span>'+
  '</td>'+
  '<td class="is-score"> '+
    '<span class="value">'+ doc.confidence_score +'</span>'+
  '</td>'+
'</tr>';

    return output;
  }

 corrob_util.template_actor = function (doc) {

var trimmedId = (doc.id).split('.')[2];

var output = 		'<li >' + 
'                     <div id="actor_'+trimmedId+'" class="Actor in-list">' +
'                        <div class="when-hover" style="display:block;">' +
'                          <div class="is-selector" style="background-color:white;">' +
'                            <input type="checkbox" />' +
'                          </div>' +
'                        </div>' +
'                        <div class="avatar">&nbsp;</div>' +
'                        <div class="content">' +
'                          <div class="L1">' +
'                            <div class="status">' +
'                              <span class="value">'+'</span>' +
'                            </div>' +
'                            <span class="name">'+doc.fullname_en+'</span>' +
'                            <span class="sex">'+doc.sex_en+'</span>' +
'                            <span class="age">'+doc.age_en+'</span>' +
'                            <div class="L2">' +
'                              <span class="aka">aka &laquo;'+doc.nickname_en+'&raquo;</span>' +
'                            </div>' +
'                          </div>' +
'                          <div class="when-not_expanded">' +
'                            <div class="L3">' +
'                              lives in <span class="location">Damas</span>, works as a <span class="occupation">'+doc.occupation_en+'</span>' + 
'                              <br>involved in <span class="incidents-count">'+doc.count_incidents+' incidents</span>' +
'                            </div>' +
'                          </div>' +
'                          <div class="when-expanded">' +
'                            <table class="details">' +
'                              <tr>' +
'                                <th>Lives in</th>' +
'                                <td>Damas</td>' +
'                              </tr>' +
'                              <tr>' +
'                                <th>Born in</th>' +
'                                <td>Damas, </td>' +
'                              </tr>' +
'                              <tr>' +
'                                <th>Nationality</th>' +
'                                <td>'+doc.nationality_en+'</td>' +
'                              </tr>' +
'                              <tr>' +
'                                <th>Ethnicity</th>' +
'                                <td>'+doc.ethnicity_en+'</td>' +
'                              </tr>' +
'                              <tr>' +
'                               <th>Speaks</th>' +
'                                <td>'+doc.spoken_dialect_en+'</td>' +
'                             </tr>' +
'                              <tr>' +
'                                <th>Religion</th>' +
'                                <td>'+doc.religion_en+'</td>' +
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
'                            </div>' +
/*
'                            <div class="related">' +
'                              Appears in related bulletins: <a href="#">Phasells ur nunc purus</a>, <a href="#">Vitae loboris nulla</a>, ' +
'				<a href="#">Aliquam erat volutpat</a>, <a href="#">Nam urna erat</a>, <a href="#">Lorem ipsum</a>.' +
'                            </div>' +
*/
'                          </div>' +
'                          <div class="when-related">' +
'                            <div class="actions">' +
'                              <div class="left">' +
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
'                              </div>' +
'                              <div class="right">' +
'                                <button class="do-view">' +
'                                  <span class="text T">view</span>' +
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



corrob_util.getCookie = function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
corrob_util.saveActor = function(mode){
	var dataToSave= {
		actors : [],
		id : '',
		fullname_en : '',
		nickname_en : '',
		sex_en : '',
		age_en : '',
		civilian_en : '',
		DOB : '',
		POB : '',
		occupaton_en : '',
		position_en : '',
		ethnicity_en : '',
		religion_en : '',
		spoken_dialect_en : ''
	}
	

	dataToSave.fullname_en = corrob_util.$('#actor_fullname_en').val();
	dataToSave.nickname_en =  corrob_util.$('#actor_nickname_en').val();
	dataToSave.sex_en =  (corrob_util.$('#actor_sex_en').html() != 'Sex')?corrob_util.$('#actor_sex_en').html():'';
	dataToSave.age_en =  (corrob_util.$('#actor_age_en').html() != 'Age')?corrob_util.$('#actor_age_en').html():'';;
	dataToSave.civilian_en =  corrob_util.$('#actor_civilian_en').html();
	var dateString = corrob_util.$('#actor_dob_day').html();
	var dateString = corrob_util.$('#actor_dob_year').html() + '-' +  monthNames[corrob_util.$('#actor_dob_month').html()] + '-' + dateString;
	dataToSave.DOB = new Date( dateString);
	dataToSave.POB =  corrob_util.$('#actor_pob_hidden').val();
	dataToSave.occupation_en = corrob_util.$('#actor_occupation_en').val();
	dataToSave.position_en = corrob_util.$('#actor_position_en').val();
	dataToSave.ethnicity_en = corrob_util.$('#actor_ethnicity_en').val();
	dataToSave.religion_en =corrob_util.$('#actor_religion_en').val();
	dataToSave.spoken_dialect_en =corrob_util.$('#actor_spoken_dialect_en').val();
 	var id = corrob_util.$('#view-actor-id').html();
	if(id == ''){
			id = 0;
		}

	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	var requestURL = current+'/'+id+'/save/';
	if(mode == 'annotate'){		
		var requestURL = current+'/0/multisave/';
		var items = corrob_util.$('#'+current+'s-table').find('.is-selector > input:checked');
	        items.each(function(){
        	        dataToSave.actors.push(corrob_util.$(this).closest('.Actor').attr('id').split('_')[1]);
	        });
	}
	dataToSave.id = id;
        corrob_util.$('#view-placeholder-'+current).empty();   
	corrob_util.addSpinnerStart();
        corrob_util.$.ajax({
                url:requestURL,
                type: 'POST',
                headers: { "X-CSRFToken": corrob_util.getCookie("csrftoken")},
                data:JSON.stringify(dataToSave),
                contentType: 'application/json',
                processData:false,
                     error: function(textStatus){
                        alert(textStatus);
			corrob_util.addSpinnerStop();
                }
        }).done(function(data){
			currentTrunc = current;
                        corrob_util.$('.embedded-search-'+currentTrunc).addClass('hidden');
                        corrob_util.$('.'+currentTrunc+'-overlay').removeClass('is-middle');

	                corrob_util.$('#view-placeholder-'+currentTrunc).append(data);
			
			corrob_util.addSpinnerStop();
			var related_entity = corrob_util.$('.'+current+'-overlay').data('related_entity');
			if(related_entity!=undefined){
				corrob_util.$('.'+current+'-overlay').data('related_entity',null);
				corrob_util.relateNew(related_entity);
			}
                }
);

}

corrob_util.relateNew = function(related_entity){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	var master = corrob_util.$('.'+current+'-overlay').find('#'+current+'_related_element > li');
	var copyNode = master.clone();
	copyNode.attr('id', related_entity +'_'+current+'_'+master.attr('id'));
	var appendClass = '';
	if(current == 'actor'){
	//TODO get related as value via data elem
		var status = corrob_util.$('.'+current+'-overlay').data('actor_related_status');
		copyNode.find('.status > span').html(status);
		appendClass = 'elements-'+related_entity;
		corrob_util.$('.is-'+current+'s > .'+appendClass).prepend(copyNode);
	}else{
        	corrob_util.$('.elements-bulletins-incidents').prepend(copyNode);
	}
	corrob_util.$('#'+related_entity+'s-tab').trigger('click');
}

corrob_util.addSpinnerStart = function(){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	corrob_util.$('#view-placeholder-'+current).append(corrob_util.$('#loadingSpinner'));
	corrob_util.$('#loadingSpinner').removeClass('hidden');
}

corrob_util.addSpinnerStop = function(){
	corrob_util.$('#map_data_conduit').after(corrob_util.$('#loadingSpinner'));
        corrob_util.$('#loadingSpinner').addClass('hidden');
}
corrob_util.save_element_multi = function(mode){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
        var dataToSave = {
                bulletins : [],
                incidents : [],
                crimes : [],
                events : [],
                actors : [],
                locations : [],
                sources : [],
                labels : [],
                users : [],
                titles : [],
                statuses : [],
                descriptions : [],
                confidence_scores : [],
                comments : [],
                new_comments : []
        };

	if(current == 'incident'){
		corrob_util.$('#'+current+'s-table').find('.is-selector > input:checked').each(function(){
			dataToSave.incidents.push(corrob_util.$(this).closest('tr').attr('id').split('_')[1]);
		});
	}else if(current == 'actor'){
                corrob_util.$('#'+current+'-table').find('.is-selector > input:checked').each(function(){
                        dataToSave.actors.push(corrob_util.$(this).closest('tr').attr('id').split('_')[1]);
                });
	}else{
                corrob_util.$('#'+current+'s-table').find('.is-selector > input:checked').each(function(){
                        dataToSave.bulletins.push(corrob_util.$(this).closest('tr').attr('id').split('_')[1]);
                });
	}
	var new_comments = new Array();
	corrob_util.$('[id^="'+current+'_comment"]:not(".is-new")').each(function(){
		localCommentObj = {};
		localCommentObj['assigned_user'] = 1;//corrob_util.$(this).find('.who').html();
		localCommentObj['created'] = new Date(corrob_util.$(this).find('.created').html().split(' ')[0]);
		localCommentObj['comments_en'] = corrob_util.$(this).find('.content > .text').html();
		new_comments.push(localCommentObj);
	});
	var crimes = new Array();
	corrob_util.$('[id^="'+current+'_crime"]').each(function(){
		crimes.push(corrob_util.$(this).attr('id').split('_')[2]);
	});
        var labels = new Array();
                corrob_util.$('[id^="'+current+'_tag"]').each(function(){
                labels.push(corrob_util.$(this).attr('id').split('_')[2]);
        });
	if(mode == 'bulletin'){
                var sources = new Array();
                corrob_util.$('[id^="source"]').each(function(){
                sources.push(corrob_util.$(this).attr('id').split('_')[1]);
                });
                dataToSave.sources = sources;
        }
        var user = corrob_util.$('[id^="user-ac-'+current+'"]').attr('id').split('_')[1];
        var status = (corrob_util.$('#'+current+'_status').val() != 'Select status')?corrob_util.$('#'+current+'_status').val():'';	
	var confidence_score = corrob_util.$('#'+current+'_confidence_score').html();
        dataToSave.new_comments = new_comments;
        dataToSave.labels = labels;
        dataToSave.crimes = crimes;
        dataToSave.users.push({'user':user});
        dataToSave.statuses.push({'status':status});
        dataToSave.confidence_scores.push({'confidence_score':confidence_score});
	corrob_util.$('#main_spinner').removeClass('hidden');
        var requestURL = current+'/0/multisave/';
        corrob_util.$.ajax({
                url:requestURL,
                type: 'POST',
                headers: { "X-CSRFToken": corrob_util.getCookie("csrftoken")},
                data:JSON.stringify(dataToSave),
                contentType: 'application/json',
                processData:false,
                error: function(textStatus){
			corrob_util.$('#main_spinner').addClass('hidden');
                        alert(textStatus);
                }
        }).done(function(data){
			corrob_util.clear_annotation_fields();
			corrob_util.$('#main_spinner').addClass('hidden');
			corrob_util.$('#'+current+'-annotate_action_result').removeClass('hidden');
        });

}
corrob_util.clear_annotation_fields = function(){
}
corrob_util.save_element = function(mode){

	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	var dataToSave = {
		bulletins : [],
		incidents : [],
		crimes : [],
		events : [],
		actors : [],
		locations : [],
		sources : [],
		labels : [],
		users : [],
		titles : [],
		statuses : [],
		descriptions : [],
		confidence_scores : [],
		comments : [],
		new_comments : []
	};
	var events = new Array();
	corrob_util.$('[id^="'+current+'_event"]:not(".is-new")').each(function(){
		localEventObj = {};
		localEventObj['name_en'] = corrob_util.$(this).find('.'+current+'_event_name_en').html();
		localEventObj['comment_en'] = corrob_util.$(this).find('.'+current+'_event_comment').val();
		localEventObj['confidence_score'] = corrob_util.$(this).find('.'+current+'_event_confidence_score').val();
		localEventObj['to'] = new Date(corrob_util.$(this).find('.'+current+'_event_from').html());
		localEventObj['from'] = new Date(corrob_util.$(this).find('.'+current+'_event_to').html());
		events.push(localEventObj);
	});
	var actors = new Array();
		corrob_util.$('[id^="'+current+'_actor_"]').each(function(){
		actors.push({'status_en':corrob_util.$(this).find('.value').html(),'id':corrob_util.$(this).attr('id').split('_')[2]});
	});
	var locations = new Array();
		corrob_util.$('[id^="'+current+'_location_"]').each(function(){
		locations.push(corrob_util.$(this).attr('id').split('_')[2])
	});
	if(mode == 'bulletin'){
		var sources = new Array();
		corrob_util.$('[id^="source"]').each(function(){
		sources.push(corrob_util.$(this).attr('id').split('_')[1]);
		});
		dataToSave.sources = sources;
	}else{
		var new_comments = new Array();
		corrob_util.$('[id^="'+current+'_comment"]:not(".is-new")').each(function(){
               		localCommentObj = {};
        	        localCommentObj['assigned_user'] = 1;//corrob_util.$(this).find('.who').html();
                	localCommentObj['created'] = new Date(corrob_util.$(this).find('.created').html().split(' ')[0]);
        	        localCommentObj['comments_en'] = corrob_util.$(this).find('.content > .text').html();
        	        new_comments.push(localCommentObj);
	        });
		var crimes = new Array();
		corrob_util.$('[id^="'+current+'_crime"]').each(function(){
			crimes.push(corrob_util.$(this).attr('id').split('_')[2]);
		});
		var bulletins = new Array();
		corrob_util.$('[id^="'+current+'_bulletin_"]').each(function(){
			bulletins.push(corrob_util.$(this).attr('id').split('_')[2]);
		});
		var incidents = new Array();
		corrob_util.$('[id^="'+current+'_incident_"]').each(function(){
			incidents.push(corrob_util.$(this).attr('id').split('_')[2]);
		});
		dataToSave.crimes = crimes;
		dataToSave.incidents = incidents;
		dataToSave.bulletins = bulletins;
	}
	var labels = new Array();
		corrob_util.$('[id^="'+current+'_tag"]').each(function(){
		labels.push(corrob_util.$(this).attr('id').split('_')[2]);
	});
	var user = corrob_util.$('[id^="user-ac-'+current+'"]').attr('id').split('_')[1];
	var status = (corrob_util.$('#'+current+'_status').val() != 'Select status')?corrob_util.$('#'+current+'_status').val():'';
	var description_en = corrob_util.$('#'+current+'_description_en').val();
	var title_en = corrob_util.$('#'+current+'_title_en').val();
	var confidence_score = corrob_util.$('#'+current+'_confidence_score').html();
	dataToSave.events = events;
	dataToSave.new_comments = new_comments;
	dataToSave.actors = actors;
	dataToSave.locations = locations;
	dataToSave.labels = labels;
	dataToSave.users.push({'user':user});
	dataToSave.descriptions.push({'description_en':description_en});
	dataToSave.statuses.push({'status':status});
	dataToSave.titles.push({'title_en':title_en});
	dataToSave.confidence_scores.push({'confidence_score':confidence_score});
	var id = corrob_util.$('#view_'+current+'_id').html();
	if(!id){
		id=0;
	}
        corrob_util.$('#view-placeholder-'+current).empty();   
	corrob_util.addSpinnerStart();

	var requestURL = current+'/'+id+'/save/';
        corrob_util.$.ajax({
		url:requestURL,
		type: 'POST',
		headers: { "X-CSRFToken": corrob_util.getCookie("csrftoken")},
		data:JSON.stringify(dataToSave),
		contentType: 'application/json', 
		processData:false,
		error: function(textStatus){
			alert(textStatus);
			corrob_util.addSpinnerStop();
		}	
	}).done(function(data){
			corrob_util.$('.embedded-search-'+current).addClass('hidden');
                        corrob_util.$('.'+current+'-overlay').removeClass('is-middle');
			corrob_util.$('#'+current+'_action_result').removeClass('hidden');
			corrob_util.$('#view-placeholder-'+current).append(data);
			if(corrob_util.$('.'+current+'-overlay').hasClass('is-expanded')){
				$('.do-expand').trigger('click');
			}
			corrob_util.addSpinnerStop();
			var related_entity = corrob_util.$('.'+current+'-overlay').data('related_entity');
                        if(related_entity!=undefined){
                                corrob_util.$('.'+current+'-overlay').data('related_entity',null);
                                corrob_util.relateNew(related_entity);
                        }

		});


}
corrob_util.updateEvent = function(currentElem){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	var dateSet = new Array();
	currentElem.closest('.events').find('[id^="'+current+'_event"]:not(".is-new")').each(function(){
		 var newEvent = {};
                                newEvent["from"] = new Date(corrob_util.$(this).closest('.events').find('.'+current+'_event_from').html());
                                newEvent["to"] = new Date(corrob_util.$(this).closest('.events').find('.'+current+'_event_to').html());
		dateSet.push(newEvent["from"]);
		dateSet.push(newEvent["to"]);
	});
	var d = new Date(0);
	var minT = new Date(Math.min.apply(null, dateSet));	
	var maxT = new Date(Math.max.apply(null, dateSet));
	var fromString = minT.getFullYear() + '/' + (minT.getMonth()+1) + '/' + minT.getDate();	
	var toString = maxT.getFullYear() + '/' + (maxT.getMonth()+1) + '/' + maxT.getDate();	
	var date_duration = currentElem.closest('.is-events').find('.date-duration');
	var duration = (maxT-minT)/(1000*60*60*24); 
	date_duration.children('.date').html( fromString + ' &rarr; ' + toString);
	date_duration.children('.duration').html('(' + duration  + ' days)');
}
corrob_util.loadEditableOverlay = function(data,mode){



	var type = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
        corrob_util.$('#view-placeholder-'+type).empty();
	if(mode != 'annotate'){
                corrob_util.$('#view-placeholder-'+type).append(data);
	}
	if(type != 'actor'){
		corrob_util.$('.slider').slider({
				min: 0,
				max: 100,
				step: 1,
				slide: function(){
					var value = corrob_util.$(this).slider('value');
					var score_elem = corrob_util.$(this).closest('.score-editor').siblings('.score').children('span');
					if(score_elem.length == 0){
						corrob_util.$(this).closest('.score-editor').siblings('span').html(value);
					}else{
						score_elem.html(value);
					}	
				}	

				});
		corrob_util.$('.slider').removeClass().addClass('slider');
		corrob_util.$('.ui-slider-handle').removeClass('ui-slider-handle').addClass('cursor');
		corrob_util.$('.event.is-new > div > input:not(".w-100p")').datetimepicker({
			timeFormat: "hh:mm tt"
		});
		corrob_util.$('.do-edit').click(function(){
                                var newEvent = {};
                                newEvent["from"] = new Date(corrob_util.$(this).closest('.events').find('.'+type+'_event_from').html());
                                newEvent["to"] = new Date(corrob_util.$(this).closest('.events').find('.'+type+'_event_to').html());
                                newEvent["description"] = corrob_util.$(this).closest('.events').find('.'+type+'_event_name_en').html();
                                newEvent["confidence_score"] = corrob_util.$(this).closest('.events').find('.'+type+'_event_confidence_score').val();
                                newEvent["comment"] = corrob_util.$('.'+type+'_event_comment').val();

                                var from = newEvent['from'];
                                var to = newEvent['to'];
                                var fromString = from.getFullYear() +'/'+(from.getMonth()+1)+'/'+from.getDate();
                                var toString = to.getFullYear() +'/'+(to.getMonth()+1)+'/'+to.getDate();
                                corrob_util.$(this).closest('.events').find('.'+type+'_event-from').val(fromString);
                                corrob_util.$(this).closest('.events').find('.'+type+'_event-to').val(toString);
                                        corrob_util.$(this).closest('.events').find('.'+type+'_event-description').val(newEvent['description']);
                                        corrob_util.$(this).closest('.events').find('.'+type+'_event-cscore').html(newEvent['confidence_score']);
                                        corrob_util.$(this).closest('.events').find('.'+type+'_event-comment').val(newEvent['comment']);
                                corrob_util.$(this).closest('.event').remove();
                                corrob_util.updateEvent(corrob_util.$(this));
                      });
		if(type == 'incident'){
			
			corrob_util.$('.do-addComment').click(function(){
				var newComment = {};
				newComment["comment"] = corrob_util.$(this).closest('.comments').find('.comment-comment').val();
				newComment["user"] = 'Admin';
				newComment["userid"] = 1;
				var now = new Date();
				newComment["created"] = now;
/*				var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
				var requestURL = 'comment/'+id+'/save/';
				corrob_util.$.ajax({
					url:requestURL,
					type: 'POST',
					headers: { "X-CSRFToken": corrob_util.getCookie("csrftoken")},
					data:JSON.stringify(dataToSave),
					contentType: 'application/json',
					processData:false,
					success: function(data){
						currentTrunc = current;
						corrob_util.$('.embedded-search-'+currentTrunc).addClass('hidden');
						corrob_util.$('.'+currentTrunc+'-overlay').removeClass('is-middle');

						corrob_util.$('#view-placeholder-'+currentTrunc).empty();
						corrob_util.$('#view-placeholder-'+currentTrunc).append(data);
					},
					error: function(textStatus){
						alert(textStatus);
					}
				});	*/

			var createdString = now.getFullYear() +'-'+("0" + (now.getMonth() + 1)).slice(-2)+'-'+("0" + now.getDate()).slice(-2)+' '+now.getHours()+':'+(now.getMinutes()<10?'0':'') + now.getMinutes()+':'+now.getSeconds();
			 var output = 	'<li id="incident_comment" class="comment">'+
				  '<div class="actions">'+
				    '<button class="do-edit-comment is-small">'+
				      '<span class="text T">Edit</span>'+
				    '</button>'+
				    '<button class="do-remove is-small">'+
				      '<span class="text T">Remove</span>'+
				    '</button>'+
				 '</div>'+
				  '<div class="content">'+
				    '<div class="text">'+newComment["comment"]+'</div>'+
				    '<div class="meta">'+
				      '<span class="created">'+createdString+'</span> by <span class="who">'+newComment["user"]+'</span>'+
				    '</div>'+
				  '</div>'+
				  '<div class="clearer">&nbsp;</div>'+
				'</li>';
			      var outputElem = corrob_util.$(output);
			      var type = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
			      corrob_util.$(outputElem).data('comment-data', newComment);
			      corrob_util.$(this).closest('.comments').prepend(outputElem);
			      corrob_util.$('.do-edit-comment').click(function(){
					var comment_data = corrob_util.$(this).closest('.comment').data('comment-data');
					corrob_util.$(this).closest('.comments').find('.comment-comment').val(comment_data['comment']);
					corrob_util.$(this).closest('.comment').remove();
			      });	
			});
		}
		corrob_util.$('.do-addEvent').click(function(){
			var type = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
			var newEvent = {};
			newEvent["from"] = new Date(corrob_util.$(this).closest('.events').find('.'+type+'_event-from').val());	
			newEvent["to"] = new Date(corrob_util.$(this).closest('.events').find('.'+type+'_event-to').val());
			newEvent["description"] = corrob_util.$(this).closest('.events').find('.'+type+'_event-description').val(); 
			newEvent["confidence_score"] = corrob_util.$(this).closest('.events').find('.'+type+'_event-cscore').html();
			newEvent["comment"] = corrob_util.$('.'+type+'_event-comment').val();

			corrob_util.$(this).closest('.events').find('.'+type+'_event-from').val('');
			corrob_util.$(this).closest('.events').find('.'+type+'_event-to').val('');
			corrob_util.$(this).closest('.events').find('.'+type+'_event-description').val('');
			corrob_util.$('.'+type+'_event-comment').val('');
			corrob_util.$(this).closest('.events').find('.'+type+'_event-cscore').html('0');
			var from = newEvent['from'];
			var to = newEvent['to'];
			var fromString = from.getFullYear() +'/'+(from.getMonth()+1)+'/'+from.getDate();
			var toString = to.getFullYear() +'/'+(to.getMonth()+1)+'/'+to.getDate();
			var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
			var output = '<li class="event" id="'+current+'_event">'+
			'<input class="'+current+'_event_confidence_score" type="hidden" value="'+newEvent["confidence_score"]+'"/>'+
		        '<input class="'+current+'_event_comment" type="hidden" value="'+newEvent["comment"]+'"/>'+
                        '<div class="actions">'+
                          '<button class="do-edit is-small">'+
                            '<span class="text T">Edit</span>'+
                          '</button>'+
                          '<button class="do-remove is-small">'+
                            '<span class="text T">Remove</span>'+
                          '</button>'+
                        '</div>'+
                        '<div class="content">'+
                          '<div class="'+current+'_event_name_en name">'+ newEvent['description']+'</div>'+
                          '<div class="time">'+
                            'from  '+
                            '<span class="'+current+'_event_from start">'+fromString+'</span> to'+  
                            '<span class="'+current+'_event_to end">'+toString+'</span>'+
                          '</div>'+
                        '</div>'+
                        '<div class="clearer">&nbsp;</div>'+
                      '</li>';
		      var outputElem = corrob_util.$(output); 		
		      var type = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
		      corrob_util.$(outputElem).data('event-data', newEvent);	
		      corrob_util.$(this).closest('.events').prepend(outputElem);	
		      corrob_util.updateEvent(corrob_util.$(this));
		      corrob_util.$('.do-edit').click(function(){ 
				var newEvent = {};
				newEvent["from"] = new Date(corrob_util.$(this).closest('.events').find('.'+type+'_event_from').html());
                                newEvent["to"] = new Date(corrob_util.$(this).closest('.events').find('.'+type+'_event_to').html());
                                newEvent["description"] = corrob_util.$(this).closest('.events').find('.'+type+'_event_name_en').html();
                                newEvent["confidence_score"] = corrob_util.$(this).closest('.events').find('.'+type+'_event_confidence_score').val();
                                newEvent["comment"] = corrob_util.$('.'+type+'_event_comment').val();

				var from = newEvent['from'];
	                        var to = newEvent['to'];
        	                var fromString = from.getFullYear() +'/'+(from.getMonth()+1)+'/'+from.getDate();
                	        var toString = to.getFullYear() +'/'+(to.getMonth()+1)+'/'+to.getDate();
				corrob_util.$(this).closest('.events').find('.'+type+'_event-from').val(fromString);
				corrob_util.$(this).closest('.events').find('.'+type+'_event-to').val(toString);
					corrob_util.$(this).closest('.events').find('.'+type+'_event-description').val(newEvent['description']);
					corrob_util.$(this).closest('.events').find('.'+type+'_event-cscore').html(newEvent['confidence_score']);
					corrob_util.$(this).closest('.events').find('.'+type+'_event-comment').val(newEvent['comment']);
				corrob_util.$(this).closest('.event').remove();
		      		corrob_util.updateEvent(corrob_util.$(this));
		      });
		      	
		});

		corrob_util.$('[id^="user-ac"]').autocomplete({source: gl_ac_users_list,select: function(event, ui){ 

			var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
			corrob_util.$(this).attr('id','user-ac-'+current+'_'+ui.item.id);}});
	 	corrob_util.$('#clear-user').click(function(){corrob_util.$(this).siblings('.with-clear').val('');});
		if(type == 'incident'){	
		corrob_util.$('.crimes-ac').autocomplete({source: gl_ac_crimes_list,
						select: function(event, ui){
							var output = '<li class="crime" id="incident_crime_'+ui.item.id+'">'+
									'<span class="text">'+ui.item.value+'</span>'+
									'<button class="do-clear">'+
									'<span>✓</span>'
									'</button>'+
									'</li>';
							corrob_util.$(this).closest('.crime').before(output);
							this.value = '';
							return false;	
						}
						}).focus(function(){corrob_util.$(this).val('');});
		}
		corrob_util.$('#view-placeholder-'+type+', #view-placeholder-annotate-'+type).on('click',".crime:not('.is-new')",function(){corrob_util.$(this).remove()});
		corrob_util.$('.labels-ac').autocomplete({source: gl_ac_labels_list,
						select: function(event, ui){
						var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
							var output = '<li class="tag" id="'+current+'_tag_'+ui.item.id+'">'+
									'<span class="text">'+ui.item.value+'</span>'+
									'<button class="do-clear">'+
									'<span>✓</span>'
									'</button>'+
									'</li>';
							corrob_util.$(this).closest('.tag').before(output);
							this.value = '';
							return false;	
						}
						}).focus(function(){corrob_util.$(this).val('');});
		corrob_util.$('#view-placeholder-'+type+', #view-placeholder-annotate-'+type).on('click',".tag:not('.is-new')",function(){corrob_util.$(this).remove()});
		corrob_util.$('.source-ac').autocomplete({source: special_global_ac_sources_list, 
						focus: function(event, ui){this.value = '';}, 
						select: function(event, ui){
							var output = '<li class="source" id="source_'+ui.item.id+'">'+
									'<span class="text">'+ui.item.value+'</span>'+
									'<button class="do-clear">'+
									'<span>✓</span>'+
									'</button>'+
									'</li>';
							corrob_util.$(this).closest('.source').before(output);
		
							this.value = '';
							return false;	
						}}).focus(function(){corrob_util.$(this).val('');});
		corrob_util.$('#view-placeholder-'+type+', #view-placeholder-annotate-'+type).on('click',".source:not('.is-new')",function(){corrob_util.$(this).remove()});
}
	if(type=='actor' || mode =='annotate'){
		if(type=='actor'){
		corrob_util.$('#actor_pob').autocomplete({source: gl_ac_locations_list,select: function(event, ui){ corrob_util.$('#actor_pob_hidden').val(ui.item.id);}});
		}
		corrob_util.$('.Actor').find('.options > li').click(function(){
                                corrob_util.$(this).parent().siblings('span').html(corrob_util.$(this).children('span').html());
                        })
}
	
		corrob_util.$('#view-placeholder-'+type+', #view-placeholder-annotate-'+type).on('click','.do-remove',function(){ corrob_util.$(this).closest('li').remove() });
		corrob_util.$('.Content').on('click', '.do-clear', function(){
			corrob_util.$(this).siblings('input').val('');
		});
		corrob_util.$('#view-placeholder-incident, #view-placeholder-bulletin, #view-placeholder-actor').on('click','.do-view',function(){ 
			var id = corrob_util.$(this).closest('li').attr('id').split('_')[2]; 
			var type = corrob_util.$(this).closest('li').attr('id').split('_')[1];
			corrob_util.loadViewEntity(id,type);	

		});
		corrob_util.$('#view-placeholder-'+type).on('click','.do-play',function(){ corrob_util.loadVideoPlayer(corrob_util.$(this).siblings('input').val()); });
	corrob_util.$('#'+type+'-action_edit').addClass('hidden');
	if(mode != 'annotate'){
		if(mode == "saveAndRelate"){
			corrob_util.$('#'+type+'-action_save_relate').removeClass('hidden');
		}
		corrob_util.$('#'+type+'-action_save').removeClass('hidden');
		corrob_util.$('.'+type+'-overlay').removeClass('hidden');
		if(corrob_util.$('.'+type+'-overlay').hasClass('is-expanded')){
			corrob_util.$('.do-expand').trigger('click');
		}	
	}
if(mode != 'annotate'){
corroborator.layout.relayout();
}

}
corrob_util.init=function(){var self=corrob_util;wireshop.onReady(function(){/*var state=new linking.URLState.Install();*/corroborator.init()
var wireframes=corrob_util.$('.WIREFRAME');var wireframes_selector=corrob_util.$('.FF-Selector *[data-wireframe]');var wireframes_select=function(wireframe){var f=(('[data-wireframe='+wireframe)+']');wireframes_selector.removeClass('current').filter(f).addClass('current')
wireframes.addClass('hidden').filter(f).removeClass('hidden')
if(wireframe)
{/*state.set('wireframe',wireframe)*/}
corroborator.layout.relayout()};var url_change=function(event){wireframes_select(event.values.wireframe)};wireframes_selector.click(function(){wireframes_select(corrob_util.$(this).attr('data-wireframe'))})
/*state.bind(url_change)*/

var overlay=corrob_util.$('.overlay');
var relayout=corroborator.layout.relayout;
corrob_util.$('table.bulletins .Bulletin').click(function(){
	overlay.removeClass('hidden');

})
corrob_util.$('.do-hide-annotate').click(function(){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	corrob_util.$('#'+current+'-annotate_action_result').addClass('hidden');
 corrob_util.$('.'+current+'-overlay-annotate').addClass('hidden');
});
corrob_util.$('.do-hide').click(function(){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	corrob_util.$('#view-placeholder-'+current).empty();
	corrob_util.$('.'+current+'-overlay').removeClass('is-expanded').removeClass('is-middle').addClass('hidden');
	corrob_util.$('.embedded-search-'+current).addClass('hidden');
	corrob_util.$('#'+current+'-action_edit').removeClass('hidden');
	corrob_util.$('#'+current+'-action_save').addClass('hidden');
	corrob_util.$('#'+current+'_action_result').addClass('hidden');
	corrob_util.$('#'+current+'-action_save_relate').addClass('hidden');


});
corrob_util.$('.create-incident-from-bulletin').click(function(){
	var bulletins = corrob_util.$('.Bulletin').find('input[type="checkbox"]:checked').closest('[id^="bulletin_"]');
	var type = corrob_util.$('.current > a > span > span').html();
	if(bulletins){
		var requestURL = 'incident/0/new/';
	        corrob_util.$.ajax({url:requestURL}).done(function(data){
 			corrob_util.switchTabs('Incidents');
			corrob_util.loadEditableOverlay(data);
               		corrob_util.associateBulletins(bulletins);
			corrob_util.$('.incident-overlay').removeClass('hidden');
        	});		
	}

});
corrob_util.$('.create').click(function(){

	var type = corrob_util.$(this).children('span').html().split(' ')[1];
	var requestURL = type+'/0/new/';
	corrob_util.$.ajax({url:requestURL}).done(function(data){
		corrob_util.loadEditableOverlay(data);		
        }); 
	
});
corrob_util.$('#bulletin-action_save, #actor-action_save, #incident-action_save, .actor-action_save_relate, #bulletin-action_save_relate').click(function(){
        var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
        var errorPos = (current != '')?'bottomLeft':'topLeft';

        corrob_util.$('#'+current+'_form').validationEngine('attach', {promptPosition : errorPos, scroll: false});
        if(!corrob_util.$('#'+current+'_form').validationEngine('validate')){
                return false;
        }
        if(current == 'actor'){
                corrob_util.saveActor();
        }else{
                var mode =(current=='bulletin')?'bulletin':'incident';
//              if(corrob_util.validate(mode)){
                        corrob_util.save_element(mode);
/*              }else{
                        return false;
                }
*/      }
        corrob_util.$('#'+current+'-action_edit').removeClass('hidden');
        corrob_util.$('#'+current+'-action_save').addClass('hidden');
	corrob_util.$('#'+current+'_action_result').addClass('hidden');
});
corrob_util.$('#bulletin-action_save_multi, #actor-action_save_multi, #incident-action_save_multi, .actor-action_save_relate_multi, #bulletin-action_save_relate_multi').click(function(){

	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	var errorPos = (current != '')?'bottomLeft':'topLeft';

	corrob_util.$('#'+current+'_form_annotate').validationEngine('attach', {promptPosition : errorPos, scroll: false});
	if(!corrob_util.$('#'+current+'_form').validationEngine('validate')){
		return false;
	}
	if(current=='actor'){
		corrob_util.saveActor('annotate');
	}else{
		corrob_util.save_element_multi(current);
	}

});

corrob_util.$('#all-bulletins-selected, #all-actors-selected, #all-incidents-selected').click(function(){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase();
	var items = corrob_util.$('#'+current+'-table').find('.is-selector > input')
        items.each(function(){
                corrob_util.$(this).prop('checked',true);
        });
        jQuery('#number-'+current.toLowerCase()+'-selected').html(items.length);
});

corrob_util.$('#annotate-bulletins-selected, #annotate-actors-selected, #annotate-incidents-selected').click(function(){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	corrob_util.$('#number-'+current+'s-selected-annotate').html(corrob_util.$('#number-'+current+'s-selected').html());
	corrob_util.$('.'+current+'-overlay-annotate').removeClass('hidden');
});
corrob_util.$('#clear-bulletins-selected, #clear-actors-selected, #clear-incidents-selected').click(function(){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase();

	var items = corrob_util.$('#'+current+'-table').find('.is-selector > input')
	items.each(function(){
		corrob_util.$(this).prop('checked',false);
	});
        jQuery('#number-'+current.toLowerCase()+'-selected').html('0');
	
});
corrob_util.$('#delete_bulletins, #delete_actors, #delete_incidents').click(function(){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase();
	corrob_util.$('#confirm_dialog').html('Are you certain that you wish to delete the selected '+current);
	corrob_util.$('#confirm_dialog').dialog({
		title : 'Delete '+current,
		buttons : {
			"Confirm" : function (){
				corrob_util.delete();
				corrob_util.$('#confirm_dialog').dialog("close");
			},
			"Cancel" : function (){
				corrob_util.$('#confirm_dialog').dialog("close");
			}
		}
	});
	corrob_util.$('#confirm_dialog').dialog("open");
});
corrob_util.$('#bulletin-action_edit, #actor-action_edit, #incident-action_edit').click(function(){
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	var id = corrob_util.$('#view_'+current+'_id').html();
	var requestURL = current+'/'+ id + '/edit/';
        corrob_util.$.ajax({url:requestURL}).done(function(data){
		corrob_util.loadEditableOverlay(data);
        }); 
});
corrob_util.$('.do-expand').click(function(){



var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
var currentFirstUpper = current[0].toUpperCase() + '' +current.slice(1,current.length);
if(!corrob_util.$('#embedded-search-'+current).hasClass('hidden')){
	corrob_util.$('.'+current+'-overlay').removeClass('is-middle');
}

if(corrob_util.$('#view-placeholder-'+current+' > .'+currentFirstUpper).hasClass('in-view')){
	corrob_util.$('.'+current+'-overlay, .'+currentFirstUpper+':not(".in-table")').addClass('is-expanded');

	corrob_util.$('#'+current+'-view-header-block-ne').addClass('hidden');	
	corrob_util.$('#'+current+'-view-body-block-ne').addClass('hidden');	
	corrob_util.$('#'+current+'-view-header-expand').removeClass('hidden');	
	corrob_util.$('#'+current+'-view-firstcol-expand').removeClass('hidden');	
	corrob_util.$('#'+current+'-view-lastcol-expand').removeClass('hidden');	
	return false;
}

corrob_util.$('.'+current+'-overlay, .'+currentFirstUpper+':not(".in-table")').addClass('is-expanded');
corrob_util.$('.'+current+'-not-expanded-edit').addClass('hidden');
corrob_util.$('#'+current+'-id-block').prependTo(corrob_util.$('#'+current+'-header-expand'));
corrob_util.$('#'+current+'-title-block').appendTo(corrob_util.$('#'+current+'-title-expand'));

if(current=='incident'){
	corrob_util.$('#'+current+'-crime-block').appendTo(corrob_util.$('#'+current+'-body-expand'));
}else{
	corrob_util.$('#'+current+'-source-block').appendTo(corrob_util.$('#'+current+'-body-expand'));
}


corrob_util.$('#'+current+'-description-block').appendTo(corrob_util.$('#'+current+'-body-expand'));
if(current=='incident'){
	corrob_util.$('#'+current+'-comment-block').appendTo(corrob_util.$('#'+current+'-body-expand'));
}else{
	corrob_util.$('#'+current+'-media-block').appendTo(corrob_util.$('#'+current+'-body-expand'));
}
corrob_util.$('#'+current+'-actor-list-block').appendTo(corrob_util.$('#'+current+'-body-expand'));

if(current == 'incident'){
	corrob_util.$('#'+current+'-bulletin-block').appendTo(corrob_util.$('#'+current+'-body-expand'));
	corrob_util.$('#'+current+'-incident-block').appendTo(corrob_util.$('#'+current+'-body-expand'));
}

corrob_util.$('#'+current+'-group-block').appendTo(corrob_util.$('#'+current+'-goup-expand'));
corrob_util.$('#'+current+'-assignment-block').insertAfter(corrob_util.$('#'+current+'-score-block'));
corrob_util.$('#'+current+'-status-block').insertAfter(corrob_util.$('#'+current+'-score-block'));

corrob_util.$('#'+current+'-event-block').appendTo(corrob_util.$('#'+current+'-goup-expand'));
corrob_util.$('#'+current+'-location-block').appendTo(corrob_util.$('#'+current+'-goup-expand'));
corrob_util.$('#'+current+'-label-block').appendTo(corrob_util.$('#'+current+'-goup-expand'));

corrob_util.$('.'+current+'-expanded-edit').removeClass('hidden');

relayout();

})


corrob_util.$('#show_save_current_search').click(function(){
	corrob_util.$('#predefined-search').removeClass('hidden');
});

corrob_util.$('#save_current_search').click(function(){
	var name = corrob_util.$('#predfiend-search-name').val();
	var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
	var query = corrob_util.$('#'+current+'-content').data(current+'-last-search');
	corrob_util.save_predefined_search(name,current,query);	
        corrob_util.$('#predefined-search').addClass('hidden');

});


corrob_util.$('.do-collapse').click(function(){

var current = corrob_util.$('.current > a > span > span').html().toLowerCase().slice(0,-1);
var currentFirstUpper = current[0].toUpperCase() + '' +current.slice(1,current.length);
corrob_util.$('.'+current+'-overlay, .'+currentFirstUpper+':not(".in-table")').removeClass('is-expanded');

if(current == 'actor'){

	return false;

}

if(!corrob_util.$('.embedded-search-'+current).hasClass('hidden')){
	corrob_util.$('.'+current+'-overlay').addClass('is-middle');
}
if(corrob_util.$('#view-placeholder-'+current+' > .'+currentFirstUpper).hasClass('in-view')){

corrob_util.$('#'+current+'-view-header-block-ne').removeClass('hidden');	
corrob_util.$('#'+current+'-view-body-block-ne').removeClass('hidden');	
corrob_util.$('#'+current+'-view-header-expand').addClass('hidden');	
corrob_util.$('#'+current+'-view-firstcol-expand').addClass('hidden');	
corrob_util.$('#'+current+'-view-lastcol-expand').addClass('hidden');	
	return false;
}


corrob_util.$('.'+current+'-overlay, .'+currentFirstUpper+':not(".in-table")').removeClass('is-expanded');
corrob_util.$('.'+current+'-expanded-edit').addClass('hidden');
corrob_util.$('.'+current+'-not-expanded-edit').removeClass('hidden');

corrob_util.$('#'+current+'-id-block').prependTo(corrob_util.$('#'+current+'-id-block-ne'));
corrob_util.$('#'+current+'-title-block').appendTo(corrob_util.$('#'+current+'-id-block-ne'));

corrob_util.$('#'+current+'-group-block').appendTo(corrob_util.$('#'+current+'-group-block-ne'));

if(current == 'incident'){
corrob_util.$('#'+current+'-incident-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
corrob_util.$('#'+current+'-bulletin-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
}
corrob_util.$('#'+current+'-actor-list-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
corrob_util.$('#'+current+'-description-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));

if(current=='bulletin'){
corrob_util.$('#'+current+'-media-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
}

corrob_util.$('#'+current+'-label-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
if(current=='incident'){
corrob_util.$('#'+current+'-comment-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
}

corrob_util.$('#'+current+'-location-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
corrob_util.$('#'+current+'-event-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
if(current=='incident'){
corrob_util.$('#'+current+'-crime-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
}else{
corrob_util.$('#'+current+'-source-block').insertAfter(corrob_util.$('#'+current+'-group-block-ne'));
}


relayout();

})
})}

if(typeof(corrob_util.init)!="undefined"){corrob_util.init();}})(corrob_util);

