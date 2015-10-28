/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'nophish-frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      backendURL: (environment === 'production') ? 'https://api.nophish-web.secuso.org' : 'http://localhost:1337',
      apiKey: 'v1'
    },

    flashMessageDefaults: {
      timeout            : 5000,
      priority           : 200,
      sticky             : false,
      showProgress       : true,
      type               : 'success',
      types              : [ 'success', 'info', 'warning', 'danger'],
      injectionFactories : [ 'route', 'controller', 'view', 'component' ]
    },

    i18n: {
      defaultLocale: 'de'
    }
  };

  ENV['contentSecurityPolicy'] = {
    'default-src': "'none' " + ENV.APP.backendURL,
    'script-src': "'self' 'unsafe-inline' " + ENV.APP.backendURL,
    'font-src': "'self' " + ENV.APP.backendURL,
    'connect-src': "'self' " + ENV.APP.backendURL,
    'img-src': "'self' data: " + ENV.APP.backendURL,
    'style-src': "'self' 'unsafe-inline' " + ENV.APP.backendURL,
    'media-src': "'self' " + ENV.APP.backendURL
  };

  ENV['simple-auth'] = {
    crossOriginWhitelist: [ENV.APP.backendURL],
    authenticationRoute : 'login',
    routeAfterAuthentication: 'dashboard',
    routeIfAlreadyAuthenticated : 'dashboard',
    authorizer: 'simple-auth-authorizer:token'
  };

  ENV['simple-auth-token'] = {
    serverTokenEndpoint: ENV.APP.backendURL + '/auth/login',
    serverTokenRefreshEndpoint: ENV.APP.backendURL + '/user/jwt/',
    identificationField: 'email',
    passwordField: 'password',
    tokenPropertyName: 'token',
    authorizationPrefix: 'Bearer ',
    authorizationHeaderName: 'Authorization',
    headers: {},
    refreshAccessTokens: true,
    timeFactor: 1,
    refreshLeeway: 300
  };

  if (environment === 'development') {
     //ENV.APP.LOG_RESOLVER = true;
     //ENV.APP.LOG_ACTIVE_GENERATION = true;
     //ENV.APP.LOG_TRANSITIONS = true;
     //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
     //ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
