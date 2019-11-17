var Server = require('./server');

module.exports.init = function(options) {
  Server.init({
    rootDir: options.rootDir
  }).listen(options.port);

  console.log([
    `root dir: ${options.rootDir}`,
    `Server running at http://127.0.0.1:${options.port}/`
  ].join('\n'));
};
