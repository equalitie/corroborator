// Karma configuration
// Generated on Thu Sep 12 2013 09:07:54 GMT+0100 (IST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '.',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'test/test-main.js',
      //{pattern: 'test/fixtures/*.js', included: false},
      {pattern: 'test/fixtures/bootstrap.js'},
      {pattern: 'test/fixtures/*.html', served: true, included: false},
      {pattern: 'test/fixtures/filters.js', included: false},
      {pattern: 'test/fixtures/searchResults.js', included: false},
      {pattern: 'test/fixtures/extensions.js', included: false},
      {pattern: 'lib/**.js', included: false},
      {pattern: 'lib/streams.js', included: false},
      {pattern: 'lib/CRUD/*.js', included: false},
      {pattern: 'lib/CRUD/**/*.js', included: false},
      {pattern: 'lib/CRUD/**/**/*.js', included: false},
      {pattern: 'lib/CRUD/**/**/**/*.js', included: false},

      {pattern: 'lib/Data/*.js', included: false},

      {pattern: 'lib/elements/*.js', included: false},
      {pattern: 'lib/elements/**/*.js', included: false},

      {pattern: 'lib/Navigation/*.js', included: false},
      {pattern: 'lib/Navigation/**/*.js', included: false},

      {pattern: 'lib/SolrSearch/*.js', included: false},
      {pattern: 'lib/SolrSearch/**/*.js', included: false},
      {pattern: 'lib/SolrSearch/**/**/*.js', included: false},

      {pattern: 'components/jquery/jquery.js', included: false},
      {pattern: 'components/jasmine-jquery/lib/jasmine-jquery.js', included: false},
      {pattern: 'components/jquery.ui/dist/jquery-ui.js', included: false},

      {pattern: 'components/jquery-form/jquery.form.js', included: false},
      {pattern: 'components/jquery-timepicker-addon/jquery-ui-timepicker-addon.js', included: false},
      {pattern: 'components/jquery-timepicker-addon/jquery-ui-sliderAccess.js', included: false},
      {pattern: 'components/leaflet/dist/leaflet.js', included: false},
      {pattern: 'components/backbone/backbone.js', included: false},
      {pattern: 'components/moment/moment.js', included: false},
      {pattern: 'components/underscore/underscore.js', included: false},
      {pattern: 'components/handlebars/handlebars.js', included: false},
      {pattern: 'components/bacon/dist/Bacon.js', included: false},
      {pattern: 'components/bacon-ui/Bacon.UI.js', included: false},
      {pattern: 'components/spin.js/spin.js', included: false},
      {pattern: 'components/flowplayer/dist/flowplayer.js', included: false},
      // ajax solr stuff
      {pattern: 'components/ajax-solr/core.js', included: false},
      {pattern: 'components/ajax-solr/managers.js', included: false},
      {pattern: 'components/ajax-solr/widgets.js', included: false},
      



    ],


    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    preprocessors: {'*/.html': [] },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
