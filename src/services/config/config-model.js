// config.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let configSchema = new Schema({
  name: {type: String, required: true, index: true},
  value: {type: String},
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
});

let configModel = mongoose.model('config', configSchema);

export default configModel;