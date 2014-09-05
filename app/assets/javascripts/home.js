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
    this.appendVideo();
    this.isVideoLoaded();
    this.userAgent();
    this.onScrollAnimation();
    this.scrollToFixed();
    this.scrollIt();
    this.backToTop();
    this.toggleMenu();
    this.contactSubmit();
    this.refreshForm();
    this.portfolioMobileCardFlip();
    this.iphoneFix();
  };

  /*
   * Append video on home if isn't Mobile
   */
  app.appendVideo = function () {
    var theVideo = '<video class="the-video" autoplay loop poster="black-ink.jpg" width="100%" height="100%"><source src="black-ink.webm"></source><source src="black-ink-min.mp4"></source></video>';
    if (!this.isMobile()) {
      $('.presentation-container__video').append(theVideo);
    };
  };

  /*
   * Detect when the main video is loaded
   */
  app.isVideoLoaded = function () {
    var video = $('.the-video')[0];
    var masterOverlay = $('.master-overlay');

    if (!this.isMobile()) {
      video.addEventListener('loadeddata', function() {
        $(masterOverlay).fadeOut('slow');
        console.log('okkkk');
      }, false);
    }
  };

  /*
   * Detect User Agent
   */
  app.userAgent = function () {
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
  };

  /*
   * Animate some elements on scroll
   * Using: https://github.com/julianlloyd/scrollReveal.js
   */
  app.onScrollAnimation = function () {
    // Add ScrollReveal in Desktop only!
    if (!this.isMobile()) {
      window.scrollReveal = new scrollReveal();
    }
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
    }).on('ajax:success', function () {
      NProgress.done();
      $('.contact-container__title').addClass('is-hidden');
      $('.contact-container__subtitle').addClass('is-hidden');
      $('.contact-form').addClass('is-hidden');
      $('.contact-message__success').removeClass('is-hidden').addClass('is-visible-x');
    }).on('ajax:aborted:required', function () {
    }).on('ajax:error', function (evt, xhr, status, error) {
      alert('Ocorreu um erro no servidor, por favor, recarregue a página e tente novamente.');
    }).on('ajax:complete', function () {
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

  /*
    * Check if is mobile and flip portfolio cards!
   */
  app.portfolioMobileCardFlip = function () {
    if (this.isMobile()) {
      $('.portfolio-card').on('click', function () {
        $(this).toggleClass('portfolio-card__flipped');
      });
    } else {
      $('.portfolio-card').hover(function () {
        $(this).toggleClass('portfolio-card__flipped');
      });
    }
  };

  /*
    * Detect if is mobile
   */
  app.isMobile = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false
    }
  };

  /*
   * When user on iOS devices tap on input,textarea, change the header position
   */
  app.iphoneFix = function () {
    var iphone4 = (window.screen.height == (960 / 2));
    var iphone5 = (window.screen.height == (1136 / 2));

    if (iphone4 || iphone5) {
      $('input, textarea').on('focus', function () {
        $('.main-header').addClass('main-header-iphone');
      });

      $('input, textarea').on('focusout', function () {
        $('.main-header').removeClass('main-header-iphone');
      });
    };
  };

  return app.init();

})(window, document);