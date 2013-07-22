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
          'lib/SolrSearch/templates/actor-results.tpl.js'   : 'lib/SolrSearch/templates/actor-results.tpl',
          'lib/SolrSearch/templates/actor.tpl.js'           : 'lib/SolrSearch/templates/actor.tpl',
          'lib/SolrSearch/templates/bulletin-results.tpl.js': 'lib/SolrSearch/templates/bulletin-results.tpl',
          'lib/SolrSearch/templates/bulletin.tpl.js'        : 'lib/SolrSearch/templates/bulletin.tpl',
          'lib/SolrSearch/templates/filters.tpl.js'         : 'lib/SolrSearch/templates/filters.tpl',
          'lib/SolrSearch/templates/single-filter.tpl.js'   : 'lib/SolrSearch/templates/single-filter.tpl',
          'lib/SolrSearch/templates/filter-group.tpl.js'    : 'lib/SolrSearch/templates/filter-group.tpl',
          'lib/SolrSearch/templates/header-count.tpl.js'    : 'lib/SolrSearch/templates/header-count.tpl',
          'lib/SolrSearch/templates/header.tpl.js'          : 'lib/SolrSearch/templates/header.tpl',
          'lib/SolrSearch/templates/incident-results.tpl.js': 'lib/SolrSearch/templates/incident-results.tpl',
          'lib/SolrSearch/templates/incident.tpl.js'        : 'lib/SolrSearch/templates/incident.tpl',
          'lib/SolrSearch/templates/incident-filters.tpl.js': 'lib/SolrSearch/templates/incident-filters.tpl',
          'lib/SolrSearch/templates/actor-filters.tpl.js'   : 'lib/SolrSearch/templates/actor-filters.tpl',
          'lib/SolrSearch/templates/bulletin-filters.tpl.js': 'lib/SolrSearch/templates/bulletin-filters.tpl',
          'lib/SolrSearch/templates/selected-filters.tpl.js': 'lib/SolrSearch/templates/selected-filters.tpl',
          'lib/SolrSearch/templates/date-range.tpl.js'      : 'lib/SolrSearch/templates/date-range.tpl',
          'lib/SolrSearch/templates/map-container.tpl.js'   : 'lib/SolrSearch/templates/map-container.tpl',
          'lib/SolrSearch/templates/selected-filter.tpl.js' : 'lib/SolrSearch/templates/selected-filter.tpl',
          'lib/CRUD/templates/confirm-dialog.tpl.js'        : 'lib/CRUD/templates/confirm-dialog.tpl',
          'lib/CRUD/templates/actor.tpl.js'                 : 'lib/CRUD/templates/actor.tpl',
          'lib/CRUD/templates/incident.tpl.js'              : 'lib/CRUD/templates/incident.tpl',
          'lib/CRUD/templates/bulletin.tpl.js'              : 'lib/CRUD/templates/bulletin.tpl'
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
        'lib/CRUD/templates/*.tpl'
      ],
      tasks: ['handlebars', 'jshint', 'buster:dev', 'requirejs', 'docco']
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
