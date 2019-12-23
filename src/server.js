var fs = require('fs');
var url = require('url');
var mime = require('mime');
var path = require('path');
var http = require('http');

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
          var parsedPath = path.parse(filePath);
          var contentType = mime.getType(parsedPath.ext);
          headers['charset'] = 'UTF-8';
          headers['Content-Type'] = contentType;

          if (!headers['Content-Type']) {
            throw new Error('Illegal file extension!');
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