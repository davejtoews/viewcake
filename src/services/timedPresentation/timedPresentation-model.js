// timedPresentation.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let timedPresentationSchema = new Schema({
  presentation: { type: ObjectId, ref: 'presentation', required: true},
  slidechangeTimes: [{type: ObjectId, ref: 'slidechangeTime'}],
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
});

let timedPresentationModel = mongoose.model('timedPresentation', timedPresentationSchema);

export default timedPresentationModel;