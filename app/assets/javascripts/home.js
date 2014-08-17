/**
 * Home Scripts
 * @author Lucas <lucas@lucas.ninja>
 */

var app = (function (window, document, undefined) {

  'use strict';

  /*
   * App object
   */
  var app = {};

  /*
   * Init method
   * Initialize other methods
   */
  app.init = function () {
    this.iosViewportBug();
  };

  /*
   * Fix iOS vh unit bug
   * Using viewportUnitsBuggyfill plugin https://github.com/rodneyrehm/viewport-units-buggyfill
   */
  app.iosViewportBug = function () {
    window.viewportUnitsBuggyfill.init();
  };

})(window, document);