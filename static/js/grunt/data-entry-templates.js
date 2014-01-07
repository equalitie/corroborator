module.exports = function() {
  var rootDir = 'lib/data-entry/templates/',
      templates = {};

  templates[rootDir + 'bulletin-form.tpl.js'] =
    rootDir + 'bulletin-form.tpl';
  templates[rootDir + 'actor-form.tpl.js'] =
    rootDir + 'actor-form.tpl';
    

  return templates;
};
