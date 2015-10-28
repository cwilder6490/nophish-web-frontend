/**
 * Post-Test-Controller
 *
 * @module      :: Controller
 * @description :: Manages the post test
 */

import Ember from 'ember';
import ENV from '../config/environment';
import TestAnswer from '../models/test-answer';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  needs: ['application'],
  i18n: Ember.inject.service(),

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
    window.postTest = this;
  }.on('init'),

  /**
   * (Helper-Function) Returns a shuffled array from a given array
   * @param o
   * @returns {*}
   */
  shuffle: function(o){
    // empty body is a js lint fix
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
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

      let points = 0;

      let answers = this.get('answers').map(function(answer){
        let returnAnswer = answer.toJSON();
        totalAnswers++;
        let questionIsPhishing = this.get('model.questions').filterBy('id', returnAnswer.question).get('firstObject.isPhishing') === 'true';
        if(returnAnswer.isPhishing === questionIsPhishing){
          correctAnswers++;
          points += 100 * returnAnswer.howSure / 5;
        }
        return returnAnswer;
      }.bind(this));

      let maxPoints = totalAnswers * 100;
      this.setProperties({
        lessThan75Percent: false,
        lessThan90Percent: false,
        greaterThan90Percent: false,
        result100Percent: false
      });
      let percentageRight = points / maxPoints;

      if(percentageRight < .75){
        this.set('lessThan75Percent', true);
      }
      else if(percentageRight < .90){
        this.set('lessThan90Percent', true);
      }
      else if(percentageRight === 1){
        this.set('result100Percent', true);
      }
      else{
        this.set('greaterThan90Percent', true);
      }
      console.log(points, maxPoints, correctAnswers, totalAnswers);

      Ember.$.post(ENV.APP.backendURL + '/test/finishPostTest', {answers: answers, correctAnswers: correctAnswers, totalAnswers: totalAnswers}).done(function (data) {
        if(data.success === true){
          let defer = Ember.RSVP.defer();

          defer.promise.then(function(){
              this.set('showStartDialog', false);
              this.set('showPreTestQuestions', false);
              this.set('showEndDialog', true);
            }.bind(this),
            function(err){
              console.log('Error', err);
              alert('Error');
            });

          let failedLevels = Ember.A();
          this.get('answers').forEach(answer => {
            let question = this.get('model.questions').filterBy('id', answer.get('question')).get('firstObject');
            let questionIsPhishing = question.get('isPhishing') === 'true';
            if(answer.get('isPhishing') !== questionIsPhishing && typeof(question.get('belongsToLevel')) === 'string'){
              let level = data.levels.filter(lvl => {return lvl.id === question.get('belongsToLevel')})[0];
              if(failedLevels.every(lvl => lvl.get('id') !== level.id)){
                failedLevels.pushObject(Ember.Object.create(level));
              }
            }
          });
          failedLevels.sortBy('name');
          this.set('failedLevels', failedLevels);

          this.get('controllers.application.userController').send('createUser', data.user, defer);
        }
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
     * Transitions to dashboard
     */
    toDashboard: function () {
      this.transitionTo('dashboard');
    }
  }
});
