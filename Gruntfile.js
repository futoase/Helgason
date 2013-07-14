'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    concat: {
      js: {
        src: [
          'source/javascript/app.js'
        ],
        dest: 'public/javascript/app.js'
      }
    }
  });
};
