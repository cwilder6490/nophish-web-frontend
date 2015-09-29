/**
 * Test-Question-Component
 *
 * @module      :: Component
 * @description :: Creates a test question
 */

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['test-question'],

  /**
   * Resets component if question changed
   */
  questionChanged: function () {
    this.set('answerIsPhishingWasSet', false);
    this.set('answerHowSureWasSet', false);
    this.set('answerHasAccountAtProviderWasSet', false);
  }.observes('question').on('init'),

  /**
   * Returns if user selected the original option
   */
  answerIsOriginal: function () {
    return (this.get('answerIsPhishingWasSet') && ! this.get('answer.isPhishing'));
  }.property('answerIsPhishingWasSet', 'answer.isPhishing'),

  /**
   * Returns if user selected the phishing option
   */
  answerIsPhishing: function () {
    return (this.get('answerIsPhishingWasSet') && this.get('answer.isPhishing'));
  }.property('answerIsPhishingWasSet', 'answer.isPhishing'),

  /**
   * Returns if user selected the very unsure option
   */
  answerIsHowSure1: function () {
    return (this.get('answerHowSureWasSet') && this.get('answer.howSure') === 1);
  }.property('answerHowSureWasSet', 'answer.howSure'),

  /**
   * Returns if user selected the unsure option
   */
  answerIsHowSure2: function () {
    return (this.get('answerHowSureWasSet') && this.get('answer.howSure') === 2);
  }.property('answerHowSureWasSet', 'answer.howSure'),

  /**
   * Returns if user selected the 'don´t-know' option
   */
  answerIsHowSure3: function () {
    return (this.get('answerHowSureWasSet') && this.get('answer.howSure') === 3);
  }.property('answerHowSureWasSet', 'answer.howSure'),

  /**
   * Returns if user selected the sure option
   */
  answerIsHowSure4: function () {
    return (this.get('answerHowSureWasSet') && this.get('answer.howSure') === 4);
  }.property('answerHowSureWasSet', 'answer.howSure'),

  /**
   * Returns if user selected the ver sure option
   */
  answerIsHowSure5: function () {
    return (this.get('answerHowSureWasSet') && this.get('answer.howSure') === 5);
  }.property('answerHowSureWasSet', 'answer.howSure'),

  /**
   * Returns if user selected the provider option
   */
  answerHasAccountAtProvider: function () {
    return (this.get('answerHasAccountAtProviderWasSet') && this.get('answer.hasAccountAtProvider'));
  }.property('answerHasAccountAtProviderWasSet', 'answer.hasAccountAtProvider'),

  /**
   * Returns if user didn't select the provider option
   */
  answerHasNoAccountAtProvider: function () {
    return (this.get('answerHasAccountAtProviderWasSet') && ! this.get('answer.hasAccountAtProvider'));
  }.property('answerHasAccountAtProviderWasSet', 'answer.hasAccountAtProvider'),

  /**
   * Returns if next button should be disabled and enables it when user set all required options
   */
  isButtonDisabled: function () {
    return ! (this.get('answerIsPhishingWasSet') && this.get('answerHowSureWasSet') && this.get('answerHasAccountAtProviderWasSet'));
  }.property('answerIsPhishingWasSet', 'answerHowSureWasSet', 'answerHasAccountAtProviderWasSet'),

  actions: {
    /**
     * Sets user selected option
     * @param value
     */
    setIsPhishing: function (value) {
      this.set('answer.isPhishing', value);
      this.set('answerIsPhishingWasSet', true);
    },

    /**
     * Sets user selected option
     * @param value
     */
    setHowSure: function (value) {
      this.set('answer.howSure', value);
      this.set('answerHowSureWasSet', true);
    },

    /**
     * Sets user selected option
     * @param value
     */
    setHasAccountAtProvider: function (value) {
      this.set('answer.hasAccountAtProvider', value);
      this.set('answerHasAccountAtProviderWasSet', true);
    },

    /**
     * Notifies subscribers that the next question should be shown
     * Scrolls viewport up
     */
    showNextQuestion: function () {
      this.sendAction('showNextQuestion');
      Ember.$('html, body').animate({
        scrollTop: Ember.$(".test-question").first().offset().top
      }, 500);
    },

    /**
     * Notifies subscribers that last question is done
     */
    finishedLastQuestion: function () {
      this.sendAction('finishedLastQuestion');
    }
  }
});
