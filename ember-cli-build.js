var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var EmberApp = require('ember-cli/lib/broccoli/ember-app');

  var app = new EmberApp({
    dotEnv: {
      clientAllowedKeys: ['BACKEND_URL']
    },
    autoprefixer: {
      browsers: ['last 2 version']
    },
    fingerprint: {
      exclude: ['images/browser']
    }
  });

  app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js');
  app.import('bower_components/imagesloaded/imagesloaded.pkgd.min.js');
  return app.toTree();
};
