/**
 * Certificate-Controller
 *
 * @module      :: Controller
 * @description :: Manages certification requests
 */

import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  actions: {
    /**
     * Requests certificate by calling backend and showing the user a flashmessage
     */
    requestCertificate: function () {
      let name = this.get('name');
      this.set('isProcessingInput', true);
      Ember.$.post(ENV.APP.backendURL + '/user/requestCertificate', {name: name})
        .done(function () {
          this.get('flashMessages').add({
            message: 'Zertifikat angefordert!',
            type: 'success',
            sticky: true
          });
        }.bind(this))
        .fail(function () {
          alert('Error');
        })
        .always(function () {
          this.set('isProcessingInput', false);
        }.bind(this));
    }
  }
});
