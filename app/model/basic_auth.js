var moment = require('moment');

var appSetting = require(__dirname + '/../../setting')
  , appOption = appSetting.option
  , basicAuthSetting = appSetting.basicAuth
  , userSetting = {};

function getAuthUserSetting(key) {
  return basicAuthSetting[key];
}
exports.getAuthUserSetting = getAuthUserSetting;

function getUserSetting(key) {
  return userSetting[key];
};
exports.getUserSetting = getUserSetting;

function setUserSetting(key, value) {
  userSetting[key] = value;
};
exports.setUserSetting = setUserSetting;

exports.set = function (parseQuery) {
  setUserSetting('date', moment().add(
    'seconds', appOption.availableSeconds
  ).format());
  setUserSetting('user', parseQuery.user);
  setUserSetting('pass', parseQuery.pass);
};
