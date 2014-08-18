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
    this.fixHeaderScroll();
  };

  /*
   * Fix iOS vh unit bug
   * Using viewportUnitsBuggyfill plugin https://github.com/rodneyrehm/viewport-units-buggyfill
   */
  app.iosViewportBug = function () {
    window.viewportUnitsBuggyfill.init();
  };

  /*
   * Fix header on top when scroll
   */
  app.fixHeaderScroll = function () {
    var stickyOffset = $('.main-header').offset().top;

    $(window).scroll(function () {
      var sticky = $('.main-header'),
        scroll = $(window).scrollTop();

      if (scroll >= stickyOffset)
        sticky.addClass('main-header__fixed');
      else
        sticky.removeClass('main-header__fixed');
    });
  };

  return app.init();

})(window, document);