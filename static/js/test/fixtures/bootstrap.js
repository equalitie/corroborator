  var Bootstrap = (function() {
    var gl_s3_aws_media_url = '';
    var gl_ac_role_list = [];
    var gl_ac_relation_list = [];
    var gl_ac_crimes_list = [];
    var special_global_ac_sources_list = [];
    var gl_ac_loc_set = [];
    var gl_ac_loc_ac_set = [];
    var gl_ac_users_list = [];
      gl_ac_role_list.push({ role:"Killed"});
      gl_ac_role_list.push({ role:"Tortured"});
      gl_ac_role_list.push({ role:"Wounded"});
      gl_ac_role_list.push({ role:"Detained"});
      gl_ac_role_list.push({ role:"Kidnapped"});
      gl_ac_relation_list.push( {relation:"Parent"} );
      gl_ac_relation_list.push( {relation:"Sibling"} );
      gl_ac_relation_list.push( {relation:"Family member"} );
      gl_ac_relation_list.push( {relation:"Superior officer"} );
      gl_ac_relation_list.push( {relation:"Subordinate officer"} );
    
      gl_ac_users_list.push({
        label:"admin",
        id:"1"
      });
    
    //consolidate our init data under one variable
    return {
        gl_s3_aws_media_url: '',
        gl_username: 'admin',
        gl_userid: '1',
        gl_ac_role_list: gl_ac_role_list,
        gl_ac_relation_list: gl_ac_relation_list,
        gl_ac_crimes_list: gl_ac_crimes_list,
        special_global_ac_sources_list: special_global_ac_sources_list,
        gl_ac_loc_set: gl_ac_loc_set,
        gl_ac_loc_ac_set: gl_ac_loc_ac_set,
        gl_ac_users_list: gl_ac_users_list,
        username: 'admin',
        apiKey: 'cabbage'
    };

  }());
