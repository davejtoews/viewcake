require('babel-core/register');

var app = require('./app').default;
var port = app.get('port');
var server = app.listen(port);
var feathers = require('feathers-client');

server.on('listening', function() {
  console.log(`Feathers application started on ${app.get('host')}:${port}`);
});
