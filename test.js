'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('generator', function () {
  beforeEach(function (cb) {
    var deps = ['../app'];

    helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
      if (err) {
        cb(err);
        return;
      }

      this.generator = helpers.createGenerator('react-nack', deps, null, {skipInstall: true});
      cb();
    }.bind(this));
  });

  it('generates expected files', function (cb) {
    var expected = [
      '.gitignore',
      '.travis.yml',
      'build/buildLibrary.js',
      'src/myTestComponent.js',
      'src/myTestComponent.test.js',
      'src/test/jsdomHelper.js',
      'package.json',
      'README.md',
      'webpack.config.js'
    ];

    helpers.mockPrompt(this.generator, {
      componentName: 'my-test-component',
      githubUsername: 'test',
      description: 'test'
    });

    this.generator.run(function () {
      assert.file(expected);
      cb();
    });
  });
});
