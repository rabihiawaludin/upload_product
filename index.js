var http = require('http');
var app = require('./app');
var port = '8080';
var hostname = '0.0.0.0';

var server = http.createServer(app);

server.listen(port, hostname, function(){
    console.log('Server listening on port ' + port);
});
