import { join } from 'path';
import { static as serveStatic } from 'feathers';
import favicon from 'serve-favicon';
import compress from 'compression';
import cors from 'cors';
import feathers from 'feathers';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import bodyParser from 'body-parser';
import socketio from 'feathers-socketio';
import feathersAuth from 'feathers-authentication';
import middleware from './middleware';
import services from './services';
import exphbs from 'express-handlebars';

let app = feathers();

function countSockets() {
  return Object.keys(app.io.sockets.sockets).length;
}

var slidePos;

app.configure(configuration(join(__dirname, '..')))
  .use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon( join(app.get('public'), 'favicon.ico') ))
  .use('/public', serveStatic(app.get('public')))
  .engine('handlebars', exphbs({defaultLayout: 'main'}))
  .set('view engine', 'handlebars')
  .get('/', function (req, res) {
    if(req.headers.host == "data.sitesol.ca") {
      app.service('api/presentations').find({query: { name: 'data-arch'}}).then(function(results) {
        var presentationId  = results.data[0]._id;
        res.render('viewer', { presentationId: presentationId });
      });      
    } else {
      app.service('api/configs').find({query: { name: 'default_presentation'}}).then(function(results) {
        var defaultPresentationId = results.data[0].value;
        res.render('viewer', { presentationId: defaultPresentationId });
      });
    }
  })
  .get('/thecall', function (req, res) {
    res.render('thecall', {presentationId: 0});
  })
  .get('/:presentation', function (req, res) {
    app.service('api/presentations').find({query: { name: req.params.presentation}}).then(function(results) {
      var presentationId  = results.data[0]._id;
      res.render('viewer', { presentationId: presentationId });
    });
  })
  .get('/:presentation/presenter', function (req, res) {
    app.service('api/presentations').find({query: { name: req.params.presentation}}).then(function(results) {
      var presentationId  = results.data[0]._id;
      res.render('presenter', { presentationId: presentationId });
    });
  })
  .get('/:presentation/stagehand', function (req, res) {
    app.service('api/presentations').find({query: { name: req.params.presentation}}).then(function(results) {
      var presentationId  = results.data[0]._id;
      res.render('stagehand', { presentationId: presentationId });
    });
  })
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio(function(io) {
    io.on('connection', function(socket) {
      socket.emit("message", "Welcome to Viewcake");
      socket.broadcast.emit("socketcount", countSockets());
      socket.on("slidechanged", function(data){
        slidePos = data;
        socket.broadcast.emit("slidechanged", data);
      });
      socket.on("pollAnswered", function(data){
        socket.broadcast.emit("pollAnswered", data);
      });
      socket.on('disconnect', function () {
        socket.broadcast.emit("socketcount", countSockets());
      });
      socket.on('forceReload', function () {
        slidePos = {};
        socket.broadcast.emit("forceReload");
      });
      socket.on('forceReloadPres', function () {
        slidePos = {};
        socket.broadcast.emit("forceReloadPres");
      });
      socket.on('requestPosition', function () {
        console.log(slidePos);
        socket.emit("slidechanged", slidePos);
      });
    });
  }))
  .configure(feathersAuth(app.get('auth').local))
  .configure(services)
  .configure(middleware);

export default app;
