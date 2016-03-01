import service from 'feathers-mongoose';
import slide from './slide-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: slide,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/slides', service(options));

  // Get our initialize service to that we can bind hooks
  const slideService = app.service('/api/slides');

  // Set up our before hooks
  slideService.before(hooks.before);

  // Set up our after hooks
  slideService.after(hooks.after);
}
