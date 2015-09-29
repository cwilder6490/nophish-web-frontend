/**
 * Application-Adapter
 *
 * @module      :: Adapter
 * @description :: Provides the default application adapter
 */

import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';

var ApplicationAdapter = DS.RESTAdapter.extend({
  host: ENV.APP.backendURL,
  namespace: '',
  //headers: function() {
  //  return {
  //    'API_KEY': ENV.APP.apiKey
  //  };
  //}.property().volatile()
});

var inflector = Ember.Inflector.inflector;
inflector.uncountable('test');
inflector.uncountable('testAnswer');
inflector.uncountable('dashboard');
inflector.uncountable('level');

export default ApplicationAdapter;
