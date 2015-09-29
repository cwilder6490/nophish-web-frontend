/**
 * Test-Component
 *
 * @module      :: Component
 * @description :: Creates the test wrapper
 */

import Ember from 'ember';

export default Ember.Component.extend({
  currentQuestionIndex: 0,

  /**
   * Returns current question by index
   */
  currentQuestion: function () {
    Ember.$(window).resize();
    return this.get('shuffledQuestions').objectAt(this.get('currentQuestionIndex'));
  }.property('currentQuestionIndex'),

  /**
   * Returns current answer by question
   */
  currentAnswer: function () {
    let self = this;
    return self.get('answers').filterBy('question', self.get('currentQuestion.id'))[0];
  }.property('currentQuestion', 'answers'),

  /**
   * Returns the incremented index
   */
  currentQuestionNumber: function () {
    return this.get('currentQuestionIndex') + 1;
  }.property('currentQuestionIndex'),

  /**
   * Returns a bool which shows if the current question is the last one
   */
  currentQuestionIsLastQuestion: function () {
    return this.get('currentQuestionIndex') === (this.get('shuffledQuestions.length') - 1);
  }.property('currentQuestionIndex', 'shuffledQuestions.length'),

  actions: {
    /**
     * Increments current question index
     */
    showNextQuestion: function () {
      this.set('currentQuestionIndex', this.get('currentQuestionIndex') + 1);
    },

    /**
     * Notifies subscribers that the last question has been done
     */
    finishedLastQuestion: function () {
      this.sendAction('didAllQuestions');
    }
  }
});
