var solrSpatialSearch = function(coords_obj,mode){
	coords = (mode=='map')?coords_obj.lat + ',' + coords_obj.lng:coords_obj;
	var solrInstance = 'https://sjac.rightscase.org/solr/select?';
	var q = 'q=django_ct:*location&fq={!geofilt}&sfield=location';
	var pt = '&pt='+coords;
	var d = '&d=300';
	var fl = '&fl=name';
	var wt = '&wt=json';
	var solrRequest = solrInstance+q+pt+d+fl+wt;
	jQuery.ajax({
		url: solrRequest,
		type:'GET',
		headers: { "X-CSRFToken": corrob_util.getCookie("csrftoken")},
		datatype: 'json',
		error: function(textStatus){
			alert(textStatus);
		}

	}).done(function(data){
		var response = jQuery.parseJSON(data);
		filter_query = '';
		if(response.response.docs.numfound == 0){
			alert('No Incidents for for given location');
			return false;
		}
		jQuery.each(response.response.docs,function(){
			filter_query += this.name +' ';
		});
		filter_query = encodeURIComponent(jQuery.trim(filter_query));
		var solrInstance = 'https://sjac.rightscase.org/solr/select?';
	        var q = 'q=django_ct:*incident';
		var fq = '&fq='+filter_query;
		var wt = '&wt=json';
		var requestURL = solrInstance + q + fq + wt;
		jQuery.ajax({
                url: requestURL,
                type:'GET',
                headers: { "X-CSRFToken": corrob_util.getCookie("csrftoken")},
                datatype: 'json',
                error: function(textStatus){
                        alert(textStatus);
                }
		}).done(function(data){
			loadDocuments(jQuery.parseJSON(data).response);
		});

	});

}

var loadDocuments = function(data){

	$ = jQuery;

            var current = $('.current > a > span > span').html();
            $("#search-bulletin").val('');

            $("#"+current.toLowerCase()+"-table").empty();

            for (var i = 0, l = data.docs.length; i < l; i++) {
                     var doc = data.docs[i];
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
var populateMapWithEntities = function(map){
	jQuery.each(gl_ac_loc_set,function(){
		if(this.latlng != '0.0,0.0'){
		var marker = L.marker();
		marker
			.setLatLng(this.latlng)
			.addTo(map);
		}
	});

}
var createFilterSearchMap = function(map_elem_id, start_lat, start_long){
	var zoom_level = 5
	var map = L.map(map_elem_id).setView([start_lat, start_long], zoom_level);

// var map = L.map('map').setView([33.83392, 30.4541], 6);
	L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
	}).addTo(map);
var popup = L.popup();
	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Searching for geographically related Incidents at " + e.latlng.toString())
			.openOn(map);
		solrSpatialSearch(e.latlng,'map');
	}

	populateMapWithEntities(map);
	
	map.on('click', onMapClick);
	return false;
}
