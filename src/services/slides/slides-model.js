// slides.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let slidesSchema = new Schema({
  content: {type: String, required: true},
  background: {type: String},
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
});

let slidesModel = mongoose.model('slides', slidesSchema);

export default slidesModel;