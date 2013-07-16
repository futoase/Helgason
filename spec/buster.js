var config = module.exports;

config["Helgason tests"] = {
  rootPath: "../",
  environment: "node",
  sources: [
    "lib/*.js",
    "lib/**/*.js"
  ],
  tests: [
    "test/app/model/*-test.js"
  ]
};
