import service from 'feathers-mongoose';
import timedPresentation from './timedPresentation-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: timedPresentation,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('api/timedPresentations', service(options));

  // Get our initialize service to that we can bind hooks
  const timedPresentationService = app.service('api/timedPresentations');

  // Set up our before hooks
  timedPresentationService.before(hooks.before);

  // Set up our after hooks
  timedPresentationService.after(hooks.after);
}
