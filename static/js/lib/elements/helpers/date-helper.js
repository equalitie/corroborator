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
    //  format an ISO date using Moment.js
    //  http://momentjs.com/
    //  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
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

    Handlebars.registerHelper('if_eq', function(context, options) {
        if (context === options.hash.compare) {
          return options.fn(this);
        }
        return options.inverse(this);
    });

    var mapKeyToLabel = function(keyList, key) {
      var keyMapper = function(fieldName) {
        return _(keyList).findWhere({key: fieldName}).value;
      };
      return (arguments.length === 1) ?
        keyMapper:
        keyMapper(key);
    };

    var keyMap = {
      'age': mapKeyToLabel(Bootstrap.ages),
      'sex': mapKeyToLabel(Bootstrap.sexes),
      'civilian': mapKeyToLabel(Bootstrap.civilian)
    };

    Handlebars.registerHelper('fetchCivilian', function(context, options) {
        var formattedContext = context;
        if (context) {
          formattedContext = keyMap['civilian'](context);
        }
        return formattedContext;
    });
    Handlebars.registerHelper('fetchAge', function(context, options) {
        var formattedContext = context;
        if (context) {
          formattedContext = keyMap['age'](context);
        }
        return formattedContext;
    });
    Handlebars.registerHelper('fetchSex', function(context, options) {
        var formattedContext = context;
        if (context) {
          formattedContext = keyMap['sex'](context);
        }
        return formattedContext;
    });

    Handlebars.registerHelper('fetchLabel', function(context, options) {
        var formattedContext = context;
        if (context) {
          var labels = Bootstrap.labels,
              labelSearchField = {resource_uri: context};
          formattedContext = _.findWhere(labels, labelSearchField).name;
        }
        return formattedContext;
    });

    Handlebars.registerHelper('fetchStatus', function(context, options) {
        var formattedContext = context;
        if (context) {
          var statuses = Bootstrap.all_statuses,
              statusSearchField = {resource_uri: context};
          formattedContext = _.findWhere(statuses, statusSearchField).name;
        }
        return formattedContext;
    });

    Handlebars.registerHelper('fetchUser', function(context, options) {
        var formattedContext = context;
        if (context) {
          var users = Bootstrap.gl_ac_users_list,
              userSearchField = {resource_uri: context};
          formattedContext = _.findWhere(users, userSearchField).name;
        }
        return formattedContext;
    });

    Handlebars.registerHelper('fetchRole', function(context, options) {
        var formattedContext = context;
        if (context) {
          var roles = Bootstrap.gl_ac_role_list.concat(Bootstrap.gl_ac_relation_list),
              roleSearchField = {key: context};
          formattedContext = _.findWhere(roles, roleSearchField).name;
        }
        return formattedContext;
    });

    Handlebars.registerHelper('fetchLocation', function(context, options) {
        var formattedContext = context;
        if (context !== undefined) {
          var locations, locationName, locationSearchField, retrievedLocation;
          locationName = '';
          locations = Bootstrap.locations;
          locationSearchField = {resource_uri: context};
          retrievedLocation = _.findWhere(locations, locationSearchField).name;
          if (retrievedLocation) {
            locationName = retrievedLocation;
          }
          formattedContext = locationName;
        }
        return formattedContext;
    });

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

    Handlebars.registerHelper('pluralise', function(context, options) {
      var word, numItems, suffix;
      word = context.hash.word;
      numItems = context.hash.numItems;
      suffix = numItems === 1 ? '': 's';
      return word + suffix;
    });

    Handlebars.registerHelper('commaSeparatedList', function(context, block) {
      var ret = "", i=0, j=0;
      if (context !== undefined) {
        for(i=0, j=context.length; i<j; i++) {
          ret = ret + context[i];
          if (i<j-1) {
            ret = ret + ", ";
          }
        }
      }
      return ret;
    });

});
