/*global module*/
module.exports = function (grunt) {
    'use strict';

    // mocha task
    var gruntConfig = {};
    grunt.loadNpmTasks('grunt-mocha');
    gruntConfig.mocha = {
        options: {
            bail: true,
            log: true
        },
        index: [ 'test/index.html' ]
    };

    grunt.initConfig(gruntConfig);
    grunt.registerTask('default', [ 'mocha' ]);
};
