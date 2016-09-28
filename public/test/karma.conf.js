// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-11-08 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'libs/es5-shim/es5-shim.js',
      'libs/jquery/dist/jquery.js',
      'libs/angular/angular.js',
      'libs/angular-animate/angular-animate.js',
      'libs/angular-bootstrap/ui-bootstrap-tpls.js',
      'libs/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
      'libs/angular-loading-bar/build/loading-bar.js',
      'libs/angular-touch/angular-touch.js',
      'libs/bootstrap/dist/js/bootstrap.js',
      'libs/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
      'libs/angular-cookies/angular-cookies.js',
      'libs/angular-sanitize/angular-sanitize.js',
      'libs/angular-counter/counter.js',
      'libs/moment/moment.js',
      'libs/bootstrap-daterangepicker/daterangepicker.js',
      'libs/angular-daterangepicker/js/angular-daterangepicker.js',
      'libs/angular-facebook/lib/angular-facebook.js',
      'libs/angular-file-upload/angular-file-upload.min.js',
      'libs/flexslider/jquery.flexslider.js',
      'libs/angular-flexslider/angular-flexslider.js',
      'libs/angular-google-places-autocomplete/src/autocomplete.js',
      'libs/angular-google-places-autocomplete/dist/autocomplete.min.js',
      'libs/angular-hmac-sha512/angular-hmac-sha512.js',
      'libs/intro.js/intro.js',
      'libs/angular-intro.js/src/angular-intro.js',
      'libs/angular-route/angular-route.js',
      'libs/slick-carousel/slick/slick.min.js',
      'libs/angular-slick/dist/slick.js',
      'libs/angular-social-links/angular-social-links.js',
      'libs/spin.js/spin.js',
      'libs/angular-spinner/angular-spinner.js',
      'libs/sweetalert/lib/sweet-alert.js',
      'libs/angular-sweetalert/SweetAlert.js',
      'libs/angular-ui-router/release/angular-ui-router.js',
      'libs/angularjs-socialshare/dist/angular-socialshare.min.js',
      'libs/bootstrap-lightbox/docs/assets/js/bootstrap-lightbox.js',
      'libs/Jcrop/js/Jcrop.js',
      'libs/js-xlsx/dist/xlsx.js',
      'libs/angular-messages/angular-messages.js',
      'libs/ng-fab-form/dist/ng-fab-form.js',
      'libs/ng-file-upload/ng-file-upload.js',
      'libs/json3/lib/json3.js',
      'libs/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'libs/lodash/lodash.js',
      'libs/ng-password-strength/dist/scripts/ng-password-strength.js',
      'libs/ng-table/dist/ng-table.min.js',
      'libs/ng-tags-input/ng-tags-input.min.js',
      'libs/ng-videosharing-embed/build/ng-videosharing-embed.min.js',
      'libs/ngDialog/js/ngDialog.js',
      'libs/ngGAPI/gapi.js',
      'libs/ngLinkedIn/ngLinkedIn.js',
      'libs/nsPopover/src/nsPopover.js',
      'libs/rangy/rangy-core.js',
      'libs/rangy/rangy-classapplier.js',
      'libs/rangy/rangy-highlighter.js',
      'libs/rangy/rangy-selectionsaverestore.js',
      'libs/rangy/rangy-serializer.js',
      'libs/rangy/rangy-textrange.js',
      'libs/textAngular/src/textAngular.js',
      'libs/textAngular/src/textAngular-sanitize.js',
      'libs/textAngular/src/textAngularSetup.js',
      'libs/toastr/toastr.js',
      'libs/whatsapp-sharing/dist/whatsapp-button.js',
      'libs/angular-payments/lib/angular-payments.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
