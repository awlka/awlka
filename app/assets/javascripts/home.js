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
    this.onScrollAnimation();
    this.scrollToFixed();
    this.scrollIt();
    this.backToTop();
  };

  /*
   * Fix iOS vh unit bug
   * Using: viewportUnitsBuggyfill plugin https://github.com/rodneyrehm/viewport-units-buggyfill
   */
  app.iosViewportBug = function () {
    window.viewportUnitsBuggyfill.init();
  };

  /*
   * Animate some elements on scroll
   * Using: https://github.com/julianlloyd/scrollReveal.js
   */
  app.onScrollAnimation = function () {
    window.scrollReveal = new scrollReveal({reset:true});
  };

  /*
   * Fix header on scroll
   * Using: https://github.com/bigspotteddog/ScrollToFixed
   */
  app.scrollToFixed = function () {
    $('.main-header').scrollToFixed();
  };

  /*
   * Scroll to section
   * Using: https://github.com/cmpolis/scrollIt.js
   */
  app.scrollIt = function () {
    $.scrollIt();
  };

  /*
   * Back to top
   */
  app.backToTop = function () {
    $('.main-header__logo').on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
    });
  };

  return app.init();

})(window, document);