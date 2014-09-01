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
    this.refreshForm();
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
    window.scrollReveal = new scrollReveal();
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
    var form = $('.contact-form'),
      dataForm = $(form).serialize();

    var name = $('#contact-name');
    var email = $('#contact-email');
    var msg = $('#contact-message');

    this.inputMasks();
    this.validateForm(form);

    $(form).on('ajax:beforeSend', function () {
      if (!$(name).val() || !$(email).val() || !$(msg).val()) {
        return false;
      } else {
        NProgress.start();
      }
      console.log('Let\'s do it ');
    }).on('ajax:success', function () {
      NProgress.done();
      $('.contact-container__title').addClass('is-hidden');
      $('.contact-container__subtitle').addClass('is-hidden');
      $('.contact-form').addClass('is-hidden');
      $('.contact-message__success').removeClass('is-hidden').addClass('is-visible-x');
      console.log('200');
    }).on('ajax:aborted:required', function () {
      console.log('Empty!');
    }).on('ajax:error', function (evt, xhr, status, error) {
      console.log('Error!');
    }).on('ajax:complete', function () {
      console.log('Yo!');
    });

  };

  /*
   * Input mask
   * Using: https://github.com/BankFacil/vanilla-masker
   */
  app.inputMasks = function () {
    var phone = new VanillaMasker();
    phone.maskPattern(document.getElementById('contact-phone'), '(99) 999999999');
  };

  /*
   * Validate contact form
   * Using: https://github.com/jzaefferer/jquery-validation
   */
  app.validateForm = function (form) {
    form.validate({
      errorLabelContainer: $('.contact-message__errors'),
      rules: {
        'contact[name]': {
          required: true
        },
        'contact[email]': {
          required: true,
          email: true
        },
        'contact[message]': {
          required: true
        }
      },
      messages: {
        'contact[name]': {
          required: '* Digite o seu nome.'
        },
        'contact[email]': {
          required: '* Digite o seu endereço de e-mail.',
          email: '* Digite um e-mail válido.'
        },
        'contact[message]': {
          required: '* Digite a sua mensagem.'
        }
      },
      success: function (element) {
        element.text('');
      }
    });
  };

  /*
   * Allow to refresh the form after send
   * TODO: Improve this
   */
  app.refreshForm = function () {
    var form = $('.contact-form');
    var successContent = $('.contact-message__success');
    var refreshMe = $('.contact-message__back');
    var name = $('#contact-name');
    var email = $('#contact-email');
    var phone = $('#contact-phone');
    var msg = $('#contact-message');

    $(refreshMe).on('click', function () {
      successContent.removeClass('is-visible-x').addClass('is-hidden');
      form.removeClass('is-hidden');
      $('.contact-container__title').removeClass('is-hidden');
      $('.contact-container__subtitle').removeClass('is-hidden');
      $(name).val('');
      $(email).val('');
      $(phone).val('');
      $(msg).val('');
    });
  };

  return app.init();

})(window, document);