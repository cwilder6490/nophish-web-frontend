import DS from 'ember-data';

let getDate = function (date){
  let dateObj = new Date(date);
  let dateString = dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear();
  return dateString;
};

export default DS.Model.extend({
  yearOfBirth: DS.attr('number'),
  sex: DS.attr('string'),
  addressFormal: DS.attr('boolean'),

  usedDesktopBrowser: DS.attr('string'),
  usedMailClient: DS.attr('string'),

  emailConfirmed: DS.attr('boolean'),
  hasToBeConfirmed: DS.attr('boolean'),
  hasToDoPretest: DS.attr('boolean'),

  preTestSkipped: DS.attr('boolean'),
  preTestDone: DS.attr('boolean'),
  preTestDoneAt: DS.attr('date'),
  preTestCorrectAnswers: DS.attr('number'),
  preTestTotalAnswers: DS.attr('number'),

  postTestUnlocked: DS.attr('boolean'),
  postTestDone: DS.attr('boolean'),
  postTestDoneAt: DS.attr('date'),
  postTestCorrectAnswers: DS.attr('number'),
  postTestTotalAnswers: DS.attr('number'),

  certificateUnlocked: DS.attr('boolean'),

  retentionTestUnlocked: DS.attr('boolean'),
  retentionTestDone: DS.attr('boolean'),
  retentionTestDoneAt: DS.attr('date'),
  retentionTestCorrectAnswers: DS.attr('number'),
  retentionTestTotalAnswers: DS.attr('number'),
  retentionTestRepeatDate: DS.attr('date'),

  getBrowserType: function () {
    return this.get('usedDesktopBrowser') === 'undefined' ? 'chrome' : this.get('usedDesktopBrowser');
  }.property('usedDesktopBrowser'),

  preTestDoneAtDate: function () {
    return this.get('preTestDoneAt') ? getDate(this.get('preTestDoneAt')) : this.get('preTestDoneAt');
  }.property('preTestDoneAt'),

  postTestDoneAtDate: function () {
    return this.get('postTestDoneAt') ? getDate(this.get('postTestDoneAt')) : this.get('postTestDoneAt');
  }.property('postTestDoneAt'),

  retentionTestDoneAtDate: function () {
    return this.get('retentionTestDoneAt') ? getDate(this.get('retentionTestDoneAt')) : this.get('retentionTestDoneAt');
  }.property('retentionTestDoneAt')
});
