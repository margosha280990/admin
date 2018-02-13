/**
 * Global variables
 */
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
  initialDate = new Date(),

  $document = $(document),
  $window = $(window),
  $html = $("html"),

  isDesktop = $html.hasClass("desktop"),
  isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTouch = "ontouchstart" in window,

  plugins = {
    pointerEvents: isIE < 11 ? "/wp-content/themes/twentysixteen/js/pointer-events.min.js" : false,
    bootstrapTooltip: $("[data-toggle='tooltip']"),
    bootstrapTabs: $(".tabs"),
    bootstrapAccordions: $(".accordion"),
    rdParallax: $(".rd-parallax"),
    rdGoogleMaps: $(".rd-google-map"),
    rdNavbar: $(".rd-navbar"),
    mfp: $('[data-lightbox]').not('[data-lightbox="gallery"] [data-lightbox]'),
    mfpGallery: $('[data-lightbox^="gallery"]'),
    owl: $(".owl-carousel"),
    swiper: $(".swiper-slider"),
    counter: $(".counter"),
    twitterfeed: $(".twitter"),
    progressBar: $(".progress-bar-js"),
    isotope: $(".isotope"),
    countDown: $(".countdown"),
    popover: $('[data-toggle="popover"]'),
    dateCountdown: $('.DateCountdown'),
    statefulButton: $('.btn-stateful'),
    slick: $('.slick-slider'),
    viewAnimate: $('.view-animate'),
    selectFilter: $("select"),
    rdInputLabel: $(".form-label"),
    bootstrapDateTimePicker: $("[data-time-picker]"),
    customWaypoints: $('[data-custom-scroll-to]'),
    photoSwipeGallery: $("[data-photo-swipe-item]"),
    stepper: $("input[type='number']"),
    radio: $("input[type='radio']"),
    checkbox: $("input[type='checkbox']"),
    customToggle: $("[data-custom-toggle]"),
    rdMailForm: $(".rd-mailform"),
    regula: $("[data-constraints]"),
    pageLoader: $(".page-loader"),
    search: $(".rd-search"),
    searchResults: $('.rd-search-results'),
    imgZoom: $('[mag-thumb]'),
    pageTitles: $('.page-title')
  };

/**
 * Initialize All Scripts
 */
$document.ready(function () {
  var isNoviBuilder = window.xMode;

  /**
   * Adjustments for Safari on Mac
   */
  (function($){
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      $('html').addClass('mac'); // provide a class for the safari-mac specific css to filter with
    }
  })(jQuery);

  /**
   * getSwiperHeight
   * @description  calculate the height of swiper slider basing on data attr
   */
  function getSwiperHeight(object, attr) {
    var val = object.attr("data-" + attr),
      dim;

    if (!val) {
      return undefined;
    }

    dim = val.match(/(px)|(%)|(vh)$/i);

    if (dim.length) {
      switch (dim[0]) {
        case "px":
          return parseFloat(val);
        case "vh":
          return $(window).height() * (parseFloat(val) / 100);
        case "%":
          return object.width() * (parseFloat(val) / 100);
      }
    } else {
      return undefined;
    }
  }

  /**
   * toggleSwiperInnerVideos
   * @description  toggle swiper videos on active slides
   */
  function toggleSwiperInnerVideos(swiper) {
    var prevSlide = $(swiper.slides[swiper.previousIndex]),
      nextSlide = $(swiper.slides[swiper.activeIndex]),
      videos;

    prevSlide.find("video").each(function () {
      this.pause();
    });

    videos = nextSlide.find("video");
    if (videos.length) {
      videos.get(0).play();
    }
  }

  /**
   * toggleSwiperCaptionAnimation
   * @description  toggle swiper animations on active slides
   */
  function toggleSwiperCaptionAnimation(swiper) {
    var prevSlide = $(swiper.container),
      nextSlide = $(swiper.slides[swiper.activeIndex]);

    prevSlide
      .find("[data-caption-animate]")
      .each(function () {
        var $this = $(this);
        $this
          .removeClass("animated")
          .removeClass($this.attr("data-caption-animate"))
          .addClass("not-animated");
      });


    nextSlide
      .find("[data-caption-animate]")
      .each(function () {
        var $this = $(this),
          delay = $this.attr("data-caption-delay");

        if (!isNoviBuilder) {
          setTimeout(function () {
            $this
              .removeClass("not-animated")
              .addClass($this.attr("data-caption-animate"))
              .addClass("animated");
          }, delay ? parseInt(delay) : 0);
        }else{
          $this
            .removeClass("not-animated")
        }
      });
  }

  /**
   * makeParallax
   * @description  create swiper parallax scrolling effect
   */
  function makeParallax(el, speed, wrapper, prevScroll) {
    var scrollY = window.scrollY || window.pageYOffset;

    if (prevScroll != scrollY) {
      prevScroll = scrollY;
      el.addClass('no-transition');
      el[0].style['transform'] = 'translate3d(0,' + -scrollY * (1 - speed) + 'px,0)';
      el.height();
      el.removeClass('no-transition');

      if (el.attr('data-fade') === 'true') {
        var bound = el[0].getBoundingClientRect(),
          offsetTop = bound.top * 2 + scrollY,
          sceneHeight = wrapper.outerHeight(),
          sceneDevider = wrapper.offset().top + sceneHeight / 2.0,
          layerDevider = offsetTop + el.outerHeight() / 2.0,
          pos = sceneHeight / 6.0,
          opacity;
        if (sceneDevider + pos > layerDevider && sceneDevider - pos < layerDevider) {
          el[0].style["opacity"] = 1;
        } else {
          if (sceneDevider - pos < layerDevider) {
            opacity = 1 + ((sceneDevider + pos - layerDevider) / sceneHeight / 3.0 * 5);
          } else {
            opacity = 1 - ((sceneDevider - pos - layerDevider) / sceneHeight / 3.0 * 5);
          }
          el[0].style["opacity"] = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity.toFixed(2);
        }
      }
    }

    requestAnimationFrame(function () {
      makeParallax(el, speed, wrapper, prevScroll);
    });
  }

  /**
   * isScrolledIntoView
   * @description  check the element whas been scrolled into the view
   */
  function isScrolledIntoView(elem) {
    var $window = $(window);
    return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
  }

  /**
   * initOnView
   * @description  calls a function when element has been scrolled into the view
   */
  function lazyInit(element, func) {
    var $win = jQuery(window);
    $win.on('load scroll', function () {
      if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
        func.call();
        element.addClass('lazy-loaded');
      }
    });
  }

  /**
   * Live Search
   * @description  create live search results
   */
  function liveSearch(options){
    $('#' + options.live).removeClass('cleared').html();
    options.current++;
    options.spin.addClass('loading');
    $.get(handler, {
      s: decodeURI(options.term),
      liveSearch: options.live,
      dataType: "html",
      liveCount: options.liveCount,
      filter: options.filter,
      template: options.template
    }, function (data) {
      options.processed++;
      var live = $('#' + options.live);
      if (options.processed == options.current && !live.hasClass('cleared')){
        live.find('> #search-results').removeClass('active');
        live.html(data);
        setTimeout(function () {
          live.find('> #search-results').addClass('active');
        }, 50);
      }
      options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
    })
  }

  /**
   * attachFormValidator
   * @description  attach form validation to elements
   */
  function attachFormValidator(elements) {
    for (var i = 0; i < elements.length; i++) {
      var o = $(elements[i]), v;
      o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
      v = o.parent().find(".form-validation");
      if (v.is(":last-child")) {
        o.addClass("form-control-last-child");
      }
    }

    elements
      .on('input change propertychange blur', function (e) {
        var $this = $(this), results;

        if (e.type != "blur") {
          if (!$this.parent().hasClass("has-error")) {
            return;
          }
        }

        if ($this.parents('.rd-mailform').hasClass('success')) {
          return;
        }

        if ((results = $this.regula('validate')).length) {
          for (i = 0; i < results.length; i++) {
            $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
          }
        } else {
          $this.siblings(".form-validation").text("").parent().removeClass("has-error")
        }
      })
      .regula('bind');
  }

  /**
   * isValidated
   * @description  check if all elemnts pass validation
   */
  function isValidated(elements) {
    var results, errors = 0;
    if (elements.length) {
      for (j = 0; j < elements.length; j++) {

        var $input = $(elements[j]);

        if ((results = $input.regula('validate')).length) {
          for (k = 0; k < results.length; k++) {
            errors++;
            $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
          }
        } else {
          $input.siblings(".form-validation").text("").parent().removeClass("has-error")
        }
      }

      return errors == 0;
    }
    return true;
  }

  /**
   * Init Bootstrap tooltip
   * @description  calls a function when need to init bootstrap tooltips
   */
  function initBootstrapTooltip(tooltipPlacement) {
    if (window.innerWidth < 599) {
      plugins.bootstrapTooltip.tooltip('destroy');
      plugins.bootstrapTooltip.tooltip({
        placement: 'bottom'
      });
    } else {
      plugins.bootstrapTooltip.tooltip('destroy');
      plugins.bootstrapTooltip.tooltipPlacement;
      plugins.bootstrapTooltip.tooltip();
    }
  }

  /**
   * ChangeExternalButtons
   * @description Change active tab in responsive active tab by external buttons (next tab, prev tab)
   */
  function changeExternalButtons(respTabItem, direction) {
    var prev,
      next,
      activeItem;

    respTabItem.find('.resp-tabs-extertal-list li').removeClass('active');

    activeItem = respTabItem.find('.resp-tab-item.resp-tab-active');

    next = activeItem.next();
    if (!next.length) {
      next = respTabItem.find('.resp-tab-item:first-child()');
    }

    prev = activeItem.prev();
    if (!prev.length) {
      prev = respTabItem.find('.resp-tab-item:last-child()');
    }

    if (direction) {
      if (direction === 'next') {
        next.trigger('click');
      } else {
        prev.trigger('click');
      }

      setTimeout(function () {
        changeExternalButtons(respTabItem);
      }, 10);
    }

    respTabItem.find('.resp-tab-external-prev li:nth-child(' + (prev.index() + 1) + ')').addClass('active');
    respTabItem.find('.resp-tab-external-next li:nth-child(' + (next.index() + 1) + ')').addClass('active');
  }

  /**
   * Copyright Year
   * @description  Evaluates correct copyright year
   */
  var o = $("#copyright-year");
  if (o.length) {
    o.text(initialDate.getFullYear());
  }

  /**
   * IE Polyfills
   * @description  Adds some loosing functionality to IE browsers
   */
  if (isIE) {
    if (isIE < 10) {
      $html.addClass("lt-ie-10");
    }

    if (isIE < 11) {
      if (plugins.pointerEvents) {
        $.getScript(plugins.pointerEvents)
          .done(function () {
            $html.addClass("ie-10");
            PointerEventsPolyfill.initialize({});
          });
      }
    }

    if (isIE === 11) {
      $("html").addClass("ie-11");
    }

    if (isIE === 12) {
      $("html").addClass("ie-edge");
    }
  }

  /**
   * Bootstrap Tooltips
   * @description Activate Bootstrap Tooltips
   */
  if (plugins.bootstrapTooltip.length) {
    var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
    initBootstrapTooltip(tooltipPlacement);
    $(window).on('resize orientationchange', function () {
      initBootstrapTooltip(tooltipPlacement);
    })
  }

  /**
   * @module       Magnific Popup
   * @author       Dmitry Semenov
   * @see          http://dimsemenov.com/plugins/magnific-popup/
   * @version      v1.0.0
   */
  if (plugins.mfp.length > 0 || plugins.mfpGallery.length > 0 && isNoviBuilder != "designMode") {
    if (plugins.mfp.length) {
      for (i = 0; i < plugins.mfp.length; i++) {
        var mfpItem = plugins.mfp[i];

        $(mfpItem).magnificPopup({
          type: mfpItem.getAttribute("data-lightbox")
        });
      }
    }
    if (plugins.mfpGallery.length) {
      for (i = 0; i < plugins.mfpGallery.length; i++) {
        var mfpGalleryItem = $(plugins.mfpGallery[i]).find('[data-lightbox]');

        for (var c = 0; c < mfpGalleryItem.length; c++) {
          $(mfpGalleryItem).addClass("mfp-" + $(mfpGalleryItem).attr("data-lightbox"));
        }

        mfpGalleryItem.end()
          .magnificPopup({
            delegate: '[data-lightbox]',
            type: "image",
            gallery: {
              enabled: true
            }
          });
      }
    }
  }

  /**
   * RD Google Maps
   * @description Enables RD Google Maps plugin
   */
  if (plugins.rdGoogleMaps.length) {
    var i;

    $.getScript("//maps.google.com/maps/api/js?key=AIzaSyAFeB0kVA6ouyJ_gEvFbMaefLy3cBCyRwo&sensor=false&libraries=geometry,places&v=3.7", function() {
      var head = document.getElementsByTagName('head')[0],
        insertBefore = head.insertBefore;

      head.insertBefore = function(newElement, referenceElement) {
        if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') != -1 || newElement.innerHTML.indexOf('gm-style') != -1) {
          return;
        }
        insertBefore.call(head, newElement, referenceElement);
      };

      function initGoogleMap(){
        var $this = $(this),
          styles = $this.attr("data-styles");

        $this.googleMap({
          styles: styles ? JSON.parse(styles) : [],
          onInit: function(map) {
            var inputAddress = $('#rd-google-map-address');

            if (inputAddress.length) {
              var input = inputAddress;
              var geocoder = new google.maps.Geocoder();
              var marker = new google.maps.Marker({
                map: map,
                icon: "http://adaly.ru/wp-content/themes/twentysixteen/images/gmap_marker.png",
              });
              var autocomplete = new google.maps.places.Autocomplete(inputAddress[0]);
              autocomplete.bindTo('bounds', map);
              inputAddress.attr('placeholder', '');
              inputAddress.on('change', function() {
                $("#rd-google-map-address-submit").trigger('click');
              });
              inputAddress.on('keydown', function(e) {
                if (e.keyCode == 13) {
                  $("#rd-google-map-address-submit").trigger('click');
                }
              });


              $("#rd-google-map-address-submit").on('click', function(e) {
                e.preventDefault();
                var address = input.val();
                geocoder.geocode({
                  'address': address
                }, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    map.setCenter(new google.maps.LatLng(
                      parseFloat(latitude),
                      parseFloat(longitude)
                    ));
                    marker.setPosition(new google.maps.LatLng(
                      parseFloat(latitude),
                      parseFloat(longitude)
                    ))
                  }
                });
              });
            }
          }
        });
      }

      for (i = 0; i < plugins.rdGoogleMaps.length; i++) {
        if (isNoviBuilder !== "designMode") {
          lazyInit($(plugins.rdGoogleMaps[i]), initGoogleMap.bind(plugins.rdGoogleMaps[i]));
        } else {
          initGoogleMap.bind(plugins.rdGoogleMaps[i])();
        }
      }
    });
  }

  /**
   * Bootstrap Date time picker
   */
  if (plugins.bootstrapDateTimePicker.length) {
    var i;
    for (i = 0; i < plugins.bootstrapDateTimePicker.length; i++) {
      var $dateTimePicker = $(plugins.bootstrapDateTimePicker[i]);
      var options = {};

      options['format'] = 'dddd DD MMMM YYYY - HH:mm';
      if ($dateTimePicker.attr("data-time-picker") == "date") {
        options['format'] = 'dddd DD MMMM YYYY';
        options['minDate'] = new Date();
      } else if ($dateTimePicker.attr("data-time-picker") == "time") {
        options['format'] = 'HH:mm';
      }

      options["time"] = ($dateTimePicker.attr("data-time-picker") != "date");
      options["date"] = ($dateTimePicker.attr("data-time-picker") != "time");
      options["shortTime"] = true;

      $dateTimePicker.bootstrapMaterialDatePicker(options);
    }
  }

  /**
   * RD Twitter Feed
   * @description Enables RD Twitter Feed plugin
   */
  if (plugins.twitterfeed.length > 0) {
    var i;
    for (i = 0; i < plugins.twitterfeed.length; i++) {
      var twitterfeedItem = plugins.twitterfeed[i];
      $(twitterfeedItem).RDTwitter({});
    }
  }

  /**
   * Select2
   * @description Enables select2 plugin
   */
  if (plugins.selectFilter.length) {
    var i;
    for (i = 0; i < plugins.selectFilter.length; i++) {
      var select = $(plugins.selectFilter[i]);

      select.select2({
        theme: select.attr('data-custom-theme') ? select.attr('data-custom-theme') : "bootstrap"
      }).next().addClass(select.attr("class").match(/(input-sm)|(input-lg)|($)/i).toString().replace(new RegExp(",", 'g'), " "));
    }
  }

  /**
   * Stepper
   * @description Enables Stepper Plugin
   */
  if (plugins.stepper.length) {
    plugins.stepper.stepper({
      labels: {
        up: "",
        down: ""
      }
    });
  }

  /**
   * Radio
   * @description Add custom styling options for input[type="radio"]
   */
  if (plugins.radio.length) {
    var i;
    for (i = 0; i < plugins.radio.length; i++) {
      var $this = $(plugins.radio[i]);
      $this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
    }
  }

  /**
   * Checkbox
   * @description Add custom styling options for input[type="checkbox"]
   */
  if (plugins.checkbox.length) {
    var i;
    for (i = 0; i < plugins.checkbox.length; i++) {
      var $this = $(plugins.checkbox[i]);
      $this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
    }
  }

  /**
   * Popovers
   * @description Enables Popovers plugin
   */
  if (plugins.popover.length) {
    if (window.innerWidth < 767) {
      plugins.popover.attr('data-placement', 'bottom');
      plugins.popover.popover();
    }
    else {
      plugins.popover.popover();
    }
  }

  /**
   * jQuery Countdown
   * @description  Enable countdown plugin
   */
  if (plugins.countDown.length) {
    var i;
    for (i = 0; i < plugins.countDown.length; i++) {
      var countDownItem = plugins.countDown[i],
        d = new Date(),
        type = countDownItem.getAttribute('data-type'),
        time = countDownItem.getAttribute('data-time'),
        format = countDownItem.getAttribute('data-format'),
        settings = [];

      d.setTime(Date.parse(time)).toLocaleString();
      settings[type] = d;
      settings['format'] = format;
      $(countDownItem).countdown(settings);
    }
  }

  /**
   * TimeCircles
   * @description  Enable TimeCircles plugin
   */
  if (plugins.dateCountdown.length) {
    var i;
    for (i = 0; i < plugins.dateCountdown.length; i++) {
      var dateCountdownItem = $(plugins.dateCountdown[i]),
        time = {
          "Days": {
            "text": "Days",
            "show": true,
            color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
          },
          "Hours": {
            "text": "Hours",
            "show": true,
            color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
          },
          "Minutes": {
            "text": "Minutes",
            "show": true,
            color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
          },
          "Seconds": {
            "text": "Seconds",
            "show": true,
            color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
          }
        };

      dateCountdownItem.TimeCircles({
        color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "rgba(247, 247, 247, 1)",
        animation: "smooth",
        bg_width: dateCountdownItem.attr("data-bg-width") ? dateCountdownItem.attr("data-bg-width") : 0.9,
        circle_bg_color: dateCountdownItem.attr("data-bg") ? dateCountdownItem.attr("data-bg") : "rgba(0, 0, 0, 1)",
        fg_width: dateCountdownItem.attr("data-width") ? dateCountdownItem.attr("data-width") : 0.03
      });

      $(window).on('load resize orientationchange', function () {
        if (window.innerWidth < 479) {
          dateCountdownItem.TimeCircles({
            time: {
              "Days": {
                "text": "Days",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              "Hours": {
                "text": "Hours",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              "Minutes": {
                "text": "Minutes",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              Seconds: {
                "text": "Seconds",
                show: false,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              }
            }
          }).rebuild();
        } else if (window.innerWidth < 767) {
          dateCountdownItem.TimeCircles({
            time: {
              "Days": {
                "text": "Days",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              "Hours": {
                "text": "Hours",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              "Minutes": {
                "text": "Minutes",
                "show": true,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              },
              Seconds: {
                text: '',
                show: false,
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
              }
            }
          }).rebuild();
        } else {
          dateCountdownItem.TimeCircles({time: time}).rebuild();
        }
      });
    }
  }

  /**
   * Bootstrap Buttons
   * @description  Enable Bootstrap Buttons plugin
   */
  if (plugins.statefulButton.length) {
    $(plugins.statefulButton).on('click', function () {
      var statefulButtonLoading = $(this).button('loading');

      setTimeout(function () {
        statefulButtonLoading.button('reset')
      }, 2000);
    })
  }

  /**
   * Progress bar
   * @description  Enable progress bar
   */
  if (plugins.progressBar.length) {
    var i,
      bar,
      type;

    for (i = 0; i < plugins.progressBar.length; i++) {
      var progressItem = plugins.progressBar[i];
      bar = null;

      if (progressItem.className.indexOf("progress-bar-horizontal") > -1) {
        type = 'Line';
      }

      if (progressItem.className.indexOf("progress-bar-radial") > -1) {
        type = 'Circle';
      }

      if (progressItem.getAttribute("data-stroke") && progressItem.getAttribute("data-value") && type) {
        bar = new ProgressBar[type](progressItem, {
          strokeWidth: Math.round(parseFloat(progressItem.getAttribute("data-stroke")) / progressItem.offsetWidth * 100),
          trailWidth: progressItem.getAttribute("data-trail") ? Math.round(parseFloat(progressItem.getAttribute("data-trail")) / progressItem.offsetWidth * 100) : 0,
          text: {
            value: progressItem.getAttribute("data-counter") === "true" ? '0' : null,
            className: 'progress-bar__body',
            style: null
          }
        });
        bar.svg.setAttribute('preserveAspectRatio', "none meet");
        if (type === 'Line') {
          bar.svg.setAttributeNS(null, "height", progressItem.getAttribute("data-stroke"));
        }

        bar.path.removeAttribute("stroke");
        bar.path.className.baseVal = "progress-bar__stroke";
        if (bar.trail) {
          bar.trail.removeAttribute("stroke");
          bar.trail.className.baseVal = "progress-bar__trail";
        }

        if (progressItem.getAttribute("data-easing") && !isIE) {
          $(document)
            .on("scroll", {"barItem": bar}, $.proxy(function (event) {
              var bar = event.data.barItem;
              var $this = $(this);

              if (isScrolledIntoView($this) && this.className.indexOf("progress-bar--animated") === -1) {
                this.className += " progress-bar--animated";
                bar.animate(parseInt($this.attr("data-value")) / 100.0, {
                  easing: $this.attr("data-easing"),
                  duration: $this.attr("data-duration") ? parseInt($this.attr("data-duration")) : 800,
                  step: function (state, b) {
                    if (b._container.className.indexOf("progress-bar-horizontal") > -1 ||
                      b._container.className.indexOf("progress-bar-vertical") > -1) {
                      b.text.style.width = Math.abs(b.value() * 100).toFixed(0) + "%"
                    }
                    b.setText(Math.abs(b.value() * 100).toFixed(0));
                  }
                });
              }
            }, progressItem))
            .trigger("scroll");
        } else {
          bar.set(parseInt($(progressItem).attr("data-value")) / 100.0);
          bar.setText($(progressItem).attr("data-value"));
          if (type === 'Line') {
            bar.text.style.width = parseInt($(progressItem).attr("data-value")) + "%";
          }
        }
      } else {
        console.error(progressItem.className + ": progress bar type is not defined");
      }
    }
  }

  /**
   * UI To Top
   * @description Enables ToTop Button
   */
  if (isDesktop && !isNoviBuilder) {
    $().UItoTop({
      easingType: 'easeOutQuart',
      containerClass: 'ui-to-top fa fa-angle-up'
    });
  }

  /**
   * RD Navbar
   * @description Enables RD Navbar plugin
   */
  if (plugins.rdNavbar.length) {
    plugins.rdNavbar.RDNavbar({
      stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone")  && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
      responsive: {
        0: {
          stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up") === 'true' : false
        },
        768: {
          stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-sm-stick-up") === 'true' : false
        },
        992: {
          stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-md-stick-up") === 'true' : false
        },
        1200: {
          stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-lg-stick-up") === 'true' : false
        }
      }
    });
    if (plugins.rdNavbar.attr("data-body-class")) {
      document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
    }
  }

  /**
   * ViewPort Universal
   * @description Add class in viewport
   */
  if (plugins.viewAnimate.length) {
    var i;
    for (i = 0; i < plugins.viewAnimate.length; i++) {
      var $view = $(plugins.viewAnimate[i]).not('.active');
      $document.on("scroll", $.proxy(function () {
        if (isScrolledIntoView(this)) {
          this.addClass("active");
        }
      }, $view))
        .trigger("scroll");
    }
  }


  /**
   * Swiper 3.1.7
   * @description  Enable Swiper Slider
   */
  if (plugins.swiper.length) {
    var i;
    for (i = 0; i < plugins.swiper.length; i++) {
      var s = $(plugins.swiper[i]);
      var pag = s.find(".swiper-pagination"),
        next = s.find(".swiper-button-next"),
        prev = s.find(".swiper-button-prev"),
        bar = s.find(".swiper-scrollbar"),
        parallax = s.parents('.rd-parallax').length,
        swiperSlide = s.find(".swiper-slide");

      for (j = 0; j < swiperSlide.length; j++) {
        var $this = $(swiperSlide[j]),
          url;

        if (url = $this.attr("data-slide-bg")) {
          $this.css({
            "background-image": "url(" + url + ")",
            "background-size": "cover"
          })
        }
      }

      swiperSlide.end()
        .find("[data-caption-animate]")
        .addClass("not-animated")
        .end()
        .swiper({
          autoplay: s.attr('data-autoplay') !== "false" && !isNoviBuilder ? s.attr('data-autoplay')  : null,
          direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
          effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
          speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
          keyboardControl: s.attr('data-keyboard') === "true",
          mousewheelControl: s.attr('data-mousewheel') === "true",
          mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
          nextButton: next.length ? next.get(0) : null,
          prevButton: prev.length ? prev.get(0) : null,
          pagination: pag.length ? pag.get(0) : null,
          paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
          paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          } : null : null,
          scrollbar: bar.length ? bar.get(0) : null,
          scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
          scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
          loop: s.attr("data-loop") && !isNoviBuilder ? s.attr('data-loop') !== "false" : false,
          simulateTouch: s.attr('data-simulate-touch') && !isNoviBuilder ? s.attr('data-simulate-touch') === "true" : false,
          onTransitionStart: function (swiper) {
            toggleSwiperInnerVideos(swiper);
          },
          onTransitionEnd: function (swiper) {
            toggleSwiperCaptionAnimation(swiper);
          },
          onInit: function (swiper) {
            toggleSwiperInnerVideos(swiper);
            toggleSwiperCaptionAnimation(swiper);

            var swiperParalax = s.find(".swiper-parallax");

            for (var k = 0; k < swiperParalax.length; k++) {
              var $this = $(swiperParalax[k]),
                speed;

              if (parallax && !isIEBrows && !isMobile) {
                if (speed = $this.attr("data-speed")) {
                  makeParallax($this, speed, s, false);
                }
              }
            }
            $(window).on('resize', function () {
              swiper.update(true);
            })
          }
        });

      $(window)
        .on("resize", function () {
          var mh = getSwiperHeight(s, "min-height"),
            h = getSwiperHeight(s, "height");
          if (h) {
            s.css("height", mh ? mh > h ? mh : h : h);
          }
        })
        .trigger("resize");
    }
  }

  /**
   * Page loader
   * @description Enables Page loader
   */
  if (plugins.pageLoader.length > 0) {

    $window.on("load", function () {
      var loader = setTimeout(function () {
        plugins.pageLoader.addClass("loaded");
        $window.trigger("resize");
      }, 200);
    });

  }

  /**
   * RD Search
   * @description Enables search
   */
  if (plugins.search.length || plugins.searchResults) {
    var handler = "bat/rd-search.php";
    var defaultTemplate = '<h6 class="search_title"><a target="_top" href="#{href}" class="search_link">#{title}</a></h6>' +
      '<p>...#{token}...</p>' +
      '<p class="match"><em>Terms matched: #{count} - URL: #{href}</em></p>';
    var defaultFilter = '*.html';

    if (plugins.search.length) {

      for (i = 0; i < plugins.search.length; i++) {
        var searchItem = $(plugins.search[i]),
          options = {
            element: searchItem,
            filter: (searchItem.attr('data-search-filter')) ? searchItem.attr('data-search-filter') : defaultFilter,
            template: (searchItem.attr('data-search-template')) ? searchItem.attr('data-search-template') : defaultTemplate,
            live: (searchItem.attr('data-search-live')) ? searchItem.attr('data-search-live') : false,
            liveCount: (searchItem.attr('data-search-live-count')) ? parseInt(searchItem.attr('data-search-live-count')) : 4,
            current: 0, processed: 0, timer: {}
          };

        if ($('.rd-navbar-search-toggle').length) {
          var toggle = $('.rd-navbar-search-toggle');
          toggle.on('click', function () {
            if (!($(this).hasClass('active'))) {
              searchItem.find('input').val('').trigger('propertychange');
            }
          });
        }

        if (options.live) {
          var clearHandler = false;

          searchItem.find('input').on("keyup input propertychange", $.proxy(function () {
            this.term = this.element.find('input').val().trim();
            this.spin = this.element.find('.input-group-addon');

            clearTimeout(this.timer);

            if (this.term.length > 2) {
              this.timer = setTimeout(liveSearch(this), 200);

              if (clearHandler == false) {
                clearHandler = true;

                $("body").on("click", function (e) {
                  if ($(e.toElement).parents('.rd-search').length == 0) {
                    $('#rd-search-results-live').addClass('cleared').html('');
                  }
                })
              }

            } else if (this.term.length == 0) {
              $('#' + this.live).addClass('cleared').html('');
            }
          }, options, this));
        }

        searchItem.submit($.proxy(function () {
          $('<input />').attr('type', 'hidden')
            .attr('name', "filter")
            .attr('value', this.filter)
            .appendTo(this.element);
          return true;
        }, options, this))
      }
    }

    if (plugins.searchResults.length) {
      var regExp = /\?.*s=([^&]+)\&filter=([^&]+)/g;
      var match = regExp.exec(location.search);

      if (match != null) {
        $.get(handler, {
          s: decodeURI(match[1]),
          dataType: "html",
          filter: match[2],
          template: defaultTemplate,
          live: ''
        }, function (data) {
          plugins.searchResults.html(data);
        })
      }
    }
  }

  /**
   * Slick carousel
   * @description  Enable Slick carousel plugin
   */
  if (plugins.slick.length) {
    var i;
    for (i = 0; i < plugins.slick.length; i++) {
      var $slickItem = $(plugins.slick[i]);

      $slickItem.slick({
        slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll')) || 1,
        asNavFor: $slickItem.attr('data-for') || false,
        dots: $slickItem.attr("data-dots") == "true",
        infinite: isNoviBuilder ? false : $slickItem.attr("data-loop") == "true",
        focusOnSelect: true,
        arrows: $slickItem.attr("data-arrows") == "true",
        swipe: $slickItem.attr("data-swipe") == "true",
        autoplay: $slickItem.attr("data-autoplay") == "true",
        vertical: $slickItem.attr("data-vertical") == "true",
        centerMode: $slickItem.attr("data-center-mode") == "true",
        centerPadding: $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 0,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-items')) || 1,
            }
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-xs-items')) || 1,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-sm-items')) || 1,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-md-items')) || 1,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: parseInt($slickItem.attr('data-lg-items')) || 1,
            }
          }
        ]
      })
        .on('afterChange', function (event, slick, currentSlide, nextSlide) {
          var $this = $(this),
            childCarousel = $this.attr('data-child');

          if (childCarousel) {
            $(childCarousel + ' .slick-slide').removeClass('slick-current');
            $(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
          }
        });
    }
  }

  /**
   * Owl carousel
   * @description Enables Owl carousel plugin
   */
  if (plugins.owl.length) {
    var i;
    for (i = 0; i < plugins.owl.length; i++) {
      var c = $(plugins.owl[i]),
        responsive = {};

      var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-"],
        values = [0, 480, 768, 992, 1200],
        j, k;

      for (j = 0; j < values.length; j++) {
        responsive[values[j]] = {};
        for (k = j; k >= -1; k--) {
          if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
            responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"));
          }
          if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
            responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"));
          }
          if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
            responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"));
          }
        }
      }

      // Create custom Pagination
      if (c.attr('data-dots-custom')) {
        c.on("initialized.owl.carousel", function (event) {
          var carousel = $(event.currentTarget),
            customPag = $(carousel.attr("data-dots-custom")),
            active = 0;

          if (carousel.attr('data-active')) {
            active = parseInt(carousel.attr('data-active'));
          }

          carousel.trigger('to.owl.carousel', [active, 300, true]);
          customPag.find("[data-owl-item='" + active + "']").addClass("active");

          customPag.find("[data-owl-item]").on('click', function (e) {
            e.preventDefault();
            carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item")), 300, true]);
          });

          carousel.on("translate.owl.carousel", function (event) {
            customPag.find(".active").removeClass("active");
            customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
          });
        });
      }

      // Create custom Numbering
      if (typeof(c.attr("data-numbering")) !== 'undefined') {
        var numberingObject = $(c.attr("data-numbering"));

        c.on('initialized.owl.carousel changed.owl.carousel', function (numberingObject) {
          return function (e) {
            if (!e.namespace) return;
            numberingObject.find('.numbering-current').text(e.item.index + 1);
            numberingObject.find('.numbering-count').text(e.item.count);
          };
        }(numberingObject));
      }

      c.owlCarousel({
        autoplay: c.attr("data-autoplay") === "true",
        loop: isNoviBuilder === "designMode" ? false : c.attr("data-loop") == 'true',
        items: 1,
        dotsContainer: c.attr("data-pagination-class") || false,
        navContainer: c.attr("data-navigation-class") || false,
        mouseDrag: isNoviBuilder === "designMode" ? false : c.attr("data-mouse-drag") !== "false",
        nav: c.attr("data-nav") === "true",
        dots: c.attr("data-dots") === "true",
        dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each")) : false,
        animateIn: c.attr('data-animation-in') ? c.attr('data-animation-in') : 'slide',
        animateOut: c.attr('data-animation-out') ? c.attr('data-animation-out') : false,
        responsive: responsive,
        navText: []
      });
    }
  }

  /**
   * jQuery Count To
   * @description Enables Count To plugin
   */
  if (plugins.counter.length) {
    var i;

    for (i = 0; i < plugins.counter.length; i++) {
      var $counterNotAnimated = $(plugins.counter[i]).not('.animated');
      $document
        .on("scroll", $.proxy(function() {
          var $this = this;

          if ((!$this.hasClass("animated")) && (isScrolledIntoView($this))) {
            $this.countTo({
              refreshInterval: 40,
              from: 0,
              to: parseInt($this.text(),10),
              speed: $this.attr("data-speed") || 1000,
              formatter: function(value, options) {
                value = value.toFixed(options.decimals);
                if (value < 10) {
                  return '0' + value;
                }
                return value;
              }
            });
            $this.addClass('animated');
          }
        }, $counterNotAnimated))
        .trigger("scroll");
    }
  }

  /**
   * Isotope
   * @description Enables Isotope plugin
   */
  if (plugins.isotope.length) {
    var i, j, isogroup = [];
    for (i = 0; i < plugins.isotope.length; i++) {
      var isotopeItem = plugins.isotope[i],
        filterItems = $(isotopeItem).closest('.isotope-wrap').find('[data-isotope-filter]'),
        iso;

      iso = new Isotope(isotopeItem, {
        itemSelector: '.isotope-item',
        layoutMode: isotopeItem.getAttribute('data-isotope-layout') ? isotopeItem.getAttribute('data-isotope-layout') : 'masonry',
        filter: '*',
        masonry: {
          columnWidth: 0.42
        }
      });

      isogroup.push(iso);

      filterItems.on("click", function (e) {
        e.preventDefault();
        var filter = $(this),
          iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]'),
          filtersContainer = filter.closest(".isotope-filters");

        filtersContainer
          .find('.active')
          .removeClass("active");
        filter.addClass("active");

        iso.isotope({
          itemSelector: '.isotope-item',
          layoutMode: iso.attr('data-isotope-layout') ? iso.attr('data-isotope-layout') : 'masonry',
          filter: this.getAttribute("data-isotope-filter") == '*' ? '*' : '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]',
          masonry: {
            columnWidth: 0.42
          }
        });

        $window.trigger('resize');

      }).eq(0).trigger("click");
    }

    $(window).on('load', function () {
      setTimeout(function () {
        var i;
        for (i = 0; i < isogroup.length; i++) {
          isogroup[i].element.className += " isotope--loaded";
          isogroup[i].layout();
        }
      }, 600);
    });
  }

  /**
   * WOW
   * @description Enables Wow animation plugin
   */
  if (!isNoviBuilder) {
    if (isDesktop && $html.hasClass("wow-animation") && $(".wow").length) {
      new WOW().init();
    }
  }

  /**
   * Bootstrap tabs
   * @description Activate Bootstrap Tabs
   */
  if (plugins.bootstrapTabs.length) {
    var i;
    for (i = 0; i < plugins.bootstrapTabs.length; i++) {
      var bootstrapTabsItem = $(plugins.bootstrapTabs[i]);

      bootstrapTabsItem.on("click", "a", function (event) {
        event.preventDefault();
        $(this).tab('show');
      });
    }
  }

  /**
   * RD Input Label
   * @description Enables RD Input Label Plugin
   */
  if (plugins.rdInputLabel.length) {
    plugins.rdInputLabel.RDInputLabel();
  }

  /**
   * Regula
   * @description Enables Regula plugin
   */
  if (plugins.regula.length) {
    attachFormValidator(plugins.regula);
  }

  /**
   * RD Mailform
   */

  if (plugins.rdMailForm.length) {
    var i, j, k,
      msg = {
        'MF000': 'Successfully sent!',
        'MF001': 'Recipients are not set!',
        'MF002': 'Form will not work locally!',
        'MF003': 'Please, define email field in your form!',
        'MF004': 'Please, define type of your form!',
        'MF254': 'Something went wrong with PHPMailer!',
        'MF255': 'Aw, snap! Something went wrong.'
      };
    for (i = 0; i < plugins.rdMailForm.length; i++) {
      var $form = $(plugins.rdMailForm[i]);

      $form.attr('novalidate', 'novalidate').ajaxForm({
        data: {
          "form-type": $form.attr("data-form-type") || "contact",
          "counter": i
        },
        beforeSubmit: function () {
          if (!isNoviBuilder){
            var form = $(plugins.rdMailForm[this.extraData.counter]);
            var inputs = form.find("[data-constraints]");
            if (isValidated(inputs)){
              var output = $("#" + form.attr("data-form-output"));

              if (output.hasClass("snackbars")) {
                output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xs"></span><span>Sending</span></p>');
                output.addClass("active");
              }
            } else{
              return false;
            }
          }

        },
        error: function (result) {
          if (!isNoviBuilder){
            var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output"));
            output.text(msg[result]);
          }

        },
        success: function (result) {
          if (!isNoviBuilder){
            var form = $(plugins.rdMailForm[this.extraData.counter]);
            var output = $("#" + form.attr("data-form-output"));
            form.addClass('success');
            result = result.length == 5 ? result : 'MF255';
            output.text(msg[result]);
            if (result === "MF000") {
              if (output.hasClass("snackbars")) {
                output.html('<p><span class="icon text-middle fa-check icon-xs"></span><span>' + msg[result] + '</span></p>');
              } else {
                output.addClass("success");
                output.addClass("active");
              }
            } else {
              if (output.hasClass("snackbars")) {
                output.html(' <p class="snackbars-left"><span class="icon icon-xs fa-warning text-middle"></span><span>' + msg[result] + '</span></p>');
              } else {
                output.addClass("error");
                output.addClass("active");
              }
            }
            form.clearForm();
            form.find('input, textarea').blur();

            setTimeout(function () {
              output.removeClass("active");
              form.removeClass('success');
            }, 5000);
          }
        }
      });
    }
  }

  /**
   * PhotoSwipe Gallery
   * @description Enables PhotoSwipe Gallery plugin
   */
  if (plugins.photoSwipeGallery.length) {

    // init image click event
    $document.delegate("[data-photo-swipe-item]", "click", function (event) {
      event.preventDefault();

      var $el = $(this),
        $galleryItems = $el.parents("[data-photo-swipe-gallery]").find("a[data-photo-swipe-item]"),
        pswpElement = document.querySelectorAll('.pswp')[0],
        encounteredItems = {},
        pswpItems = [],
        options,
        pswpIndex = 0,
        pswp;

      if ($galleryItems.length == 0) {
        $galleryItems = $el;
      }

      // loop over the gallery to build up the photoswipe items
      $galleryItems.each(function () {
        var $item = $(this),
          src = $item.attr('href'),
          size = $item.attr('data-size').split('x'),
          pswdItem;

        if ($item.is(':visible')) {

          // if we have this image the first time
          if (!encounteredItems[src]) {
            // build the photoswipe item
            pswdItem = {
              src: src,
              w: parseInt(size[0], 10),
              h: parseInt(size[1], 10),
              el: $item // save link to element for getThumbBoundsFn
            };

            // store that we already had this item
            encounteredItems[src] = {
              item: pswdItem,
              index: pswpIndex
            };

            // push the item to the photoswipe list
            pswpItems.push(pswdItem);
            pswpIndex++;
          }
        }
      });

      options = {
        index: encounteredItems[$el.attr('href')].index,

        getThumbBoundsFn: function (index) {
          var $el = pswpItems[index].el,
            offset = $el.offset();

          return {
            x: offset.left,
            y: offset.top,
            w: $el.width()
          };
        }
      };

      // open the photoswipe gallery
      pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pswpItems, options);
      pswp.init();
    });
  }

  /**
   * Custom Toggles
   */
  if (plugins.customToggle.length) {
    var i;

    for (i = 0; i < plugins.customToggle.length; i++) {
      var $this = $(plugins.customToggle[i]);

      $this.on('click', $.proxy(function (event) {
        event.preventDefault();
        var $ctx = $(this);
        $($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
      }, $this));

      if ($this.attr("data-custom-toggle-hide-on-blur") === "true") {
        $("body").on("click", $this, function (e) {
          if (e.target !== e.data[0]
            && $(e.data.attr('data-custom-toggle')).find($(e.target)).length
            && e.data.find($(e.target)).length == 0) {
            $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
          }
        })
      }

      if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
        $("body").on("click", $this, function (e) {
          if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length == 0 && e.data.find($(e.target)).length == 0) {
            $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
          }
        })
      }
    }
  }

  /**
   * Magnificent image zoom
   */
  if (plugins.imgZoom.length) {
    var i;
    for (i = 0; i < plugins.imgZoom.length; i++) {
      var $imgZoomItem = $(plugins.imgZoom[i]);
      $imgZoomItem.mag();
    }
  }

  /**
   * Custom Waypoints
   */
  if (isNoviBuilder !== "designMode") {
    if (plugins.customWaypoints.length) {
      var i;
      for (i = 0; i < plugins.customWaypoints.length; i++) {
        var $this = $(plugins.customWaypoints[i]);

        $this.on('click', function(e) {
          e.preventDefault();
          $("body, html").stop().animate({
            scrollTop: $("#" + $(this).attr('data-custom-scroll-to')).offset().top
          }, 1000, function() {
            $(window).trigger("resize");
          });
        });
      }
    }
  }


  /**
   * RD Parallax
   * @description Enables RD Parallax plugin
   */
  if (isNoviBuilder !== "designMode") {
    if (plugins.rdParallax.length && !isMobile) {
      var i;
      $.RDParallax();

      if (!isIE && !isMobile) {
        $(window).on("scroll", function() {
          for (i = 0; i < plugins.rdParallax.length; i++) {
            var parallax = $(plugins.rdParallax[i]);
            if (isScrolledIntoView(parallax)) {
              parallax.find(".rd-parallax-inner").css("position", "fixed");
            } else {
              parallax.find(".rd-parallax-inner").css("position", "absolute");
            }
          }
        });
      }

      $("a[href='#']").on("click", function(event) {
        setTimeout(function() {
          $(window).trigger("resize");
        }, 300);
      });
    }
  }

  /**
   * Page title
   * @description Enables page-title plugin
   */
  if (isNoviBuilder !== "designMode"){
    if (plugins.pageTitles) {
      var varCount = 30;

      for (var i = 0; i < plugins.pageTitles.length; i++) {
        var pageTitle = $(plugins.pageTitles[i]);

        var header = pageTitle.children()[0];
        var wrapper = $(document.createElement('div'));
        wrapper.addClass('page-title-inner');

        var pageTitleLeft = $(document.createElement('div')),
          pageTitleCenter = $(document.createElement('div')),
          pageTitleRight = $(document.createElement('div'));

      //  pageTitleLeft.addClass('page-title-left');
        pageTitleCenter.addClass('page-title-center');
        //pageTitleRight.addClass('page-title-right');

        for (var j = 0; j < varCount; j++) {
         // pageTitleLeft.append(header.cloneNode(true));
          //pageTitleRight.append(header.cloneNode(true));
        }

        pageTitleCenter.append(header.cloneNode(true));
        pageTitle.children(0).remove();

       // wrapper.append(pageTitleLeft);
        wrapper.append(pageTitleCenter);
       // wrapper.append(pageTitleRight);

        pageTitle.append(wrapper);
      }
    }
  }
});

//вывод нотисов при успешном логине или не успешном

 function vxod(){
   var str = $("#enterform").serialize();
   $.post("/pr_login.php", str, function (data) {
       console.log(data);
       $('#notice').html(data);
       $('#notice').css('display', 'block');
   })
 }
 function vixod(){
     $.post("/pr_login.php", {exit:'exit'}, function (data) {
         document.location.href = '/';
     })
 }

function slideBlock(a, block) {
    $('#' + block).slideToggle(300);

    var view = a.attr('data-view');
    if(view == '0')
    {
        a.html('(Свернуть)');
        a.attr('data-view', '1');
    }
    else
    {
        a.html('(Развернуть)');
        a.attr('data-view', '0');
    }

    return false;
}

function vizibl(a, block){
    var view = a.attr('data-view-t');
    if(view == '0'){

        // document.getElementById('tableBux3').style.display ='block';
        $('#' + block).css("display", "none");
        a.attr('data-view-t', '1')

    }else{
        //document.getElementById('tableBux3').style.display ='none';
        $('#' + block).css("display", "block");
        a.attr('data-view-t', '0');


    }
    return false;
}
/****************************************************/
/*ужас под названием таблица услуг по абнентским услугам*/

/******************************************************/

/* то что с ajax.js****/
function createXHR(){
    try {return new XMLHttpRequest(); } catch(e) {}
    try {return new ActiveXObject('Msxm12.XMLHTTP.6.0'); } catch(e) {}
    try {return new ActiveXObject('Msxm12.XMLHTTP.3.0'); } catch(e) {}
    try {return new ActiveXObject('Msxm12.XMLHTTP'); } catch(e) {}
    try {return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}

    alert("XMLHttpRequest not suppored");
    return null;
}
//функция аякса вывода компании
function inpOrgs(id, doby){
    document.getElementById(id).innerHTML = doby;
    if (id=='listOfnames'+id){
        var shirina = document.getElementById('grid').offsetWidth-1;
        document.getElementById('head_bux_table').style.width = shirina + 'px';
    }
}
function otpravka(bodik, urla, id, flag){

    function getData() {
        if ((oAJAX.readyState == 4) && (oAJAX.status == 200)){
            if (flag){
                var doby = JSON.parse(oAJAX.responseText);
                if (id=='addFormCompany'){insertAddOldComp(doby);}
                if (id=='rewriteListComp'){rewriteListComp(doby);}
                if (id=='insertTableOrig'){insertTableOrig(doby);}
                if (id=='changeYearTableOrig'){changeYearTableOrig(doby);}
                if (id=='changeDatePlan'){changeDatePlan(doby);}
                if (id=='changeDateFackt'){changeDateFackt(doby);}
                if (id=='insertNewOtchet'){insertNewOtchet(doby);}
                if (id=='editCompany'){editCompany(doby);}
            }else{
                var doby = oAJAX.responseText;
                if (id == 'changeNameOtchet'){changeNameOtchet(doby);}
                if (id=='sel_type_region'){inpOrgs(id, doby);}
                if (id=='listOfnames'+id){ inpOrgs(id, doby);}
                if (id=='div_list_comp'){ inpOrgs(id, doby);}
            }
        }
    }
//console.log(bodik);
    var body = bodik;
    var oAJAX = createXHR();
    var url = urla;
    oAJAX.open("POST", url, true);
    oAJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oAJAX.onreadystatechange = getData;
    oAJAX.send(body);
}
/*end*/
/**************************/


/***/
/*привет ужас и кошмар вывода*/

var yearProv = null;
var yearChek=0;
var realTime = new Date();
var realYear = realTime.getFullYear();
var perem_year = 2017;
var bu=0;
var MaxId = '';
var flFlagg = true;
var outCode = '';

var AddOrgCode = 0;//"флаг добавить компанию"
//var AddClientCode = 0;//"флаг добавить клиента"

var i=true;//флаг видимости кнопки абон усл
var j=true;//флаг видимости кнопки разовые усл


var datUSN;
var datUSN1;
var datOSN;
var datENVD;


var flagName = true;
var nameRep='';
var typeRep='NaN';
var repId='';
var flagEdit = true;
var pervI=0;
var vtorI=0;
var idRep =0;
var massiv_ID = [];
var flType;
var flType1;
var id_vrem;
var id2;
var dat_mas = [];
var newName;
var flag_otp3 =false;
var flag_otp2 = false;
var flag_otp = false;
var flagInset = false;
var izik = ''
// $( document ).ready(function() {
//   // Handler for .ready() called.
// });
$( document ).ready(function() {

    //***********************************************************************************************************
    //НАЧАЛО код формы "список клиентов"

    var flagSeach;

    var theBuxHeadTable = document.getElementById('head_bux_table');
    //  var tableBuxListComp = document.getElementById('grid');
    // var shirina = tableBuxListComp.offsetWidth-1;
    //theBuxHeadTable.style.width = shirina + 'px';

    var listComp = document.getElementById('listOfnames');

    var spaBuxHeadBoss = document.getElementById('bux_head_boss');
    var spaBuxHeadComp = document.getElementById('bux_head_comp');

    var inpBuxSeach = document.getElementById('bux_head_seach');

    var tdBuxHeadComp = document.getElementById('thBeginHeadComp');
    var tdBuxHeadBoss = document.getElementById('thBeginHeadBoss');
    //поиск по владельцу


  /*КОНЕЦ код формы "список клиентов"*/
    //*****************************************************************************************************************************

    //**********************************************************************************************************************************
    //НАЧАЛО код формы инфо о клиенте
    var butDataEdit = document.getElementById('but_data_edit');
    var butDataSave = document.getElementById('but_data_save');
    var butDataNoSave = document.getElementById('but_data_no_save');
    var butDataInsert = document.getElementById('but_data_insert');

    var inpDataPhone = document.getElementById('inp_data_phone');
    var inpDataMail = document.getElementById('inp_data_mail');
    var inpDataNameBoss = document.getElementById('inp_data_name_boss');
    var inpDataNameComp = document.getElementById('inp_data_name_comp');

    var spaDataNameComp = document.getElementById('name_org');
    var spaDataNameBoss = document.getElementById('gen_dir');
    var spaDataMail = document.getElementById('email');
    var spaDataPhone = document.getElementById('phone_number');
    var spaDataLSKey = document.getElementById('lis_key');

    var cheDataUSN = document.getElementById('che_data_usn');
    var cheDataUSN1 = document.getElementById('che_data_usn1');
    var cheDataOSN = document.getElementById('che_data_osn');
    var cheDataENVD = document.getElementById('che_data_envd');

    //меняем значения флагов систем налообложения

    //КОНЕЦ код формы инфо о клиенте
    //******************************************************************************************************************************

    //*****************************************************************************************************************************
    //ниже код для работы формы "добавить клиента"
    var flagUslugi = 0;
    var articulUslugi;

    var butAddClient = document.getElementById('but_add_insert');
    var butAddClier = document.getElementById('but_add_clear');

    var texAddCommentComp = document.getElementById('tex_comment_comp');
    var texAddCommentUsluga = document.getElementById('tex_comment_usluga');

    var selAddTypeClient = document.getElementById('sel_type_comp');
    var selAddTypeRegion = document.getElementById('sel_type_region');
    var selAddNameUsluga = document.getElementById('sel_name_usluga');
    var selAddTypeCountry = document.getElementById('sel_type_country');

    var inpAddNameComp = document.getElementById('inp_name_comp');
    var inpAddNameBoss = document.getElementById('inp_name_boss');
    var inpAddNameStrit = document.getElementById('inp_name_strit');
    var inpAddNumberHouse = document.getElementById('inp_number_house');
    var inpAddPhone = document.getElementById('inp_phone');
    var inpAddEmail = document.getElementById('inp_email');
    var inpAddUSN = document.getElementById('inp_USN');
    var inpAddUSN1 = document.getElementById('inp_USN1');
    var inpAddOSN = document.getElementById('inp_OSN');
    var inpAddENVD = document.getElementById('inp_ENVD');
    var inpAddNameTown = document.getElementById('inp_name_town');
    var inpAddPriceUsluga = document.getElementById('inp_price_usluga');
    var inpAddFaktPayment = document.getElementById('inp_fakt_payment');
    var inpAddNumbAgreement = document.getElementById('inp_number_agreement');
    var inpAddEndAgreement = document.getElementById('inp_end_agreement');

    var divAddTypeRegion = document.getElementById('div_type_region');
    var divAddTypeTowns = document.getElementById('div_names_towns');
    var divAddListComp = document.getElementById('div_list_comp');
    var divAddUslugAgreement = document.getElementById('div_uslug_agreement');



//конец функций "добавить клиента"
//*********************************************************************************************************************


//*********************************************************************************************************************
//НАЧАЛО КОД ФОРМЫ ТАБЛ АБ УСЛУГ ДЛЯ КЛИЕНТОВ

  //  var nameCreRep = document.getElementById('nameCreRep');
   // var typeCreRep = document.getElementById('typeCreRep');
  //  var butInpDoc = document.getElementById('butInp');
  //  var butSaveDoc = document.getElementById('butInp1');
    var outCodeS = document.getElementById('outCode');

   // nameCreRep.onclick = function(){
       // this.setAttribute('style','border-color:initial');
   // }
    //typeCreRep.onclick = function(){
       // this.setAttribute('style','border-color:initial');
   // }


//заполняем временные ячейки
    function vremComplit(a, b, flag){
        var dis = '';
        if (flag){
            dis = 'disabled';
        }
        var sod='';
        for (var i=a; i<b; i++){
            sod+='<td><input id="b'+i+'" class="inpTab" maxlength="10" onkeydown="inpPoleD(id, '+flag+')"  placeholder="ДД.ММ.ГГГГ"'+dis+'></td>';
        }
        return sod;
    }


//собираем все данные во временных импутах
    function copydat(a,b, bol){
        var massik = [];
        if (bol == false){
            for (var i=0, coun=0; i<b.length; i++, coun++){
                var buf='';
                var tel = document.getElementById('b'+b[i]+'');
                var tel1 = tel.parentElement;
                buf = tel.value;
                if (buf!=''){
                    var mas = [coun, buf];
                    massik.push(mas);
                    buf='';
                }
            }
        }else{

            for(var i=a, coun = 0; i<b; i++, coun++){
                var buf='';
                var tel = document.getElementById('b'+i+'');
                var tel1 = tel.parentElement;
                buf = tel.value;
                if (buf!=''){
                    var mas = [coun, buf];
                    massik.push(mas);
                    buf='';
                }
            }
        }
        return massik;

    }



//КОНЕЦ КОДА ФОРМЫ ТАБЛ АБ УСЛУГ ДЛЯ КЛИЕНТОВ
//*********************************************************************************************************************

});
//**********************************************************************************************
//НАЧАЛО код формы "список клиентов"

//функция определения сист налообл в форме "инфо о кл"
function tru_or_fal(perem, a){
    if (perem===true){
        document.getElementById(a).checked = true;
        document.getElementById(a).value = 1;
        perem = 'display: block';
    }else{
        document.getElementById(a).value = 'on';
        perem = 'display: none';
    }
    return perem;
}
//делаем запрос данных для таблицы "абон усл для клиента"
function output(id){
    //поиск класса fool, который защищает от поторных нажатий
    var classD = 'fool';
    var cl = document.getElementById(id).getAttribute('class');
    var p = new RegExp (classD,'g');
    cl = cl.match(p);
  //  console.log(cl);
    if (cl != classD){
       // document.getElementById('butInp').removeAttribute('disabled');
        document.getElementById(0).innerHTML ='';
        document.getElementById(1).innerHTML ='';
        document.getElementById(2).innerHTML ='';
        document.getElementById(3).innerHTML ='';
        //снимаем класс fool со всех элементов первой таблицы
        var izi = document.getElementById('listOfnames'+ id).children;
        //console.log(izi);
        for (var t=0; t<izi.length; t++){
            var cl = izi[t].getAttribute('class');
            var p = new RegExp (classD,'g');
         //  cl = cl.match(p);
           // console.log(cl);
            if (cl != classD){
                izi[t].setAttribute('class', 'pole_table')
            }
        }
        document.getElementById('liYears').innerHTML='';

        bu = id;
        var bodik = "idi="+id;
        var oAJAX = createXHR();
        var urla = "http://adaly.ru/wp-content/themes/twentysixteen/ajax-bux-arm.php";

        otpravka(bodik, urla, 'insertTableOrig', true);

        document.getElementById(id).classList.add(classD);
    }
    return outCode;
};
//обрабатываем полученный ответ с сервера
function insertTableOrig(doby){
    var toxData1 = doby[5];
    var toxData2 = doby[6];
    var toxData3 = doby[7];
    var toxData4 = doby[8];
    var commet = doby[9];
    if(commet){
        var cont='';
        for (var i=0; i<commet.length; i++){

          var img = '';
          if (doby[9][i][3] == 'client'){img = '/wp-content/themes/twentysixteen/images/content-engagement.gif';}
          else {img='/wp-content/themes/twentysixteen/images/post-4-70x71.jpg';}

            cont+='<article class="comment"><div class="bg"><div class="unit-left"><figure><img src="'+img+'" alt="" width="70" height="71"></figure></div><div class="unit-body_comment">';
            cont+='<div class="comment-body"><div class="comment-body-header">';
            cont+='<div class="comment-meta"><p class="user">'+doby[9][i][0]+' </p></div>';
            cont+='<div class="comment-time"> <div class="object-inline"><time style="color:white;">'+doby[9][i][1]+'</time></div></div>';
            cont+='</div>';
            cont+='<div class="comment-body-text"><p class="text-gray-base" style="color:#fff;">'+doby[9][i][2]+'</p></div>';
            cont+='</div></div></div></article>';
        }
    }else{
        var cont='';
    }
    var fin_a = doby[10];
    var fin_r = doby[11];
    var rep_m = doby[12];
    outCode = doby[14];
    MaxId = doby[15];
    bu = doby[16];
    //заполняем таблицу отчётов
    buxa(rep_m, bu, doby[13], true, null);
    console.log(doby[9]);
    //заполняем вторую таблицу
 //   document.getElementById('lis_key').innerHTML = doby[0];
   // document.getElementById('name_org').innerHTML = doby[1];
   // document.getElementById('gen_dir').innerHTML = doby[2];
   // document.getElementById('email').innerHTML = doby[4];
   // document.getElementById('phone_number').innerHTML = doby[3];
   // document.getElementById('tox1_key').setAttribute('style', tru_or_fal(toxData1[1], 'che_data_usn'));
   // document.getElementById('tox2_key').setAttribute('style', tru_or_fal(toxData2[1], 'che_data_usn1'));
   // document.getElementById('tox3_key').setAttribute('style', tru_or_fal(toxData3[1], 'che_data_osn'));
   // document.getElementById('tox4_key').setAttribute('style', tru_or_fal(toxData4[1], 'che_data_envd'));
    document.getElementById('comments').innerHTML = cont;
    // outdisablElem(document.getElementById('but_data_edit'));
    // outdisablElem(document.getElementById('but_data_insert'))
    //заполняем таблицу абонентский услуг
    if (fin_a!==null){
         document.getElementById('fin_a_name').innerHTML = fin_a[0];
         document.getElementById('fin_a_dateAdd').innerHTML = fin_a[1];
         document.getElementById('fin_a_price').innerHTML = fin_a[2]+' руб.';
        //document.getElementById('fin_a_period').innerHTML = fin_a[3];
        // document.getElementById('fin_a_endDay').innerHTML = fin_a[4];
    }else{
        document.getElementById('fin_a_name').innerHTML = '';
        document.getElementById('fin_a_dateAdd').innerHTML = '';
        document.getElementById('fin_a_price').innerHTML = '';
        //document.getElementById('fin_a_period').innerHTML = '';
        // document.getElementById('fin_a_endDay').innerHTML = '';
    }
    //заполняем таблицу разовых услуг
    if (fin_r!==null){
      //  document.getElementById('fin_r_name').innerHTML = fin_r[0];
     //   document.getElementById('fin_r_dateAdd').innerHTML = fin_r[1];
      //  document.getElementById('fin_r_price').innerHTML = fin_r[2]+' руб.';
        //document.getElementById('fin_r_period').innerHTML = fin_r[3];
        //document.getElementById('fin_r_endDay').innerHTML = fin_r[4];
    }else{
       // document.getElementById('fin_r_name').innerHTML = '';
       // document.getElementById('fin_r_dateAdd').innerHTML = '';
       // document.getElementById('fin_r_price').innerHTML = '';
        // document.getElementById('fin_r_period').innerHTML = '';
        // document.getElementById('fin_r_endDay').innerHTML = '';
    }
}
//делаем запрос на переключение года
function output2(dat1, dat2, id){

   // document.getElementById('butInp').removeAttribute('disabled');
    var listYear = document.getElementById('liYears').children;
    for(var i=0; i<listYear.length; i++){
        listYear[i].setAttribute('class','');
    }

    var bodik = "id="+dat1+"&year="+dat2+"&cod="+outCode;
    var urla = 'http://adaly.ru/wp-content/themes/twentysixteen/ajax-bux-year-arm.php';
    otpravka(bodik, urla, 'changeYearTableOrig', true);


    document.getElementById(0).innerHTML ='';
    document.getElementById(1).innerHTML ='';
    document.getElementById(2).innerHTML ='';
    document.getElementById(3).innerHTML ='';

    function getData1(){
        if ((ajaxA.readyState == 4) && (ajaxA.status == 200)){
            var dann = JSON.parse(ajaxA.responseText);
            yearChek = dann[0];
            var year = dann[0];
            var rep_m = dann[1];
            var org_cod = dann[2];
            MaxId = dann[3];
            buxa(rep_m, bu, org_cod, false, year);
        }
    }
    //ajaxA.open('POST', url1, true);
    //ajaxA.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //ajaxA.onreadystatechange = getData1;
    //ajaxA.send(payloo);

    document.getElementById(id).setAttribute('class','activeYear');
}
//обрабатываем полученный ответ с сервера
function changeYearTableOrig(doby){

    yearChek = doby[0];
    var year = doby[0];
    var rep_m = doby[1];
    var org_cod = doby[2];
    MaxId = doby[3];

    buxa(rep_m, bu, org_cod, false, year);
}
//основная функция заполнения таблицы
function buxa(rep_m, bu, org_cod, flajok, year){
//индикатор первой записи в таблицы, ложь-1я
    var indicator = false;
    yearProv = year;

    if (rep_m){
//console.log(rep_m);
        var year1 =0;
        var all_mass_year =[];
        var mas_gods = [];
        //выдёргиваем года и готовим массив инфы отчётов
        for (var x=0; x<rep_m.length; x++){
            year1 = rep_m[x][3].substring(0,4);
            year1 = parseFloat(year1);
            all_mass_year.push(year1);
            //в buf загружаем массив одного отчёта и передаём в массив
            var buf = rep_m[x];
            var mass_Mas = [year1, buf];
            mas_gods.push(mass_Mas);
        }
        all_mass_year.sort();

        //первая проверка повтора годов
        for (var i=1; i<all_mass_year.length; i++){
            for(var j=0; j<all_mass_year.length; j++){
                if (j!=i){
                    if (all_mass_year[i]===all_mass_year[j]){
                        all_mass_year.splice(i,1);
                    }
                }
            }
        }
        //вторая проверка повтора годов
        for (var i=1; i<all_mass_year.length; i++){
            for(var j=0; j<all_mass_year.length; j++){
                if (j!=i){
                    if (all_mass_year[i]===all_mass_year[j]){
                        all_mass_year.splice(i,1);
                    }
                }
            }
        }
        for (var i=1; i<all_mass_year.length; i++){
            for(var j=0; j<all_mass_year.length; j++){
                if (j!=i){
                    if (all_mass_year[i]===all_mass_year[j]){
                        all_mass_year.splice(i,1);
                    }
                }
            }
        }

        //вывод списка годов использует толлько функция output
        if (flajok){
            var sod='';
            for (var i=0; i<all_mass_year.length; i++){
                if (all_mass_year[i] == realYear){
                    sod += '<li id="y'+i+'" class="activeYear" onclick="output2('+bu+','+all_mass_year[i]+', id)">'+all_mass_year[i]+'</li>';
                }else{
                    sod += '<li id="y'+i+'" onclick="output2('+bu+','+all_mass_year[i]+', id)">'+all_mass_year[i]+'</li>';
                }
            }
            document.getElementById('liYears').innerHTML = sod;
        }

        // outCode = org_cod;
        org_cod = outCode;
        // console.log(org_cod);
        var soder = '';
        //вызываем функцию zagon циклично

        for (var k=0; k<mas_gods.length; k++){
            if (mas_gods[k][0] == yearProv){
                if (k==0){
                    indicator = false;
                }else{
                    indicator =true;
                }
                var rep_mm = mas_gods[k][1];

                zagon(rep_mm, indicator);

            } else if (year == null) {
                if (mas_gods[k][0] == realYear){
                    if (k==0){
                        indicator = false;
                    }else{
                        indicator =true;
                    }
                    var rep_mm = mas_gods[k][1];

                    zagon(rep_mm, indicator);
                }
            }
        }

    }else{
        document.getElementById(0).innerHTML ='';
        document.getElementById(1).innerHTML ='';
        document.getElementById(2).innerHTML ='';
        document.getElementById(3).innerHTML ='';
    }
}
//второй шаг заполнения таблицы
function zagon(rep_m, indicator){
    //alert('zagon');
    var id_rep = rep_m[0];
    var type_rep = rep_m[2];
    var idi2 =  id_rep+''+type_rep;
    var polId = creId(id_rep, type_rep);
    var proverka = polId+'0';
    var name_rep = rep_m[1];
    var day_p = rep_m[3];
    var day_f = rep_m[4];
    var idi3 = rep_m[5];
    var soder;
    if (indicator === false){
        soder = '<tr><td rowspan="2" id="nameRep'+idi3+'" onclick="editName(id)" class="moveTd '+id_rep+'">'+name_rep+'</td>'+complit1(idi3, day_p, day_f, polId, false, id_rep, idi2)+'</tr>';
        //soder = '<tr><td rowspan="2" id="nameRep'+idi2+'" onclick="editName(id)" class="moveTd '+id_rep+'">'+name_rep+'</td><td onclick="editPlan(id)" class="tdHov '+id_rep+'" id="p'+idi2+'" >План</td>'+complit(polId, day_p, 0, 12, false, idi3)+'<tr><td onclick="editFackt(id)" class="tdHov '+id_rep+'" id="f'+idi2+'" >Факт</td>'+complit(polId, day_f, 12, 24, false, idi3)+'</tr></tr>';
        document.getElementById(type_rep).innerHTML += soder;
        indicator=true;

    }else{
        //сделай проще этот кусман
        if (prover(proverka, type_rep)){
            complit1(idi3, day_p, day_f, polId, true, id_rep, idi2);
            //complit1(idi3, day_p, day_f, polId, true);
        }else{
            soder = '<tr><td rowspan="2" id="nameRep'+idi3+'" onclick="editName(id)" class="moveTd '+id_rep+'">'+name_rep+'</td>'+complit1(idi3, day_p, day_f, polId, false, id_rep, idi2)+'</tr>';
            //soder = '<tr><td rowspan="2" id="nameRep'+idi2+'" onclick="editName(id)" class="moveTd '+id_rep+'">'+name_rep+'</td><td onclick="editPlan(id)" class="tdHov '+id_rep+'" id="p'+idi2+'" >План</td>'+complit(polId, day_p, 0, 12, false, idi3)+'<tr><td onclick="editFackt(id)" class="tdHov '+id_rep+'" id="f'+idi2+'">Факт</td>'+complit(polId, day_f, 12, 24, false, idi3)+'</tr></tr>';
            document.getElementById(type_rep).innerHTML += soder;

        }
    }

}
//заполняем ячейки
function complit1(idi3, day_p, day_f, polid, bol, id_rep, idi2){

    var sod = '<td onclick="editPlan(id)" class="tdHov '+id_rep+'" id="p'+idi2+'">План</td>';

    var data2 = day_p;
    var indt;
    for (var i=0, count=1; i<24; i++, count++){
        var day = data2.substring(8);
        var month = data2.substring(5,7);
        var data = day+'.'+month;
        var year = data2.substring(0,4);
        var stl = '';
        //проверяем год
        if (yearProv==null){
            data = day+'.'+month;
            if (year!=realYear){
                data = data +'.'+year;
                stl = 'style="color:red"';
            }
        }else if(year!=yearProv){
            data = data +'.'+year;
            stl = 'style="color:red"';
        }
        if (day_f > day_p) { stl = 'style="color:red"'; } else { stl = 'style="color:inherit;"';}
        var id = polid+i;

        if (i<12){
            count = count.toString();
            if (count.length<2){
                count = '0'+count;

            }
            if (count==month){

                if (bol){
                    document.getElementById(id).innerHTML = data;
                    document.getElementById(id).setAttribute('class', idi3);
                    indt = count;
                }else{
                    sod += '<td id="'+id+'" class="'+idi3+'">'+data+'</td>';
                    indt = count;
                }
            }else{
                sod+= '<td id="'+id+'"></td>';
            }
        }else{
            if (count == indt){
                if (bol){
                    document.getElementById(id).innerHTML = data;
                    document.getElementById(id).setAttribute('class', idi3);
                    if (year!=yearProv && yearProv!=null){
                        document.getElementById(id).setAttribute('style','color:red');
                    }else if (year!=yearProv && year!=realYear){
                        document.getElementById(id).setAttribute('style','color:red');
                    }

                }else{
                    sod += '<td id="'+id+'" '+stl+' class="'+idi3+'">'+data+'</td>';
                }
            }else{
                sod+= '<td id="'+id+'"></td>';
            }
        }
        if (i==11){
            sod+='<tr><td onclick="editFackt(id)" class="tdHov '+id_rep+'" id="f'+idi2+'">Факт</td>';
            data2 = day_f;
            count = 0;
        }
        if (i==23){
            sod+='</tr>';
        }
    }
    return sod;
}
//делаем id
function creId(data1, data2){
    var id = data1.toString()+data2.toString();
    return id;
}
//проверка повторов
function prover(data11, data21){
    var telo = document.getElementById(data21).children.length;
    if (telo>0){
        for (var i=0; i<telo; i++){
            var telo1 = document.getElementById(data21).children[i].children[2].id;

            telo1 = telo1.toString();
            if (telo1){
                if (data11==telo1){

                    return true;

                }else{

                }
            }

        }
    }
    return false;
}

function listCompInspect(doby){
    document.getElementById('listOfnames').innerHTML = doby;
}
/*КОНЕЦ код формы "список клиентов"*/
//***********************************************************************************************

//*************************************************************************************
//КОД ФУНКЦИЙ ДЛЯ ФОРМЫ ИНФО О КЛИЕНТЕ


//функции кнопок открывают/закрывают формы
/*function vizibl(){
 if (i){
 document.getElementById('tableBux3').style.display ='block';
 document.getElementById('tableBuxOrig').style.display ='block';
 i=false;
 }else{
 document.getElementById('tableBux3').style.display ='none';
 document.getElementById('tableBuxOrig').style.display ='none';
 i=true;
 }
 }
 function vizibl1(){
 if (j){
 document.getElementById('tableBux4').style.display ='block';
 j=false;
 }else{
 document.getElementById('tableBux4').style.display ='none';
 j=true;
 }
 }
 */
//функция защиты переключателей сист налогообложения
function cancelEditSN(a,id,c){
    if (a!=1){
        outdisplay(id);
        c.checked = false;
        c.value = 'on';
    }else{
        c.checked = true;
        c.value = 1;
    }
    outdisplay(c);
}

//ответ с сервера после редактироввния данных
function editCompany(doby){
    document.getElementById('listOfnames').innerHTML = doby[0];
    if (doby[1]){
        document.getElementById('name_org').innerHTML = document.getElementById('inp_data_name_comp').value;
        document.getElementById('gen_dir').innerHTML = document.getElementById('inp_data_name_boss').value;
        document.getElementById('email').innerHTML = document.getElementById('inp_data_mail').value;
        document.getElementById('phone_number').innerHTML = document.getElementById('inp_data_phone').value;

        outdisplay(document.getElementById('inp_data_name_comp'));
        outdisplay(document.getElementById('inp_data_name_boss'));
        outdisplay(document.getElementById('inp_data_mail'));
        outdisplay(document.getElementById('inp_data_phone'));
        outdisplay(document.getElementById('but_data_save'));
        outdisplay(document.getElementById('but_data_no_save'));
        cancelEditSN(datUSN, document.getElementById('tox1_key'), document.getElementById('che_data_usn'));
        cancelEditSN(datUSN1, document.getElementById('tox2_key'), document.getElementById('che_data_usn1'));
        cancelEditSN(datOSN, document.getElementById('tox3_key'), document.getElementById('che_data_osn'));
        cancelEditSN(datENVD, document.getElementById('tox4_key'), document.getElementById('che_data_envd'));

        indisplay(document.getElementById('name_org'));
        indisplay(document.getElementById('gen_dir'));
        indisplay(document.getElementById('email'));
        indisplay(document.getElementById('phone_number'));
        indisplay(document.getElementById('but_data_edit'));

    }else{
        alert('ошибка скрипта сервера, зовите программера');
    }
}

//КОНЕЦ ФУНКЦИЙ ДЛЯ ФОРМЫ ИНФО О КЛИЕНТЕ
//****************************************************************************************


//*********************************************************************************************
//НИЖЕ КОД ФУНЦИЙ ДЛЯ ФОРМЫ "добавить клиента"

//перебор элементов
function pereborElem(a, val){
    for (var i=0; i<a.length; i++){
        a[i].value = val;
        if (a[i].type=='checkbox'){

        }
    }
}
//очищаем блок
function clearAddForm(){
    AddOrgCode = 0;
    var div = document.getElementById('addForm');
    var elem = div.getElementsByTagName('input');
    pereborElem(elem, '');
    outdisablElem(document.getElementById('inp_phone'));
    outdisablElem(document.getElementById('inp_email'));
    outdisablElem(document.getElementById('inp_name_comp'));
    outdisablElem(document.getElementById('inp_name_boss'));
    outdisablElem(document.getElementById('inp_name_town'));
    outdisablElem(document.getElementById('inp_name_strit'));
    outdisablElem(document.getElementById('inp_number_house'));
    outdisablElem(document.getElementById('inp_USN'));
    outdisablElem(document.getElementById('inp_USN1'));
    outdisablElem(document.getElementById('inp_OSN'));
    outdisablElem(document.getElementById('inp_ENVD'));
    outpodsvetError(document.getElementById('inp_phone'));
    outpodsvetError(document.getElementById('inp_email'));
    outpodsvetError(document.getElementById('inp_name_comp'));
    outpodsvetError(document.getElementById('inp_name_boss'));
    outpodsvetError(document.getElementById('inp_name_town'));
    outpodsvetError(document.getElementById('inp_name_strit'));

    var elem = div.getElementsByTagName('select');
    pereborElem(elem, '0');
    outdisablElem(document.getElementById('sel_type_region'));
    outdisablElem(document.getElementById('sel_type_comp'));
    outpodsvetError(document.getElementById('sel_type_country'));
    outpodsvetError(document.getElementById('sel_type_region'));
    outpodsvetError(document.getElementById('sel_type_comp'));
    outpodsvetError(document.getElementById('sel_name_usluga'));
    var elem = div.getElementsByTagName('textarea');
    pereborElem(elem, '');
    outdisplay(document.getElementById('div_names_towns'));
    outdisplay(document.getElementById('div_type_region'));
    outdisplay(document.getElementById('div_uslug_agreement'));
    document.getElementById('div_list_comp').innerHTML = '';
}

//скрываем открываем элементы
function indisplay(a){
    a.removeAttribute('style');
}
function outdisplay(a){
    a.setAttribute('style','display: none');
}

//подсветка для инпутов в случае неверного ввода
function podsvetError(a){
    a.setAttribute('style','border-color:red');
}
function outpodsvetError(a){
    a.removeAttribute('style');
}

//активный-неактивный элемент
function indisablElem(a){
    a.setAttribute('disabled', 'disabled');
}
function outdisablElem(a){
    a.removeAttribute('disabled');
}



//запрашиваем данные существующей компании
function addFormCompany(id){
    //if (AddClientCode==0){
    if (id.length!=0){
        var body = 'id='+id;
        var url = '/includes/bux/ajax/insertOldComp.php';
        otpravka(body, url, 'addFormCompany', true);
    }
    //}
}
//выводим данные существующей компании *подумать как подрихтовать
function insertAddOldComp(doby){
    document.getElementById('inp_phone').value = doby[0];
    indisablElem(document.getElementById('inp_phone'));
    document.getElementById('inp_email').value = doby[1];
    outpodsvetError(document.getElementById('inp_email'));
    indisablElem(document.getElementById('inp_email'));
    document.getElementById('sel_type_comp').value = doby[2];
    indisablElem(document.getElementById('sel_type_comp'));
    document.getElementById('inp_name_comp').value = doby[3];
    outpodsvetError(document.getElementById('inp_name_comp'));
    indisablElem(document.getElementById('inp_name_comp'));
    document.getElementById('inp_name_boss').value = doby[4];
    indisablElem(document.getElementById('inp_name_boss'));
    if (doby[5]!=0){
        document.getElementById('sel_type_country').value = doby[5];
        indisplay(document.getElementById('div_type_region'));
        var body = 'code='+doby[5]+'&region='+doby[6];
        var url = '/includes/bux/ajax/selectRegion.php';
        otpravka(body, url, 'sel_type_region', false);
        outpodsvetError(document.getElementById('sel_type_country'));
    }
    indisablElem(document.getElementById('sel_type_country'));
    indisablElem(document.getElementById('sel_type_region'));
    if (doby[7]!=''){
        document.getElementById('inp_name_town').value = doby[7];
    }
    indisablElem(document.getElementById('inp_name_town'));
    indisplay(document.getElementById('div_names_towns'));
    document.getElementById('inp_name_strit').value = doby[8];
    indisablElem(document.getElementById('inp_name_strit'));
    document.getElementById('inp_number_house').value = doby[9];
    indisablElem(document.getElementById('inp_number_house'));
    //разобраться с налоговой
    document.getElementById('inp_USN').value = doby[10];
    indisablElem(document.getElementById('inp_USN'));
    document.getElementById('inp_USN1').value = doby[11];
    indisablElem(document.getElementById('inp_USN1'));
    document.getElementById('inp_OSN').value = doby[12];
    indisablElem(document.getElementById('inp_OSN'));
    document.getElementById('inp_ENVD').value = doby[13];
    indisablElem(document.getElementById('inp_ENVD'));
    AddOrgCode = doby[14];
    document.getElementById('div_list_comp').innerHTML = '';
    alert('Добавленные данные редактировать нельзя, чтобы очистить форму нажмите кнопку "Очистить"');

}

//функция обновляет список компаний и очищает форму
function rewriteListComp(doby){
    document.getElementById('listOfnames').innerHTML = doby[0];
    clearAddForm();
    if (doby[2]==1){
        alert('данные успешно добавлены');
    }else{
        alert('данные не добавлены, скорее всего у компании есть абон услуга');
    }
}

//КОНЕЦ ФУНКЦИЙ "добавить клиента"
//*******************************************************************************************

//****************************************************************************************************************************
//НАЧАЛО КОД ФУНЦИЙ ДЛЯ ТАБЛИЦЫ АБ УСЛУГ ДЛЯ КЛИЕНТА

//ответ с сервера создания нового отчёта
function insertNewOtchet(doby){
    MaxId = doby[0];
    var mas_rep = doby[1];
    flag = true;
    var godok = null;

    if (flag){
        for (var i=1; i<25; i++){
            var tel = document.getElementById('b'+i+'');
            var tel1 = tel.parentElement;
            var buf = tel.value;
            tel1.removeChild(tel);
            tel1.innerHTML = buf;
            tuk = i-1;
            id1 = repId+''+typeRep+''+tuk;
            tel1.setAttribute('id',id1);
            document.getElementById('butInp1').setAttribute('disabled', 'disabled');
            document.getElementById('butInp').removeAttribute('disabled');
            flag_otp = false;
            flagInset = false;
            document.getElementById('butInp1').removeAttribute('style', 'border-color:green');
            flFlagg = true;
        }

        for (var j =0; j<2; j++){
            var mit = document.getElementById(typeRep).lastChild;
            document.getElementById(typeRep).removeChild(mit);
        }
        buxa(mas_rep, bu, outCode, true, null);
        //console.log(bu);
    }else{
        alert('Отчет не добавлен, попробуйте снова');
    }

}

//функция ограничения ввода ненужных символов
function inpPoleD(a, flag){
    flag_otp = true;
    flag_otp2 = true;
    switch (event.keyCode){
        case 37: break;
        case 38: break;
        case 39: break;
        case 40: break;
        case 8: break;
        case 9: break;
        case 48: break;
        case 49: break;
        case 50: break;
        case 51: break;
        case 52: break;
        case 53: break;
        case 54: break;
        case 55: break;
        case 56: break;
        case 57: break;
        case 96: break;
        case 97: break;
        case 98: break;
        case 99: break;
        case 100: break;
        case 101: break;
        case 102: break;
        case 103: break;
        case 104: break;
        case 105: break;
        //case 190: break;
        //case 110: break;
        default: event.preventDefault();
    }
    if (flag==false){
        var inp = document.getElementById(a);
        var secId = +a.substring(1);
        secId+=12;
        if (inp.value.length>6){
            document.getElementById("b"+secId+"").removeAttribute('disabled');
        }else{
            document.getElementById("b"+secId+"").setAttribute('disabled','disabled');
        }
    }
    var str = document.getElementById(a).value;
    if (str.length==2 && event.keyCode!=8){
        document.getElementById(a).value+='.';
    }
    if (str.length==5 && event.keyCode!=8){
        document.getElementById(a).value+='.';
    }

}
//редактируем тип плановый
function editPlan(a){
    izik = a;
    var clases = document.getElementById(a).getAttribute('class');
    idRep = clases.substring(6);

    if (flagEdit){
        id_vrem = a.substring(1);
        if (yearProv==null){
            yearProv = realYear;
        }
        var count0 = 0;
        for (var i=0; i<12; i++){
            var elemTd = document.getElementById(''+id_vrem+''+i+'');
            var id_key = elemTd.getAttribute('class');
            if (id_key>0){
                var massa = [id_key, count0];
                massiv_ID.push(massa);
                count0++;
            }else{
                var massa = [null, count0];
                massiv_ID.push(massa);
                count0++;
            }

            var buferok = elemTd.innerHTML;
            if (buferok.length>8){
                var jig = true;
            }else if(buferok.length>=5){
                buferok += '.'+yearProv;
            }
            if (elemTd.innerHTML>0 || jig==true){
                var sod = '<input id="b'+i+'" class="inpTab" maxlength="10" onkeydown="inpPoleD(id)"  placeholder="ДД.ММ.ГГГГ" value="'+buferok+'" style="color: green; border: 1px solid green; font-weight:bold;">';
            }else{
                var sod = '<input id="b'+i+'" class="inpTab" maxlength="10" onkeydown="inpPoleD(id)"  placeholder="ДД.ММ.ГГГГ" style="color: green; border: 1px solid green; font-weight:bold;">';
            }
            elemTd.innerHTML = sod;
        }
        flagEdit = false;
        document.getElementById('butInp1').removeAttribute('disabled');
        document.getElementById('butInp').setAttribute('disabled','disabled');

        pervI=0;
        vtorI=12;
        flType = true;
        flType1 = true;
        flag_otp2 = true;
        document.getElementById('butInp1').setAttribute('style', 'border-color:green');
    }
}
//редактируем тип фактический
function editFackt(a){
    izik = a;
    var clases = document.getElementById(a).getAttribute('class');
    idRep = clases.substring(6);

    if (flagEdit){
        id_vrem = a.substring(1);
        if (yearProv==null){
            yearProv = realYear;
        }
        var count0 = 0;
        var  vtorI1 =[];
        for (var i=12; i<24; i++){
            var elemTd = document.getElementById(''+id_vrem+''+i+'');
            var id_key = elemTd.getAttribute('class');
            if (id_key>0){
                var massa = [id_key, count0];
                massiv_ID.push(massa);
                count0++;
                vtorI++;


                var buferok = elemTd.innerHTML;
                if (buferok.length>8){
                    var jig = true;
                }else if(buferok.length>=5){
                    buferok += '.'+yearProv;
                }
                if (elemTd.innerHTML>0 || jig==true){
                    var sod = '<input id="b'+i+'" class="inpTab" maxlength="10" onkeydown="inpPoleD(id)"  placeholder="ДД.ММ.ГГГГ" value="'+buferok+'" style="color: green; border: 1px solid green; font-weight:bold;">';
                    vtorI1.push(i);
                }else{
                    var sod = '<input id="b'+i+'" class="inpTab" maxlength="10" onkeydown="inpPoleD(id)"  placeholder="ДД.ММ.ГГГГ" style="color: green; border: 1px solid green; font-weight:bold;">';
                    vtorI1.push(i);
                }
                elemTd.innerHTML = sod;
            }
        }
    }
    flagEdit = false;
    document.getElementById('butInp1').removeAttribute('disabled');
    document.getElementById('butInp').setAttribute('disabled','disabled');
    document.getElementById('butInp1').setAttribute('style', 'border-color:green');
    pervI=12;
    vtorI = vtorI1;

    flType = false;
    flType1 = false;
    flag_otp2=true;
}

//получаем ответ с сервера по плановым датам
function changeDatePlan(doby){
    var mas_rep = doby[0];
    var godok = null;
    flag1 = true;
    if (flag1){
        if (flType){

            for (var i=pervI; i<vtorI; i++){
                var tel = document.getElementById('b'+i+'');
                var tel1 = tel.parentElement;
                //var buf = tel.value;
                tel1.removeChild(tel);
                //tel1.innerHTML = buf;
                tuk = i;
                id1 = id_vrem+''+tuk;
                //tel1.setAttribute('id',id1);
                flagEdit = true;
                flag_otp2 = false;
                document.getElementById('butInp').removeAttribute('disabled');
            }
        }


        var names = document.getElementById(izik).parentNode;
        var names1 = names.parentNode;

        var dlina = names1.childNodes.length;
        for (var u=0; u<dlina; u++){
            var mit = names1.lastChild;
            names1.removeChild(mit);
        }


        buxa(mas_rep, bu, outCode, true, null);
        document.getElementById('butInp1').removeAttribute('style', 'border-color:green');
    }
}
//по фактическим
function changeDateFackt(doby){

    var mas_rep = doby[0];
    //var id_org1 = oData1[2];
    var godok = null;
    flag1 = true;
    if (flag1){
        if (flType==false){
            for (var i=0; i<vtorI.length; i++){
                var tel = document.getElementById('b'+vtorI[i]+'');
                var tel1 = tel.parentElement;
                //var buf = tel.value;
                tel1.removeChild(tel);
                //tel1.innerHTML = buf;
                tuk = vtorI[i];
                id1 = id_vrem+''+tuk;
                //tel1.setAttribute('id',id1);
                flagEdit = true;
                flag_otp2 = false;
                document.getElementById('butInp').removeAttribute('disabled');
            }

        }


        var names = document.getElementById(izik).parentNode;
        var names1 = names.parentNode;

        var dlina = names1.childNodes.length;
        for (var u=0; u<dlina; u++){
            var mit = names1.lastChild;
            names1.removeChild(mit);
        }


        buxa(mas_rep, bu, outCode, true, null);
        document.getElementById('butInp1').removeAttribute('style', 'border-color:green');
    }
}

//редактируем имя отчёта
function editName(a){
    if (flagName==true){
        var elemNamTd = document.getElementById(a);
        var oldName = elemNamTd.innerHTML;
        var clases = elemNamTd.getAttribute('class');
        idRep = clases.substring(7);
        id2 = "inp"+a;
        sod = '<input id="'+id2+'" class="inpName" value="'+oldName+'" style="">';
        elemNamTd.innerHTML=sod;
        elemNamTd.setAttribute('style','color:green; font-weight:bold; border: 2px solid green;');
        document.getElementById('butInp').setAttribute('disabled','disabled');
        document.getElementById('butInp1').removeAttribute('disabled');
        flagName = false;
    }
    document.getElementById('butInp1').setAttribute('style', 'border-color:green; font-weight:bold; color:green;');
}
//ответ с сервера
function changeNameOtchet(doby){
    if (doby==1){
        alert('Имя сохранено');
        var tel = document.getElementById(id2);
        var tel1 = tel.parentElement;
        var buf = tel.value;
        tel1.removeChild(tel);
        tel1.innerHTML = buf;
        flagName = true;
        document.getElementById('butInp').removeAttribute('disabled');
        document.getElementById('butInp1').removeAttribute('style', 'border-color:green');
        tel1.removeAttribute('style');
    }else{
        alert('Имя не сохранено, обновите страницу');
    }

}

//функции для рассылки
//фукнция отображения и сокрытия полей по клику
function showFields(obj){
    $("#sender_search").hide();
    $("#file_address").hide();
    if ($(obj).val() == "one")
        $("#sender_search").show();
    else if ($(obj).val() == "from_file")
        $("#file_address").show();
    if (obj == "one")
        $("#sender_search").show();
    else if (obj == "from_file")
        $("#file_address").show();
}
// еще одна
function showTemplates(){
    if ($("#select_template").css('display') == "none")
        $("#select_template").show();
    else $("#select_template").hide();
}
// функция проверки наличия мейлов и лс в списке юзеров и компаний
function sender_find() {
    var sender_one = $('input[name="sender_one"]').val(), sender_who = $('select[name="sender_who"]').val(), a = $('#sender_list');
    if (sender_one.trim() == '') {
        return false;
    } else {
        $.post('/tools/sender/proccesing_search.php', {
            sender_one: sender_one,
            sender_who: sender_who,
            // beforeSend: alert('fd'),
        }, function (data) {
            if ( data == 'error' ) return false;
            a.html(data);
        });
    }
}
// функция отправки рассылок
function form_save(action) {
    var form = $('#form_sender'), file = form.attr('action'), str = form.serialize();
    var data = new FormData($('#form_sender')[0]);
    data.append('action', action);
    if (data.get("send_id_subscribe") === null)
        data.set("send_id_subscribe", 0);
    // $('.btn.btn-md').prop('disabled', true);
    var id = data.get("send_id_subscribe");
    var timer = data.get("sender_timer");
    // console.log(data.get("send_id_subscribe")+data.get("sender_text"));
    $.ajax({
        url: file,
        type: 'POST',
        data: data,
        processData: false, // Don't process the files
        contentType: false,// Set content type to false as jQuery will tell the server its a query string request
        beforeSend:  checkStatus(id, timer, action),
        success: function(data, textStatus, jqXHR){
            // console.log("SUCCESS");
            // console.log(data);
            //    $('.btn.btn-md').prop('disabled', false);
            data = JSON.parse(data);
            // console.log(data);
            $("div.sender_result .text_result").html(data.result);
            if ($("div.sender_result .text_result").text() == "Процесс рассылки завершен") {
                $("div.sender_result .progress-bar").css("width", "100%");
                $("div.sender_result .progress-bar").removeClass("progress-bar-primary");
                $("div.sender_result .progress-bar").addClass("progress-bar-success");
                alert($("div.sender_result .text_result").text());
            }
        },
        error: function(jqXHR, textStatus, errorThrown, data){
            console.log("data: " + data + "\n");
            console.log("jqXHR: " + jqXHR + "\n");
            console.log('ERRORS: ' + textStatus + "\n");
        }
    });
}
// ф-ция по заполнению статус бара
function checkStatus(id, timer, action) {
    // console.log('checkStatus ' + action + " " + id);
    // console.log($("div.sender_result .text_result").text());
    // console.log(id+ " " + timer + " " + action);
    if (action == "save") {
        // console.log("сохраняем жи");
        return;
    }
    if (id == undefined){
        // console.log("id неопределено");
        return;
    }
    if (id == 0) {
        // console.log("Зашли в id = 0 checkStatus");
        setTimeout(checkStatusNext.bind(null, id, timer), 1000);
    }
    else {
        $('.btn.btn-md').prop('disabled', true);
        setTimeout(checkStatusNext.bind(null, id, timer), timer*1000);
    }
}
// ее помощница
function checkStatusNext(id, timer) {
    // console.log("checkStatusNext " + id);
    $.ajax({
        url:'/tools/sender/check_proccess.php',
        type: "POST",
        data: {id: id},
        success: function(data, textStatus, jqXHR) {
            var data = JSON.parse(data);
            // console.log(data);
            if (data.status != 1) {
                // alert(data.percent);
                // console.log("Мы в дата-статус != 1, % - " + data.percent);
                if (data.percent == "")
                    return;
                $("input[name='send_id_subscribe']").val(id);
                $("div.sender_result .progress-bar").css("width", data.percent+"%");
                // console.log("Изменили ширину бара, процент - "+data.percent);
                // $("div.sender_result").css("background-image", "linear-gradient(#3c8dbc 0 "+data.percent+"%, #fff 0 100%)");
                checkStatus(data.id, data.timer, "send");
            }
            else {
                // alert("Рассылка завершена");
                // $("div.sender_result .text_result").html("<span style='padding-top: 5px;font-size: 16px; font-weight: 700; color: green;'>Рассылка завершена</span>");
                $("div.sender_result .progress-bar").css("width", data.percent+"%");
            }
        }
    });
}
// отобразить список рассылок
function showSenders(obj) {
    user_id = $("input[name='user_id']").val();
    var content = $(obj).val();
    $.post('/tools/sender/proccesing_list.php', {
        content: content,
        user_id: user_id,
        // beforeSend: alert(user_id),
    }, function (data) {
        console.log(data);
        $("#sender_list_table").html(data);
    });
}
// для профиля
function editMyData(obj) {
    var ul = obj.parentNode.getElementsByTagName('ul')[0];
    // alert(ul);
    ul.innerHTML = "<form type='multipart/form-data' id='twst' name='editDataForm' method='post'><li><input type='text' style='display: none' name='user_id' value='<?php echo $user_id; ?>'><label>Имя: <input value='<?php echo $user_name;?>' name='user_name' type='text'></label></li><li><label>Город: <input value='<?php echo $user_city;?>' name='user_city' type='text'></label></li><li><label>Лицевой счет: <input value='<?php echo $user_ls;?>' name='user_ls' type='text'></label></li><li><label>Номер телефона:<input value='<?php echo $user_phone;?>' name='user_phone' type='tel'></label></li><li><label>Почтовый ящик: <input value='<?php echo $user_mail_private;?>' name='user_mail' type='email'></label></li><input class='btn' type='submit' value='Готово' name='submit_btn'></form>";
    $(".user_data").hide();
    var form = document.getElementById('twst');
    $("#twst").on("submit", function(e) {
        // var $form = $(this);
        // var test = JSON.stringify(form);
        // var formData = new FormData($('#twst')[0]);alert('yo');
        //отмена действия по умолчанию для кнопки submit
        e.preventDefault();
        $.ajax({
            type: $(form).attr('method'),
            url: "/modules/mod_profile/editData.php",
            data: $(form).serialize(),
            success: function(data) {
                // alert(data);
                // console.log(data);
                data = JSON.parse(data);
                console.log(data);

            },
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    });
}
// $('form[name="editUserForm"]').on('submit', function (e) {
//   alert('kek');
// })
//КОНЕЦ ФУНКЦИЙ ДЛЯ ТАБЛИЦЫ АБ УСЛУГ ДЛЯ КЛИЕНТА
//****************************************************************************************************************************


/***********/
/*tabs*/
AttachEvent(window,'load',function(){
    var tocTag='div',tocClass='fl',tabTag='a',contentClass='comp';


    function FindEl(tagName,evt){
        if (!evt && window.event) evt=event;
        if (!evt) return DebugOut("Can't find an event to handle in DLTabSet::SetTab",0);
        var el=evt.currentTarget || evt.srcElement;
        while (el && (!el.tagName || el.tagName.toLowerCase()!=tagName)) el=el.parentNode;
        return el;
    }

    function SetTabActive(tab){
        if (tab.tabTOC.activeTab){
            if (tab.tabTOC.activeTab==tab) return;
            KillClass(tab.tabTOC.activeTab,'active');
            if (tab.tabTOC.activeTab.tabContent) KillClass(tab.tabTOC.activeTab.tabContent,'comp_active');
            //if (tab.tabTOC.activeTab.tabContent) tab.tabTOC.activeTab.tabContent.style.display='';
            if (tab.tabTOC.activeTab.prevTab) KillClass(tab.tabTOC.activeTab.previousTab,'preActive');
            if (tab.tabTOC.activeTab.nextTab) KillClass(tab.tabTOC.activeTab.nextTab,'postActive');
        }
        AddClass(tab.tabTOC.activeTab=tab,'active');
        if (tab.tabContent) AddClass(tab.tabContent,'comp_active');
        //if (tab.tabContent) tab.tabContent.style.display='block';
        if (tab.prevTab) AddClass(tab.prevTab,'preActive');
        if (tab.nextTab) AddClass(tab.nextTab,'postActive');
    }
    function SetTabFromAnchor(evt){
        //setTimeout('document.body.scrollTop='+document.body.scrollTop,1);
        SetTabActive(FindEl('a',evt).semanticTab);
    }


    function Init(){
        window.everyTabThereIsById = {};

        var anchorMatch = /#([a-z][\w.:-]*)$/i,match;
        var activeTabs = [];

        var tocs = document.getElementsByTagName(tocTag);
        for (var i=0,len=tocs.length;i<len;i++){
            var toc = tocs[i];
            if (!HasClass(toc,tocClass)) continue;

            var lastTab;
            var tabs = toc.getElementsByTagName(tabTag);
            for (var j=0,len2=tabs.length;j<len2;j++){
                var tab = tabs[j];
                if (!tab.href || !(match=anchorMatch.exec(tab.href))) continue;
                if (lastTab){
                    tab.prevTab=lastTab;
                    lastTab.nextTab=tab;
                }
                tab.tabTOC=toc;
                everyTabThereIsById[tab.tabID=match[1]]=tab;
                tab.tabContent = document.getElementById(tab.tabID);

                if (HasClass(tab,'active')) activeTabs[activeTabs.length]=tab;

                lastTab=tab;
            }
            AddClass(toc.getElementsByTagName('h5')[0],'firstchild');
        }

        for (var i=0,len=activeTabs.length;i<len;i++){
            SetTabActive(activeTabs[i]);
        }

        for (var i=0,len=document.links.length;i<len;i++){
            var a = document.links[i];
            if (!(match=anchorMatch.exec(a.href))) continue;
            if (a.semanticTab = everyTabThereIsById[match[1]]) AttachEvent(a,'click',SetTabFromAnchor,false);
        }

        if ((match=anchorMatch.exec(location.href)) && (a=everyTabThereIsById[match[1]])) SetTabActive(a);

        //Comment out the next line and include the file directly if you need IE5Mac or Opera7 support.
        AddStyleSheet('http://adaly.ru/wp-content/themes/twentysixteen/style.css',0);
    }
    Init();
},false);
/*end*/

function edit_save(opt, status) {
    var a = $('#' + opt.form + ' button'),
        str = $('#' + opt.form).serialize();

    if(status == 'new_user')
    {
        str = str + '&status=new_user';
    }

    a.addClass('process');
    $.post('http://adaly.ru/wp-content/themes/twentysixteen/ajax.edit.php', str, function (data) {
        a.removeClass('process');
        console.log(data);
        if ( data == 'error' ) alert( 'Ошибка при обработке информации' );
        else eval(data);
        //alert(data);
    });
}


