'use strict'
const { Schema, model } = require('mongoose');

const collectionName = "product"

const productSchema = Schema({
  _id : String,
  categoryId : String,
  name : String,
  amount : Number,
  unitValue : Number,
  iva: Number,
  description : String,
  updatedAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now}, 
  isRemove: {type: Boolean, default: false}, 
}, {
  collection: collectionName,
  _id: false
})


module.exports = model(collectionName, productSchema); 