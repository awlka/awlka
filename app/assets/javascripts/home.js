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
    // this.fixHeaderScroll();
    this.onScrollAnimation();
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
        wwdContainer = $('.wwd'),
        scroll = $(window).scrollTop();

      if (scroll >= stickyOffset) {
        sticky.addClass('main-header__fixed');
        wwdContainer.addClass('wwd-container__fixed');
      } else {
        sticky.removeClass('main-header__fixed');
        wwdContainer.removeClass('wwd-container__fixed');
      }
    });
  };

  app.onScrollAnimation = function () {
    window.scrollReveal = new scrollReveal({reset: true});
  };

  return app.init();

})(window, document);