'use strict'
const { Schema, model } = require('mongoose');

const collectionName = "category"

const categorySchema = Schema({
  _id : String,
  name : String,
  description : String,
  updatedAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now}, 
  isRemove: {type: Boolean, default: false}, 
}, {
  collection: collectionName,
  _id: false
})


module.exports = model(collectionName, categorySchema); 