'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    concat: {
      js: {
        src: [
          'source/javascript/host_info.js',
          'source/javascript/socket_io_resource.js',
          'source/javascript/socket_events.js',
          'source/javascript/init.js'
        ],
        dest: 'public/javascript/app.js'
      }
    },
    uglify: {
      app: {
        files: {
          'public/javascript/app.min.js': [ 'public/javascript/app.js' ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
