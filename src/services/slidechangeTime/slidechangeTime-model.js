// slidechange_time.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let slidechangeTimeSchema = new Schema({
  timestamp: {type: Number, required: true},
  indexv: {type: Number, required: true},
  indexh: {type: Number, required: true},
  indexf: {type: Number, required: true},
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
});

let slidechangeTimeModel = mongoose.model('slidechangeTime', slidechangeTimeSchema);

export default slidechangeTimeModel;