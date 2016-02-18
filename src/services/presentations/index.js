import service from 'feathers-mongoose';
import presentations from './presentations-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: presentations,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/presentations', service(options));

  // Get our initialize service to that we can bind hooks
  const presentationsService = app.service('/presentations');

  // Set up our before hooks
  presentationsService.before(hooks.before);

  // Set up our after hooks
  presentationsService.after(hooks.after);
}
