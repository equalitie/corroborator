/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a map view that sends off lat lng co-ordinates

define (
  [
    'backbone', 'jquery', 'underscore', 'leaflet',
    'lib/streams',
    'lib/SolrSearch/templates/map-container.tpl'
  ],
  function (Backbone, $, _, L, Streams, mapContainerTmp) {
    'use strict';

    var CoordinatePickerView,
        searchBus = Streams.searchBus,
        api_key = 'e76611fbacfb4bb2a8709c6e51201048',
        start_lat = 33.83392,
        start_long = 30.4541;

    // ### CoOrdinatePickerView
    // Display a map that allows the user to pick a locations
    CoordinatePickerView = Backbone.View.extend({
      className: 'filter is-map',
      tagName: 'div',
      currentMarker: undefined,
      initialize: function() {
        this.render();
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
        this.map.off('click', this.onMapClick);
      },
      // display a map centred on syria  
      // create a map attribute on the view object
      displayMap: function() {
        var mapElement = this.$el.children('.map').children().get(0),
            zoom_level = 5,
            tileLayerUrl = 
              'http://{s}.tile.cloudmade.com/' + 
              api_key + '/997/256/{z}/{x}/{y}.png',
            map = L.map(mapElement, {
              scrollWheelZoom: false
            })
            .setView([start_lat, start_long], zoom_level);
                  
        L.tileLayer(tileLayerUrl, {
            maxZoom: 18,
        }).addTo(map);
        this.map = map;
        this.addMapListener();
      },
      addMapListener: function() {
        this.map.on('click', this.onMapClick, this);
      },

      onMapClick: function(e) {
        if (this.currentMarker === undefined) {
          this.createMarker(e.latlng);
        }
        else {
          this.currentMarker.setLatLng(e.latlng);
        }
      },

      createMarker: function(latlng) {
        this.currentMarker = 
          L.marker(latlng, {
            draggable: true,
            riseOnHover: true
          })
          .addTo(this.map);
        this.currentMarker.on('click', this.removeMarker, this);
        this.currentMarker.on('dragend', this.sendCoordinates, this);
      },
      removeMarker: function() {
        this.destroyMarker();
      },
      sendCoordinates: function(e) {
        console.log(e);
      },
      destroyMarker: function() {
        if (this.currentMarker !== undefined) {
          this.currentMarker.off('click', this.removeMarker);
          this.map.removeLayer(this.currentMarker);
          this.currentMarker = undefined;
        }
      },

      // render the map container
      render: function() {
        var html = mapContainerTmp();
        this.$el.append(html)
                .addClass(this.className);
        return this;
      }
    });

    return CoordinatePickerView;
    
});

