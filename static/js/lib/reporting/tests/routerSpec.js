/*global spyOn, runs, waitsFor, jasmine, describe, afterEach, beforeEach, xit, it, expect*/
// Author: Cormac McGuire
// ### Description
// test router dispatching the correct events

define (
  [
    'jquery',
    'lib/reporting/router/router',
    'lib/reporting/streams'
  ],
  function ($, Router, EventStream) {
    'use strict';
    describe('Router ', function() {
      var router,
          value, flag;
      beforeEach(function() {
        router = new Router();
      });
      afterEach(function() {});
      it('should return a router creation function', function(){
        expect(typeof(router)).toBe('object');
        expect(typeof(Router)).toBe('function');
      });

      it('should dispatch routing events', function(){
        runs(function() {
          value = 0;
          flag = false;
          EventStream.filter(function(value) {
                      return value.type === 'route' && value.content.route === 'actor';
                     })
                     .onValue(function() {
                       flag = true;
                     });
          router.navigate('tab/actor', {trigger: true});
        });
        waitsFor(function() {
          value++;
          return flag;
        }, 'value should be incremented', 500);

        runs(function() {
          expect(value).toBeGreaterThan(0);
        });


      });

    });
});
