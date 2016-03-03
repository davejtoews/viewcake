import service from 'feathers-mongoose';
import subSlide from './subSlide-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: subSlide,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('api/subSlides', service(options));

  // Get our initialize service to that we can bind hooks
  const subSlideService = app.service('api/subSlides');

  // Set up our before hooks
  subSlideService.before(hooks.before);

  // Set up our after hooks
  subSlideService.after(hooks.after);
}
