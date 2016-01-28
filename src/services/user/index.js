import service from 'feathers-mongoose';
import user from './user-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: user,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
}
