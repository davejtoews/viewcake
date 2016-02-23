// presentation.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let presentationSchema = new Schema({
  name: {type: String, required: true, unique: true},
  slides: [{ type: ObjectId, ref: 'slide'}],
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
});

let presentationModel = mongoose.model('presentation', presentationSchema);

export default presentationModel;