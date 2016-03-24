import poll from './poll';
import timedPresentation from './timedPresentation';
import slidechangeTime from './slidechangeTime';
import presentation from './presentation';
import slide from './slide';
import message from './message';
import user from './user';

import mongoose from 'mongoose';

export default function() {
  const app = this;
  
  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;
  
  app.configure(message);
  app.configure(user);
  app.configure(slide);
  app.configure(presentation);
  app.configure(slidechangeTime);
  app.configure(timedPresentation);
  app.configure(poll);
}
