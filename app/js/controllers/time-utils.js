'use strict'

var exports = module.exports = {};

// Creates a JS Date that has the same value as the momentDate. That is a workaround the fact
// that JS Date is always in the current time zone.
exports.toDate = function(momentDate, hour) {
  var d = new Date(momentDate.tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + moment().format('Z'));
  return new Date(d.setHours(hour ? hour : momentDate.hours()));
}

// Calculates the millis of the passed js Date as if it was in UTC date. Strips out the timezone 
// information to workaround the fact that js Date is always in the current timezone.
exports.toMillisUTC = function(jsDate) {
  var format = moment(jsDate).format();
  var noTimezone = format.substring(0, format.length - 6) + 'Z';
  return moment(noTimezone).valueOf();
}

