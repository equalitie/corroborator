/*global define*/
// Author: Cormac McGuire
// ## Description
// Define mixins that are used across all our form views

define (
  [
    'jquery', 'underscore',
    'lib/streams',
    'lib/elements/combo',
    'lib/elements/label-widget',
    'lib/elements/date-time-range',
    'lib/CRUD/templates/confirm-dialog.tpl',
    'jquery_slider'
  ],
  function ($, _, Streams, Combo, LabelWidget, DateTimeRangeView, confirmDialogTmp) {
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
        relatedFields: [
          'sources'
        ],
        makeIntStringsIntegers: function(value) {
          var intValue = parseInt(value, 10);
          return intValue.toString() === value ? intValue : value;
        },
        // reduce an array of objects
        // in the format {"name":"foo","value":"1"}
        // to an object, preserving objects associated with duplicated keys
        reduceToObject: function(memo, formEl) {
          var value,
              firstEl,
              parsedValue = this.makeIntStringsIntegers(formEl.value);
          if (memo[formEl.name] !== undefined) {
            value = [];
            firstEl = memo[formEl.name];
            value = [firstEl, parsedValue];
            value = _.flatten(value);
          }
          else {
            value = parsedValue;
          }
          memo[formEl.name] = value;
          return memo;
        },

        formArrayToData: function(namedArray) {
          return _.reduce(namedArray, this.reduceToObject, {}, this);
        }
      },

      // give rich functionality to date and combo fields
      WidgetMixin = {
        // enable the widgets associated with this form view
        enableWidgets: function() {
          this.enableAutoCompleteFields();
          this.enableSliderFields();
          this.enableLabelFields();
          this.enableDateFields();
          this.enableDateTimeFields();
          this.enableDateTimeRangeFields();
          this.enableComboBoxes();
        },

        // enable a jquery ui date field for date of birth
        enableDateTimeFields: function() {
          _.each(this.dateTimeFields, this.enableDateTimeField, this);
          
        },
        enableDateTimeField: function(dateTimeField) {
          $(dateTimeField.el).datetimepicker({
            dateFormat: 'yy-mm-dd',
            timeFormat: 'HH:mm:00'
          });
        },
        // enable a jquery ui date field for date of birth
        enableDateTimeRangeFields: function() {
          _.each(this.dateTimeRangeFields, this.enableDateTimeRangeField, this);
          
        },
        enableDateTimeRangeField: function(dateTimeField) {
          var dateTimeRange = new DateTimeRangeView({
            entityType: this.entityType,
            el        : dateTimeField.el,
            from      : dateTimeField.from,
            to        : dateTimeField.to
          });
          this.childViews.push(dateTimeRange);
        },

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
          $(field.className).autocomplete({
            minLength: 0,
            source: field.content,
            select: function(event, ui) {
              $(field.className).val(ui.item.label);
              $('input[name='+ field.name + ']').val(ui.item.id);
            }
          });
          
        },

        enableLabelFields: function() {
          _.each(this.labelFields, this.enableLabelField, this);
        },
        enableLabelField: function(field) {
          var labelWidget = new LabelWidget({
            entityType: this.entityType,
            collection: field.collection,
            el        : field.containerid,
            display   : field.display
          });
        },

        // enable sliders, store the value in the designated field
        enableSliderFields: function() {
          _.each(this.sliderFields, this.enableSliderField);
        },

        enableSliderField: function(field) {
          // handle slider values
          var updateValue = function(e) {
            var value = $(field.sliderDiv).slider('value');
            $(field.display).text(value);
            $('input[name=' + field.formField + ']').val(value);
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

