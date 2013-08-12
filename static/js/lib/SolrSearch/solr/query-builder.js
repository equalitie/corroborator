/*global define */
// Author: Cormac McGuire
// ### Description
// build the solr searchQuery based on filters sent

define (
  [
    'underscore',
    'lib/streams'
  ],
  function (_, Streams) {
/*
    searchStrings = {
        //Should match 22 records
        "sampleBasic": "mohamad",
        //Should match 16 records
        "sampleBasicMultiWord": "mohamad gov syrian",
        //Should match Mohameed and Civilian, should match 1 record
        "sampelBoolBasic": "(mohamad && Ciilian)",
        //Should match 10 records
        "sampleBoolBasicMulti": "((mohamad) && (Sunnni || arbic))",
        //Should match 3 records
        "sampleBoolMulti": "((mohamad && kurdish) && (Sunnni || arbic))",
        //Should match 1 record
        "sampleBoolVeryComplex": "((mohamad && kurdish) && (Sunnni || arbic) &&(Syrien && FSb))"
        //Should match 1 record
        "sampleBoolDateVeryComplex": "((mohamad && kurdish) && (Sunnni || arbic) &&(Syrien && FSb)&&(Aug 29))"
    }
*/
    'use strict';
    var eventIdentifier = 'query_builder',
        nonbooleanParse,
        booleanParse,
        parseQuery = function(searchQuery) {
            var parsedString = '';
            if(searchQuery.indexOf('~') === -1){
                //Non-boolean strings
                if (searchQuery.indexOf('&&') === -1 && 
                    searchQuery.indexOf('(')  === -1 &&
                    searchQuery.indexOf('||') === -1 ) {
                    parsedString = nonbooleanParse(searchQuery);
                }    
                //Boolean strings
                else{
                    parsedString = booleanParse(searchQuery);
                }
            }
            return parsedString;
        },
        sendResult = function(searchQuery) {
            Streams.searchBus.push({
              type: eventIdentifier,
              content: { 
                  raw: searchQuery
              }
            });
        };
    booleanParse = function(item) {
        var resultString = item,
            re = /([a-zA-Z]+)/g,
            tokens = re.exec(item);
            
        
        while (tokens !== null){
            var elem = tokens[0];
            resultString = resultString.replace(elem, elem+'~');        
        }
        return resultString;
    };

    nonbooleanParse = function(item) {
        var tokens = item.split(' ');
        var resultString = '';
        _.each(tokens, function(token){
            resultString += token + '~ ';
        });
        return resultString;                 
    };      

    // ### ParseFilter
    // main function
    // augments user search queries to ensure proper use of
    // of Solr Fuzzy search unless key '~' is already used in
    // the searchQuery.
    var QueryBuilder = function(searchQuery){
        if(searchQuery !== undefined && searchQuery.length > 0) {
            this.parsedString = parseQuery(searchQuery);
        }else{
            this.parsedString = "*:*";
        }
        //sendResult(searchQuery);
    };

    return QueryBuilder;
});

