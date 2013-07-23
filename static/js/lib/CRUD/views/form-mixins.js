/*global define*/
// Author: Cormac McGuire
// ## Description
// Define mixins that are used across all our form views

define (
  [
    'jquery', 'underscore',
    'lib/streams',
    'lib/elements/combo',
    'lib/CRUD/templates/confirm-dialog.tpl'
  ],
  function ($, _, Streams, Combo, confirmDialogTmp) {
    'use strict';
    var ComboWidget  = Combo.ComboWidget,

    // ### ConfirmMixin
    // Show a dialog box asking the user to confirm their action
    ConfirmMixin = {
        // display a dialog box
        // dialog confirming that you want to exit the add/update
        requestCloseForm: function() {
          var dialogHTML = $(confirmDialogTmp());
          dialogHTML.dialog({
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
              'Close Form': function() {
                Streams.searchBus.push({
                  content: {},
                  type: 'close_form'
                });
                $(this).dialog('close');
              },
              'Cancel': function() {
                $(this).dialog('close');
              }
            }
          });

        }
      },

      Formatter = {
        makeIntStringsIntegers: function(value) {
          var intValue = parseInt(value, 10);
          return intValue.toString() === value ? intValue : value;
        },

        formArrayToData: function(namedArray) {
          var keys = _(namedArray).pluck('name'),
              values = _(namedArray).chain()
                                    .pluck('value')
                                    .map(this.makeIntStringsIntegers)
                                    .value();
          return _.object(keys, values);
        }
      },
      // give rich functionality to date and combo fields
      WidgetMixin = {
        // enable a jquery ui date field for date of birth
        enableDateFields: function() {
          _.each(this.dateFields, this.enableDateField, this);
          
        },
        enableDateField: function(dateFieldName) {
          $('input[name=' + dateFieldName + ']').datepicker({
            dateFormat: 'yy-mm-dd'
          });
        },

        // enable the combo box functionality
        enableComboBoxes: function() {
          _.each(this.comboIds, this.enableComboBox, this);
        },
        enableComboBox: function(comboId) {
          var comboWidget = new ComboWidget(comboId);
        },

        // enable auto complete fields  
        // the actual data gets stored  to a hidden input field
        enableAutoCompleteFields: function() {
          _.each(this.autoCompleteFields, this.enableAutoCompleteField, this);
        },
        enableAutoCompleteField: function(field) {
          console.log(field.content);
          $(field.className).autocomplete({
            minLength: 0,
            source: field.content,
            select: function(event, ui) {
              $(field.className).val(ui.item.label);
              $('input[name='+ field.name + ']').val(ui.item.id);
            }
          });
          
        },

        // enable sliders, store the value in the designated field
        enableSliderFields: function() {
          _.each(this.sliderFields, this.enableSliderField, this);
        },
        enableSliderField: function(field) {
          // handle slider values
          var updateValue = function(e) {
            var value = $(field.sliderDiv).slider('value');
            $(field.display).text(value);
          };
          // create the slider
          $(field.sliderDiv).slider({
            min: field.startPoint,
            max: field.endPoint,
            step: 1,
            value: field.value,
            slide: updateValue
          });
        }

      };

    return {
      ConfirmMixin: ConfirmMixin,
      WidgetMixin : WidgetMixin,
      Formatter   : Formatter
    };
});

