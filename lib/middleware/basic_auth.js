var moment = require('moment')
  , express = require('express');

var basicAuth = require(__dirname + '/../../app/model/basic_auth')
  , getAuthUserSetting = basicAuth.getAuthUserSetting
  , getUserSetting = basicAuth.getUserSetting
  , setUserSetting = basicAuth.setUserSetting;

exports.admin = express.basicAuth(function (user, pass) {
  return (
    user == getAuthUserSetting('user') && 
    pass == getAuthUserSetting('pass')
  );
});

exports.user = express.basicAuth(function(user, pass) {
  var now = moment().format();
  return (
    user == getUserSetting('user') &&  
    pass == getUserSetting('pass') &&
    now <= getUserSetting('date')
  );
});
