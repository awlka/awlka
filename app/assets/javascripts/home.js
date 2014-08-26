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
    this.toggleMenu();
    this.contactSubmit();
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
    $.scrollIt({
      activeClass: 'site-nav__link-active',
      // topOffset: -25
    });
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

  /*
   * Change button menu
   */
  app.toggleButtonMenu = function (x, c, o) {
    var logo = $('.site-logo__img');

    $(x).on('click', function () {
      $(c).toggle();
      $(o).toggle();
      $(logo).toggle();
    });
  };

  /*
   * Toggle Menu
   */
  app.toggleMenu = function () {
    this.toggleButtonMenu('.nav-toggle', '.nav-toggle__button-close', '.nav-toggle__button-open');
    var menu = $('.site-nav');

    $('.nav-toggle').on('click', function () {
      $(menu).slideToggle();
    });
  };

  /*
   * Submit contact form
   */
  app.contactSubmit = function () {
    this.inputMasks();
    var form = $('.contact-form'),
      dataForm = $(form).serialize();

    $(form).on('ajax:success', function () {
      console.log('200');
    }).on('ajax:error', function () {
      console.log('404');
    }).on('ajax:complete', function () {
      console.log('Yo!');
    });

  };

  /*
   * Input mask
   * Using https://github.com/BankFacil/vanilla-masker
   */
  app.inputMasks = function () {
    var phone = new VanillaMasker();
    phone.maskPattern(document.getElementById('contact-phone'), '(99) 999999999');
  };

  return app.init();

})(window, document);