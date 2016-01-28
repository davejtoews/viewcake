import service from 'feathers-mongoose';
import message from './message-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    Model: message,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/messages', service(options));

  // Get our initialize service to that we can bind hooks
  const messageService = app.service('/messages');

  // Set up our before hooks
  messageService.before(hooks.before);

  // Set up our after hooks
  messageService.after(hooks.after);
}
