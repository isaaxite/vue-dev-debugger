var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var server = {
  rootDir: './',
  init: function(options) {
    var server = http.createServer(function (request, response) {
      var data = '';
      var respMsg = '';
      var urlInfo = url.parse(request.url);
      this.rootDir = options.rootDir || './';
      var filePath = path.join(this.rootDir, urlInfo.pathname);
      var headers = {};


      if (fs.existsSync(filePath)) {
        try {
          if (filePath.endsWith('.js')) {
            headers['charset'] = 'UTF-8';
            headers['Content-Type'] = 'application/javascript';
          } else {
            headers['charset'] = 'UTF-8';
            headers['Content-Type'] = 'text/html';
          }
          
          response.writeHead(200, headers);
          data = fs.readFileSync(filePath, { encoding: 'utf8' });
          response.write(data);
        } catch (error) {
          response.writeHead(404, {'Content-Type': 'text/html'});
          respMsg = error.message;
        }
      } else {
        respMsg = ['file', '(', filePath, ')', ' is not exist!'].join('');
      }
      
      response.end(respMsg);
    });

    return server;
  }
};

module.exports = server;