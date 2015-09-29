/**
 * Pre-Test-Controller
 *
 * @module      :: Controller
 * @description :: Manages the pre test
 */

import Ember from 'ember';
import ENV from '../config/environment';
import TestAnswer from '../models/test-answer';

export default Ember.Controller.extend({
  needs: ['application'],

  showStartDialog: true,
  showPreTestQuestions: false,
  showEndDialog: false,

  /**
   * Returns a shuffled array of the test questions
   */
  shuffledQuestions: function () {
    let shuffled =  this.shuffle(this.get('model.questions.canonicalState'));
    let testId = this.get('model.id');
    let answers = Ember.A(shuffled.map(function(question){
      return TestAnswer.create({
        test: testId,
        question: question.get('id'),
        isPhishing: true,
        howSure: 1,
        hasAccountAtProvider: false,
        argumentation: ''
      });
    }));
    this.set('answers', answers);
    return shuffled;
  }.property('model'),

  /**
   * Binds controller to window for testing
   */
  init: function () {
    window.preTest = this;
  }.on('init'),

  /**
   * (Helper-Function) Returns a shuffled array from a given array
   * @param o
   * @returns {*}
   */
  shuffle: function(o){
    // empty body is a js lint fix
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
    return o;
  },

  actions: {
    /**
     * Resets the controller
     */
    resetController: function () {
      this.set('showStartDialog', true);
      this.set('showPreTestQuestions', false);
      this.set('showEndDialog', false);
    },

    /**
     * Hides the start dialog and shows the questions
     */
    continuePreTest: function () {
      this.set('showStartDialog', false);
      this.set('showPreTestQuestions', true);
      this.set('showEndDialog', false);
    },

    /**
     * Skips the pre test and transitions to the dashboard
     */
    skipPreTest: function () {
      var defer = Ember.RSVP.defer();

      defer.promise.then(function(){
          this.transitionTo('dashboard');
          this.send('resetController');
        }.bind(this),
        function(err){
          alert(err);
        });

      this.get('controllers.application.userController').send('skippedPreTest', defer);
    },

    /**
     * (Debug) Sets all answers correct
     */
    solve: function () {
      this.get('answers').forEach(function(answer){
        let returnAnswer = answer.toJSON();
        let questionIsPhishing = this.get('model.questions').filterBy('id', returnAnswer.question).get('firstObject.isPhishing') === 'true';
        answer.set('isPhishing', questionIsPhishing);
        answer.set('howSure', 5);
      }.bind(this));
      window.alert('Solved');
    },

    /**
     * Submits the test and shows the end dialog on success
     */
    submitPreTest: function () {
      let correctAnswers = 0;
      let totalAnswers = 0;
      let preTestAnswers = this.get('answers').map(function(answer){
        let returnAnswer = answer.toJSON();
        totalAnswers++;
        let questionIsPhishing = this.get('model.questions').filterBy('id', returnAnswer.question).get('firstObject.isPhishing') === 'true';
        if(returnAnswer.isPhishing === questionIsPhishing){
          correctAnswers++;
        }
        return returnAnswer;
      }.bind(this));

      Ember.$.post(ENV.APP.backendURL + '/pretest/finish', {preTestAnswers: preTestAnswers, correctAnswers: correctAnswers, totalAnswers: totalAnswers}).done(function (result) {
        var defer = Ember.RSVP.defer();

        defer.promise.then(function(){
            this.set('showStartDialog', false);
            this.set('showPreTestQuestions', false);
            this.set('showEndDialog', true);
          }.bind(this),
          function(err){
            alert(err); // TODO
          });

        if(result.unlockedLevels !== undefined){
          let unlockedLevels = Ember.A();
          result.unlockedLevels.forEach(l => {
            unlockedLevels.pushObject(Ember.Object.create(l));
          });
          this.set('unlockedLevels', unlockedLevels);
        }
        this.get('controllers.application.userController').send('createUser', result.user, defer);
      }.bind(this))
      .fail(function (data) {
        console.log('Error', data);
        alert('Error', data);
      });
    },

    /**
     * Simulates a click on a checkbox with given id
     * @param id
     */
    clickCheckbox: function (id) {
      Ember.$('input[name=' + id + ']').click();
    },

    /**
     * Sets the how-sure value
     * @param answer
     * @param howSure
     */
    setHowSure: function (answer, howSure){
      answer.set('howSure', howSure);
    },

    /**
     * Transitions to dashboard and shows success message
     */
    toDashboard: function () {
      this.transitionTo('dashboard').then(function () {
        this.get('flashMessages').add({
          message: 'Vortest erfolgreich abgeschlossen!',
          type: 'success',
          sticky: true
        });
        this.send('resetController');
      }.bind(this));
    }
  }
});
