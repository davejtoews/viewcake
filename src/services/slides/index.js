import service from 'feathers-mongoose';
import slides from './slides-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: slides,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/slides', service(options));

  // Get our initialize service to that we can bind hooks
  const slidesService = app.service('/slides');

  // Set up our before hooks
  slidesService.before(hooks.before);

  // Set up our after hooks
  slidesService.after(hooks.after);
}
