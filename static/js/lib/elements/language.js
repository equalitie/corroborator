/**
 * Author: Cormac McGuire
 * language.js
 * Provide functionality to toggle language
 */
define(
  [
    'jquery'
  ],
  function($) {
    var languages = ['en', 'ar'];

    var toggleLanguage = function(clickedElement, i18nElement) {
      var requestedLang = clickedElement.lang,
          remainingLanguages = _.reject(languages, function(lang) {
            return lang === requestedLang;
          }),
          langSelector = _.reduce(remainingLanguages, function(memo, lang) {
            return memo + 'span:lang(' + lang + ')';
          }, '');

        /**
         * the .toggle show is kind of gross but there seems to be a bug
         * whereby the span:lang(<lang>) seems to select the .toggle selector too
         */
         i18nElement.children('span:lang(' + requestedLang + ')')
                    .show()
                    .siblings(langSelector)
                    .hide()
                    .siblings('.toggle').show();
    };

    return {
      toggleLanguage: toggleLanguage
    };

});
