import service from 'feathers-mongoose';
import slidechangeTime from './slidechangeTime-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: slidechangeTime,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/slidechangeTimes', service(options));

  // Get our initialize service to that we can bind hooks
  const slidechangeTimeService = app.service('/api/slidechangeTimes');

  // Set up our before hooks
  slidechangeTimeService.before(hooks.before);

  // Set up our after hooks
  slidechangeTimeService.after(hooks.after);
}
