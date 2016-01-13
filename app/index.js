'use strict';
var chalk = require('chalk');
var superb = require('superb');
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.blue('React Component') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What would you like to call this component?',
        default: this.appname.replace(/\s/g, '-'),
        filter: function(val) {
          return _s.slugify(val);
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your component',
        default: 'My ' + superb() + ' service.'
      },
      {
        name: 'githubUsername',
        message: 'What is the GitHub username?',
        store: true,
        validate: function(val) {
          return val.length > 0 ? true : 'You have to provide a username';
        }
      }
    ];

    this.prompt(prompts, function (props) {
      props.name = this.user.git.name();
      props.email = this.user.git.email();
      props.camelComponentName = _s.camelize(props.componentName);
      props.classComponentName = _s.classify(props.componentName);
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },
  writing: {
    templatedFiles: function() {
      this.template('_package.json', 'package.json', this.props);
      this.template('_README.md', 'README.md', this.props);
      this.template('build/_buildLibrary.js', 'build/buildLibrary.js', this.props);
      this.template('src/_component.js', 'src/' + this.props.camelComponentName + '.js', this.props, {
        // Prevent templating of ecmascript6 {} deconstruction syntax as template vars.
        interpolate: /<%=([\s\S]+?)%>/g
      });
      this.template('src/_component.test.js', 'src/' + this.props.camelComponentName + '.test.js', this.props, {
        // Prevent templating of ecmascript6 {} deconstruction syntax as template vars.
        interpolate: /<%=([\s\S]+?)%>/g
      });
    },
    devFiles: function() {
      this.directory('src/test','src/test');
    },
    configFiles: function() {
      this.copy('gitignore', '.gitignore');
      this.copy('travis.yml', '.travis.yml');
      this.copy('webpack.config.js', 'webpack.config.js');
    }
  },
	install: function() {
		this.installDependencies({bower: false});
	}
});
