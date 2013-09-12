var config = exports; // Vanity

config["Corroborator Browser tests"] = {
    environment: "browser",
    autoRun: false,
    rootPath: "../",
    libs: [
      "components/requirejs/require.js",
      "testconfig.js",
      "components/handlebars/*.js",
      "components/jquery/jquery.js",
      "components/jquery.ui/dist/jquery-ui.js",
      "components/leaflet/dist/leaflet-src.js",
      "components/underscore/underscore.js",
      "components/backbone/backbone.js",
      "components/moment/moment.js",
      "components/jquery-timepicker-addon/jquery-ui-sliderAccess.js",
      "components/jquery-timepicker-addon/jquery-ui-timepicker-addon.js",
      "components/jquery-form/jquery.form.js",
      "components/flowplayer/dist/flowplayer.js"
    ],
    sources: [
      "test/fixtures/*.js",
      "lib/elements/*.js",
      "lib/elements/helpers/*.js",
      "lib/elements/templates/*.js",
      "lib/elements/views/*.js",

      "lib/Navigation/*.js",

      "lib/CRUD/views/*/*/*.js",
      "lib/CRUD/views/*/*.js",
      "lib/CRUD/views/*.js",

      "lib/CRUD/templates/*.js",
      "lib/CRUD/templates/*/*.js",
      "lib/CRUD/templates/*/*/*.js",
      

      "lib/CRUD/data/*.js",
      "lib/SolrSearch/*.js",
      "lib/SolrSearch/data/*.js",
      "lib/SolrSearch/solr/*.js",
      "lib/SolrSearch/views/*.js",
      "lib/SolrSearch/views/filters/*.js",
      "lib/SolrSearch/templates/*.js",
      "lib/*.js",
      "lib/Data/*.js",
     ],
    tests: [
      "lib/SolrSearch/tests/*-test.js",
      //"lib/CRUD/tests/*-test.js",
      //"lib/Navigation/tests/*-test.js",
      //"lib/elements/tests/*-test.js"
    ],
    "resources": [{
      "path": "/",
      "file": "test/fixtures/base.html",
      "headers": {
        "Content-Type": "text/html"
      }
    }],
    extensions: [require("buster-amd")],
    "buster-amd": {
        pathMapper: function (path) {
          return path.
                 // remove extension
                 replace(/\.js$/, "").
                 replace(/\.tpl$/, "").
                 // replace leading slash with previous directory for test files
                 replace(/^\//, "../");
        }
    }
};
