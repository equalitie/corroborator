/*global define, it, with */
'use strict';
define([
  'intern!bdd',
  'intern/chai!expect',
  '../views',
  'jquery'
], function (bdd, expect, views, $) {
    console.log($('body'));
    console.log(views);
    bdd.describe('my Solr view tests', function () {
      var hello = 'hello';
    
      bdd.beforeEach(function() {
      });
    
      bdd.it("should have a hello variable", function() {
        expect(hello==='hello').to.be.true;
      });
      
      
    });
    
});
