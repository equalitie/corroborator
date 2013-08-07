/*global define*/
// Author: Cormac McGuire
// ### Description
// define a date formatter helper to use in our templates

define (
  [
    'handlebars', 'moment'
  ],
  function (Handlebars, moment) {
    'use strict';
    //  format an ISO date using Moment.js
    //  http://momentjs.com/
    //  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
    //  usage: {{dateFormat creation_date format="MMMM YYYY"}}
    Handlebars.registerHelper('dateFormat', function(context, block) {
      var formattedContext = context;
      if (moment && formattedContext !== undefined) {
        var f = block.hash.format || "MMM Do, YYYY";
        formattedContext =  moment(context).format(f);
      }
      return formattedContext;
    });

    Handlebars.registerHelper('formDateFormat', function(context, block) {
      var formattedContext = context;
      if (moment && formattedContext !== undefined) {
        var f = block.hash.format || "YYYY-MM-DD";
        formattedContext =  moment(context).format(f);
      }
      return formattedContext;
    });

    Handlebars.registerHelper('if_eq', function(context, options) {
      console.log(context, options.hash.compare);
        if (context === options.hash.compare) {
          return options.fn(this);
        }
        return options.inverse(this);
    });

});
