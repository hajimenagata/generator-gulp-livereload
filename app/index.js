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

  var prompts = [];

  this.prompt(prompts, function (props) {
    this.appname = props.appname;
    var features = props.features;
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
