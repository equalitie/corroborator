var config = exports; // Vanity

config["Corroborator Browser tests"] = {
    environment: "browser",
    rootPath: "../",
    libs: [
      "components/requirejs/require.js",
      "testconfig.js"
    ],
    sources: [
      "lib/elements/*.js",
      "lib/elements/templates/*.js",
      "lib/Navigation/*.js",
      "lib/SolrSearch/*.js",
      "lib/*.js",
      "components/bacon-ui/Bacon.UI.js"
     ],
    tests: [
      "lib/SolrSearch/tests/*-test.js",
      "lib/Navigation/tests/*-test.js",
      "lib/elements/tests/*-test.js"
    ],
    extensions: [require('buster-amd')],
    "buster-amd": {
        pathMapper: function (path) {
          return path.
                 // remove extension
                 replace(/\.js$/, "").
                 // replace leading slash with previous directory for test files
                 replace(/^\//, "../");
        }
    }
};
