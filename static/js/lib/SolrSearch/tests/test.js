/*global define, it, with */
'use strict';
define([
  'intern!bdd',
  'intern/chai!expect',
  '../views'//,
  //'jquery!jquery',
], function (bdd, expect, views/*, $*/) {
    //console.log($.ajax);
    bdd.describe('my Solr view tests', function () {
      var hello = 'hello';
    
      bdd.beforeEach(function() {
      });
    
      bdd.it("should have a hello variable", function() {
        expect(hello==='hello').to.be.true;
      });
    });
    
});
