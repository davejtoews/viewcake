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

app.configure(configuration(join(__dirname, '..')))
  .use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon( join(app.get('public'), 'favicon.ico') ))
  .use('/public', serveStatic(app.get('public')))
  .engine('handlebars', exphbs({defaultLayout: 'main'}))
  .set('view engine', 'handlebars')
  .get('/', function (req, res) {
    res.render('viewer');
  })  
  .get('/master', function (req, res) {
    res.render('master');
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
        socket.broadcast.emit("slidechanged", data);
      });
      socket.on('disconnect', function () {
        socket.broadcast.emit("socketcount", countSockets());
      });
    });
  }))
  .configure(feathersAuth(app.get('auth').local))
  .configure(services)
  .configure(middleware);

export default app;
