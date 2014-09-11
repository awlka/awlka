/*
 * Scripts to inline - Delta!
 */

var delta = (function (window, document, undefined) {

  'use strict';

  delta = {};

  delta.init = function () {
    this.appendVideo();
  };

  delta.appendVideo = function () {
    var theVideo = document.createElement('video');
    var src1 = document.createElement('source');
    var src2 = document.createElement('source');

    if (theVideo.classList)
      theVideo.classList.add('the-video');
    else
      theVideo.className += ' ' + 'the-video';

    theVideo.setAttribute('preload', 'none');
    theVideo.setAttribute('autoplay', true);
    theVideo.setAttribute('loop', true);
    theVideo.setAttribute('poster', 'black-ink.jpg');
    theVideo.setAttribute('width', '100%');
    theVideo.setAttribute('height', '100%');

    src1.setAttribute('src', 'black-ink.webm');
    src2.setAttribute('src', 'black-ink-min.mp4');
    theVideo.appendChild(src1);
    theVideo.appendChild(src2);
    var containerVideo = document.getElementById('presentation-container');
    if (!this.isMobile()) {
      window.onload = function () {
        containerVideo.appendChild(theVideo);
      }
    };
  };

  delta.isMobile = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false
    }
  };

  return delta.init();

})(window, document);