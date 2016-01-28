import message from './message';
import user from './user';

import mongoose from 'mongoose';

export default function() {
  const app = this;
  
  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;
  
  app.configure(message);
  app.configure(user);
}
