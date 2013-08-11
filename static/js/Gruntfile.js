module.exports = function(grunt) {

  // Initializes the Grunt tasks with the following settings
  grunt.initConfig({
    // compile our templates to js modules
    handlebars: {
      compile: {
        options: {
          namespace: false,
          amd: true
        },
        files: {
          'lib/elements/templates/combo-inner.tpl.js'       : 'lib/elements/templates/combo-inner.tpl',
          'lib/elements/templates/combo-outer.tpl.js'       : 'lib/elements/templates/combo-outer.tpl',
          'lib/elements/templates/label-widget.tpl.js'      : 'lib/elements/templates/label-widget.tpl',
          'lib/elements/templates/label.tpl.js'             : 'lib/elements/templates/label.tpl',
          'lib/elements/templates/select-option.tpl.js'     : 'lib/elements/templates/select-option.tpl',
          'lib/elements/templates/date-time-range.tpl.js'   : 'lib/elements/templates/date-time-range.tpl',

          // search results
          'lib/SolrSearch/templates/actor-results.tpl.js'   : 'lib/SolrSearch/templates/actor-results.tpl',
          'lib/SolrSearch/templates/actor.tpl.js'           : 'lib/SolrSearch/templates/actor.tpl',
          'lib/SolrSearch/templates/incident.tpl.js'        : 'lib/SolrSearch/templates/incident.tpl',
          'lib/SolrSearch/templates/bulletin-results.tpl.js': 'lib/SolrSearch/templates/bulletin-results.tpl',
          'lib/SolrSearch/templates/bulletin.tpl.js'        : 'lib/SolrSearch/templates/bulletin.tpl',

          // header
          'lib/SolrSearch/templates/header-count.tpl.js'    : 'lib/SolrSearch/templates/header-count.tpl',
          'lib/SolrSearch/templates/header.tpl.js'          : 'lib/SolrSearch/templates/header.tpl',

          // filters
          'lib/SolrSearch/templates/filters.tpl.js'         : 'lib/SolrSearch/templates/filters.tpl',
          'lib/SolrSearch/templates/filter-group.tpl.js'    : 'lib/SolrSearch/templates/filter-group.tpl',
          'lib/SolrSearch/templates/single-filter.tpl.js'   : 'lib/SolrSearch/templates/single-filter.tpl',
          'lib/SolrSearch/templates/incident-results.tpl.js': 'lib/SolrSearch/templates/incident-results.tpl',
          'lib/SolrSearch/templates/incident-filters.tpl.js': 'lib/SolrSearch/templates/incident-filters.tpl',
          'lib/SolrSearch/templates/actor-filters.tpl.js'   : 'lib/SolrSearch/templates/actor-filters.tpl',
          'lib/SolrSearch/templates/bulletin-filters.tpl.js': 'lib/SolrSearch/templates/bulletin-filters.tpl',
          'lib/SolrSearch/templates/selected-filters.tpl.js': 'lib/SolrSearch/templates/selected-filters.tpl',
          'lib/SolrSearch/templates/date-range.tpl.js'      : 'lib/SolrSearch/templates/date-range.tpl',
          'lib/SolrSearch/templates/selected-filter.tpl.js' : 'lib/SolrSearch/templates/selected-filter.tpl',
          'lib/SolrSearch/templates/map-container.tpl.js'   : 'lib/SolrSearch/templates/map-container.tpl',

          // forms
          'lib/CRUD/templates/search-templates/media-search-field.tpl.js'   : 'lib/CRUD/templates/search-templates/media-search-field.tpl',
          'lib/CRUD/templates/search-templates/media-result.tpl.js'         : 'lib/CRUD/templates/search-templates/media-result.tpl',
          'lib/CRUD/templates/search-templates/media-viewer.tpl.js'         : 'lib/CRUD/templates/search-templates/media-viewer.tpl',
          'lib/CRUD/templates/search-templates/media-form.tpl.js'           : 'lib/CRUD/templates/search-templates/media-form.tpl',

          'lib/CRUD/templates/search-templates/embedded-results.tpl.js'     : 'lib/CRUD/templates/search-templates/embedded-results.tpl',
          'lib/CRUD/templates/search-templates/confirm-dialog.tpl.js'       : 'lib/CRUD/templates/search-templates/confirm-dialog.tpl',
          'lib/CRUD/templates/search-templates/actor.tpl.js'                : 'lib/CRUD/templates/search-templates/actor.tpl',
          'lib/CRUD/templates/search-templates/actor-result.tpl.js'         : 'lib/CRUD/templates/search-templates/actor-result.tpl',
          'lib/CRUD/templates/search-templates/actor-search-field.tpl.js'   : 'lib/CRUD/templates/search-templates/actor-search-field.tpl',
          'lib/CRUD/templates/search-templates/incident-search-field.tpl.js': 'lib/CRUD/templates/search-templates/incident-search-field.tpl',
          'lib/CRUD/templates/search-templates/incident-result.tpl.js'      : 'lib/CRUD/templates/search-templates/incident-result.tpl',
          'lib/CRUD/templates/search-templates/incident.tpl.js'             : 'lib/CRUD/templates/search-templates/incident.tpl',
          //'lib/CRUD/templates/search-templates/location-search-field.tpl.js': 'lib/CRUD/templates/search-templates/location-search-field.tpl',
          //'lib/CRUD/templates/search-templates/location-result.tpl.js'      : 'lib/CRUD/templates/search-templates/location-result.tpl',
          'lib/CRUD/templates/search-templates/bulletin.tpl.js'             : 'lib/CRUD/templates/search-templates/bulletin.tpl',
          'lib/CRUD/templates/search-templates/bulletin-result.tpl.js'      : 'lib/CRUD/templates/search-templates/bulletin-result.tpl',
          'lib/CRUD/templates/search-templates/bulletin-search-field.tpl.js': 'lib/CRUD/templates/search-templates/bulletin-search-field.tpl',
          'lib/CRUD/templates/search-templates/comment-container.tpl.js'    : 'lib/CRUD/templates/search-templates/comment-container.tpl',
          'lib/CRUD/templates/search-templates/comment-form.tpl.js'         : 'lib/CRUD/templates/search-templates/comment-form.tpl',
          'lib/CRUD/templates/search-templates/comment-display.tpl.js'      : 'lib/CRUD/templates/search-templates/comment-display.tpl',
          'lib/CRUD/templates/search-templates/event-container.tpl.js'      : 'lib/CRUD/templates/search-templates/event-container.tpl',
          'lib/CRUD/templates/search-templates/event-form.tpl.js'           : 'lib/CRUD/templates/search-templates/event-form.tpl',
          'lib/CRUD/templates/search-templates/event-display.tpl.js'        : 'lib/CRUD/templates/search-templates/event-display.tpl',
         
          // individual display
          'lib/CRUD/templates/display-templates/display-manager.tpl.js'     : 'lib/CRUD/templates/display-templates/display-manager.tpl',
          'lib/CRUD/templates/display-templates/actor-display.tpl.js'       : 'lib/CRUD/templates/display-templates/actor-display.tpl',
          'lib/CRUD/templates/display-templates/bulletin-display.tpl.js'    : 'lib/CRUD/templates/display-templates/bulletin-display.tpl',
          'lib/CRUD/templates/display-templates/incident-display.tpl.js'    : 'lib/CRUD/templates/display-templates/incident-display.tpl',

          'lib/CRUD/templates/display-templates/misc/comment-container.tpl.js': 'lib/CRUD/templates/display-templates/misc/comment-container.tpl',
          'lib/CRUD/templates/display-templates/misc/comment.tpl.js'        : 'lib/CRUD/templates/display-templates/misc/comment.tpl',

          'lib/CRUD/templates/display-templates/actors/actor-container.tpl.js': 'lib/CRUD/templates/display-templates/actors/actor-container.tpl',
          'lib/CRUD/templates/display-templates/actors/actor.tpl.js'        : 'lib/CRUD/templates/display-templates/actors/actor.tpl',
          'lib/CRUD/templates/display-templates/actors/expanded-actor-display.tpl.js': 'lib/CRUD/templates/display-templates/actors/expanded-actor-display.tpl',

          'lib/CRUD/templates/display-templates/incident/incident-container.tpl.js': 'lib/CRUD/templates/display-templates/incident/incident-container.tpl',
          'lib/CRUD/templates/display-templates/incident/incident.tpl.js'        : 'lib/CRUD/templates/display-templates/incident/incident.tpl',
          'lib/CRUD/templates/display-templates/incident/expanded-incident-display.tpl.js': 'lib/CRUD/templates/display-templates/incident/expanded-incident-display.tpl',

          'lib/CRUD/templates/display-templates/bulletins/bulletin-container.tpl.js': 'lib/CRUD/templates/display-templates/bulletins/bulletin-container.tpl',
          'lib/CRUD/templates/display-templates/bulletins/bulletin.tpl.js'        : 'lib/CRUD/templates/display-templates/bulletins/bulletin.tpl',
          'lib/CRUD/templates/display-templates/bulletins/expanded-bulletin-display.tpl.js': 'lib/CRUD/templates/display-templates/bulletins/expanded-bulletin-display.tpl',
        }
      }
    },
    // A list of files, which will be syntax-checked by JSHint
    jshint: { 
      files: [
        'lib/*.js',
        'lib/Data/*.js',
        'lib/elements/tests/*.js',
        'lib/elements/*.js',
        'lib/Navigation/*.js',
        'lib/Navigation/tests/TabRouter-test.js',
        'lib/CRUD/views/*.js',
        'lib/CRUD/tests/*.js',
        'lib/SolrSearch/*.js',
        'lib/SolrSearch/data/*.js',
        'lib/SolrSearch/solr/*.js',
        'lib/SolrSearch/tests/*.js',
        'lib/SolrSearch/views/*.js',
        'lib/SolrSearch/views/filters/*.js',
        'lib/SolrSearch/widgets/manager.js'
      ]
    },
    buster: { // test standard script
      dev: {
        options: {
          growl: true
        }
      },
      production: { // tests minified script
        options: {
          growl: true
        }
        //test: {
          //config: 'test/buster.js'
        //}
      }
    },
    // concatenate and minify using the require r.js script
    requirejs: {
      compile: {
        options: {
          baseUrl       : '.',
          name          : 'main',
          mainConfigFile: 'loader.js',
          out           : 'dist/build.js',
        }
      }
    },

    docco: {
      docs: {
        src: [
          'lib/*.js',
          'lib/Data/*.js',
          'lib/elements/tests/*.js',
          'lib/elements/*.js',
          'lib/Navigation/*.js',
          'lib/Navigation/tests/TabRouter-test.js',
          'lib/SolrSearch/*.js',
          'lib/SolrSearch/tests/*.js',
          'lib/SolrSearch/views/*.js',
          'lib/SolrSearch/widgets/manager.js'
        ],
        options: {
          output: 'docs/annotated-source'
        }
      }
    },

    // Tasks being executed with 'grunt watch'
    watch: { 
      files: [
        '<%= jshint.files %>',
        'lib/elements/templates/*.tpl',
        'lib/SolrSearch/templates/*.tpl',
        'lib/CRUD/templates/search-templates/*.tpl',
        'lib/CRUD/templates/display-templates/*.tpl',
        'lib/CRUD/templates/display-templates/*/*.tpl'
      ],
      tasks: ['handlebars',/* 'buster:dev', 'jshint', 'requirejs', 'docco'*/]
    }
  });

  // Load the plugins that provide the tasks we specified in package.json.
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-buster');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-docco2');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // This is the default task being executed if Grunt
  // is called without any further parameter.
  grunt.registerTask(
    'default', 
    [
      'handlebars',
      'jshint',
      'buster',
      'requirejs'
    ]
  );

};
