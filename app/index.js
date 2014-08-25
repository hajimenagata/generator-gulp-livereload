'use strict';
var util   = require('util');
var path   = require('path');
var chalk  = require('chalk');
var yeoman = require('yeoman-generator');

var greeting = chalk.cyan('\n--------------------------------------') +
                  chalk.cyan('\ngulp-livereload') +
                  chalk.cyan('\n--------------------------------------');

var MyGenerator = module.exports = function MyGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MyGenerator, yeoman.generators.Base);

MyGenerator.prototype.askFor = function askFor() {

  var cb = this.async();

  console.log(this.yeoman);
  console.log(greeting);

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Bootstrap',
      value: 'includeBootstrap',
      checked: true
    },{
      name: 'jQuery(v2.1.1)',
      value: 'includeJQuery',
      checked: false
    },{
      name: 'Modernizr(v2.8.2)',
      value: 'includeModernizr',
      checked: false
    }]
  }];

  this.prompt(prompts, function (props) {
    this.appname = props.appname;
    var features = props.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.includeJQuery = hasFeature('includeJQuery');
    this.includeBootstrap = hasFeature('includeBootstrap');
    this.includeModernizr = hasFeature('includeModernizr');

    cb();
  }.bind(this));

};

MyGenerator.prototype.app = function app() {

    this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');

    this.template('_index.html', 'app/index.html');
    this.template('main.js', 'app/scripts/main.js');
    this.template('styles.css', 'app/styles/styles.css');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

MyGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

MyGenerator.prototype.gulpfile = function gulpfile() {
    this.template('gulpfile.js');
};
