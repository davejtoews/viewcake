// poll.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let pollSchema = new Schema({
  question: {type: String, required: true},
  answers: [{type: String}],
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
});

let pollModel = mongoose.model('poll', pollSchema);

export default pollModel;