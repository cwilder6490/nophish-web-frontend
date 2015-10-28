import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('dashboard');
  this.route('register', function() {
    this.route('things');
    this.route('standard');
  });
  this.route('pretest');
  this.route('posttest');
  this.route('retentiontest');
  this.resource('confirm', { path: '/confirm-email/:token' });
  this.route('settings');
  this.resource('level', { path: '/level/:id' });

  this.route('finished-all-levels');
  this.route('password-forgotten');
  this.route('reset-password', { path: '/reset-password/:token' });
  this.route('certificate');
  this.route('imprint');
  this.route('contact');
});

export default Router;
