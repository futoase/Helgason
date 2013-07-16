var url = require("url");

var buster = require("buster")
  , moment = require("moment");

var basicAuth = require(__dirname + "/../../../app/model/basic_auth")
  , setUserSetting = basicAuth.setUserSetting
  , getUserSetting = basicAuth.getUserSetting
  , setUserSettingOfParseQuery = basicAuth.set;

buster.spec.expose();

describe("Set user setting", function () {
  it("bob setting", function () {
    setUserSetting("user", "bob");
    setUserSetting("pass", "bob-password");
    expect(getUserSetting("user")).toEqual("bob");
    expect(getUserSetting("pass")).toEqual("bob-password");
  });

  it("tom setting with not equal.", function () {
    setUserSetting("user", "tom");
    setUserSetting("pass", "tom-password");
    expect(getUserSetting("user")).not.toEqual("tomtom");
    expect(getUserSetting("pass")).not.toEqual("tomtom-password");
  });
});

describe("Set expire date, user and pass.", function () {
  var testQuery = "user=hogehoge&pass=mugamuga";
  var parseTestQuery = url.parse("?" + testQuery, true).query;

  setUserSettingOfParseQuery(parseTestQuery);
 
  var now = moment().format(); 

  expect(getUserSetting("user")).toEqual("hogehoge");
  expect(getUserSetting("pass")).toEqual("mugamuga");
  expect(getUserSetting("date")).toBeGreaterThan(now);
});
