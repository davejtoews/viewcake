// subSlide.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let subSlideSchema = new Schema({
  content: {type: String, required: true},
  poll: { type: ObjectId, ref: 'poll'},
  background: {type: String},
  transition: {type: String},
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
});

let subSlideModel = mongoose.model('subSlide', subSlideSchema);

export default subSlideModel;