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
        crudBus = Streams.crudBus,

    // ### ConfirmMixin
    // Show a dialog box asking the user to confirm their action
    ConfirmMixin = {
        // display a dialog box
        // dialog confirming that you want to exit the add/update
        disableConfirm: function() {
        },
        requestCloseForm: function() {
          var dialogHTML = $(confirmDialogTmp());
          dialogHTML.dialog({
            resizable: false,
            height: 160,
            modal: true,
            buttons: {
              'Close Form': function() {
                crudBus.push({
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

      // ### Formatter
      // pull the data from form elements and convert them into
      // a digestible format
      Formatter = {
        relatedFields: [
          'sources'
        ],
        makeIntStringsIntegers: function(value) {
          var intValue = parseInt(value, 10);
          return intValue.toString() === value ? intValue : value;
        },

        // pull the data from the form
        formContent: function() {
          var formArray = $('.' + this.formElClass).serializeArray();
          console.log(formArray);
          return this.formArrayToData(formArray);
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

        disableWidgets: function() {
          this.disableDateFields();
          this.disableDateTimeFields();
          this.disableSliderFields();
          this.disableAutoCompleteFields();
        },

        // enable a jquery ui date field for date of birth
        disableDateTimeFields: function() {
          _.each(this.dateTimeFields, this.disableDateTimeField, this);
        },
        disableDateTimeField: function(dateTimeField) {
          $(dateTimeField.el).datetimepicker('disable');
          $(dateTimeField.el).remove();
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
        disableDateFields: function() {
          _.each(this.dateTimeRangeFields, this.enableDateTimeRangeField, this);
        },

        disableDateField: function(dateFieldName) {
          $('input[name=' + dateFieldName + ']').remove();
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
          this.childViews.push(comboWidget);
        },

        disableAutoCompleteFields: function() {
          _.each(this.autoCompleteFields, this.enableAutoCompleteField, this);
        },
        disableAutoCompleteField: function(field) {
          $(field.className).remove();
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
          var collection = new field.collection();
          var labelWidget = new LabelWidget({
            entityType: this.entityType,
            collection: collection,
            el        : field.containerid,
            display   : field.display
          });
          this.childViews.push(labelWidget);
        },

        disableSliderFields: function() {
          _.each(this.sliderFields, this.enableSliderField);
        },

        disableSliderField: function(field) {
          $(field.sliderDiv).remove();
        },
        // enable sliders, store the value in the designated field
        enableSliderFields: function() {
          _.each(this.sliderFields, this.enableSliderField);
        },

        enableSliderField: function(field) {
          // handle slider values
          var setInputVal = function(value) {
                $(field.display).text(value);
              },
              setDisplayVal = function(value) {
                $('input[name=' + field.formField + ']').val(value);
              },
              updateValue = function(e) {
                var value = $(field.sliderDiv).slider('value');
                setInputVal(value);
                setDisplayVal(value);
              };

          
          // create the slider
          $(field.sliderDiv).slider({
            min: field.startPoint,
            max: field.endPoint,
            step: 1,
            value: field.value,
            slide: updateValue
          });
          // set initial values
          setInputVal(field.value);
          setDisplayVal(field.value);
        }

      };

    return {
      ConfirmMixin: ConfirmMixin,
      WidgetMixin : WidgetMixin,
      Formatter   : Formatter
    };
});

