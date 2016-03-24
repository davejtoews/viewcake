import service from 'feathers-mongoose';
import poll from './poll-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: poll,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/polls', service(options));

  // Get our initialize service to that we can bind hooks
  const pollService = app.service('/polls');

  // Set up our before hooks
  pollService.before(hooks.before);

  // Set up our after hooks
  pollService.after(hooks.after);
}
