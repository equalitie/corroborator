var link_reader = function(){
	var hash_url = window.location.hash;

	var r = hash_url.split('/');
	var type = r[0].split('#')[1];
	var id = r[1];
	var mode = r[2];	
	
	if(mode == 'view'){
		corrob_util.loadViewEntity(id,type);
	}
}
