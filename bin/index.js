#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');
var vder = require('../src/vder');

var conf = {
  port: 8087,
  rootDir: process.cwd(),
};

program
  .option('-p, --port <number>', 'set port', function(val) {
    conf.port = val;
  })
  .option('-r, --root <path>', 'set root dir', function(_path) {
    const rootPath = path.resolve(_path);
    if (fs.existsSync(rootPath)) {
      conf.rootDir = rootPath;
    } else {
      console.error(['unvalid path: ', _path].join(''));
    }
  })
  .parse(process.argv);

vder.init(conf);
