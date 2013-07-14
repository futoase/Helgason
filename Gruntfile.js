'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    concat: {
      js: {
        src: [
          'source/javascript/front_env.js',
          'source/javascript/init_socket_io.js',
          'source/javascript/post_message.js',
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
