import service from 'feathers-mongoose';
import config from './config-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: config,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('api/configs', service(options));

  // Get our initialize service to that we can bind hooks
  const configService = app.service('api/configs');

  // Set up our before hooks
  configService.before(hooks.before);

  // Set up our after hooks
  configService.after(hooks.after);
}
