/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// define a date formatter helper to use in our templates

define (
  [
    'handlebars', 'moment', 'underscore', 'moment_langs'
  ],
  function (Handlebars, moment, _) {
    'use strict';

    Handlebars.registerHelper('if_eq', function(context, options) {
      if (context === options.hash.compare) {
        return options.fn(this);
      }
      return options.inverse(this);
    });

    var mapKeyToLabel = function(fieldKey, key) {
      return _(Bootstrap[key]).findWhere({key: fieldKey}).value;
    };

    var getFromUri = function(uri, key) {
      var searchField = {resource_uri: uri};
      return _.findWhere(Bootstrap[key], searchField).name;
    };

    // key value functions
    // could be consolidated into one function
    Handlebars.registerHelper('fetchCivilian', function(context, options) {
        if (context) {
          return mapKeyToLabel(context, 'civilian');
        }
        return context;
    });
    Handlebars.registerHelper('fetchAge', function(context, options) {
        if (context) {
          return mapKeyToLabel(context, 'ages');
        }
        return context;
    });
    Handlebars.registerHelper('fetchSex', function(context, options) {
        if (context) {
          return mapKeyToLabel(context, 'sexes');
        }
        return context;
    });

    Handlebars.registerHelper('fetchRole', function(context, options) {
        var formattedContext = context;
        if (context) {
          var roles = Bootstrap.gl_ac_role_list.concat(Bootstrap.gl_ac_relation_list),
              roleSearchField = {key: context};
          formattedContext = _.findWhere(roles, roleSearchField).value;
        }
        return formattedContext;
    });

    // resource_uri functions
    Handlebars.registerHelper('fetchLabel', function(context, options) {
        if (context) {
          return getFromUri(context, 'labels');
        }
        return context;
    });

    Handlebars.registerHelper('fetchStatus', function(context, options) {
        if (context) {
          return getFromUri(context, 'all_statuses');
        }
        return context;
    });

    Handlebars.registerHelper('fetchUser', function(context, options) {
        if (context) {
          return getFromUri(context, 'gl_ac_users_list');
        }
        return context;
    });



    Handlebars.registerHelper('fetchLocation', function(context, options) {
        var formattedContext = context;
        if (context !== undefined) {
          return getFromUri(context, 'locations');
        }
        return '';
    });

    // Text formatters
    Handlebars.registerHelper('pluralise', function(context, options) {
      var tpl = (context.hash.tplVar) ?
        context.hash.tpl[context.hash.tplVar] :
        context.hash.tpl;
      if (context.hash.numItems === 0 && !context.hash.showEmpty) {
        return '';
      }
      var out = (context.hash.numItems === 1 )?
        _.template(tpl.single)({
          num: context.hash.numItems
        }):
        _.template(tpl.plural)({
          num: context.hash.numItems
        });
      //console.log(context, tpl, out);
      return out;
    });

    //  Date helpers
    //  usage: {{dateFormat creation_date format="MMMM YYYY"}}
    Handlebars.registerHelper('dateFormat', function(context, block) {
      var formattedContext = context;
      moment.lang(Bootstrap.locale);
      if (moment && formattedContext !== undefined) {
        var f = block.hash.format || "MMM Do, YYYY";
        formattedContext =  moment(context).format(f);
      }
      return formattedContext;
    });

    Handlebars.registerHelper('dateTimeFormat', function(context, block) {
      var formattedContext = context;
      if (moment && formattedContext) {
        var f = block.hash.format || "YYYY-MM-DD HH:mm:ss";
        formattedContext =  moment.unix(context).format(f);
      }
      return formattedContext;
    });

    Handlebars.registerHelper('formatDuration', function(context, block) {
      var formattedContext = context;
      if (moment && formattedContext) {
        var f = block.hash.format || "YY-MM-DD HH:mm:ss";
        formattedContext =  moment.duration(context, 'seconds').humanize();
      }
      return formattedContext;
    });

    Handlebars.registerHelper('formDateFormat', function(context, block) {
      var formattedContext = context;
      if (moment && formattedContext) {
        var f = block.hash.format || "YYYY-MM-DD";
        formattedContext =  moment(context).format(f);
      }
      return formattedContext;
    });

    // List functions
    Handlebars.registerHelper('sourceList', function(context, block) {
      var ret = '',
          start = '<span class="source">',
          end = '</span>',
          i=0, j=context.length;

      for(i, j; i<j; i++) {
        ret =  ret + start + context[i] + end;
        if (i<j-1) {
          ret =  ret + ', ';
        }
      }
      return new Handlebars.SafeString(ret);
    });


    Handlebars.registerHelper('commaSeparatedList', function(context, block) {
      var list = [];
      if (context.hash) {
        list = _(context.hash.list).map(function(loc_uri) {
          return getFromUri(loc_uri, 'locations');
        });
      }
      else {
        list = context;
      }
      var ret = "", i=0, j=0;
      if (list !== undefined) {
        for(i=0, j=list.length; i<j; i++) {
          ret = ret + list[i];
          if (i<j-1) {
            ret = ret + ", ";
          }
        }
      }
      return ret;
    });

});
