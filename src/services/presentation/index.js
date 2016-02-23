import service from 'feathers-mongoose';
import presentation from './presentation-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: presentation,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/presentations', service(options));

  // Get our initialize service to that we can bind hooks
  const presentationService = app.service('/api/presentations');

  // Set up our before hooks
  presentationService.before(hooks.before);

  // Set up our after hooks
  presentationService.after(hooks.after);
}
