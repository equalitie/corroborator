// duster.js  
// Watch directory of dust.js templates and automatically compile them
// by Dan McGrady http://dmix.ca

var input_path = "lib/elements/templates"; // directory of dust templates are stored with .dust file extension
var output_path = "lib/elements/templates"; // directory where the compiled .js files should be saved to

var fs = require('fs');
var watch = require('watch');
var handlebarsAmd = require('handlebars-amd');

function compile_templates(path, curr, prev) {
  console.log('compile: ' + path);
  handlebarsAmd.compile(input_path, input_path+'/compiled'
  ).then(function(compiled) {
    console.log(compiled);
  });
}

watch.createMonitor(input_path, function (monitor) {
  console.log("Watching " + input_path);
  monitor.files['*.tpl', '*/*'];
  monitor.on("created", compile_templates);
  monitor.on("changed", compile_templates);
})
