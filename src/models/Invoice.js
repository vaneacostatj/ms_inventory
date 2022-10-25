'use strict'
const { Schema, model } = require('mongoose');

const collectionName = "invoice"

const invoiceSchema = Schema({
  _id : String,
  NumInvoice: Number,
  productInv : Object,
  productValue: Number,
  updatedAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now}, 
  isRemove: {type: Boolean, default: false}, 
}, {
  strict: false,
  versionKey: false,
  collection: collectionName,
  _id: false
})


module.exports = model(collectionName, invoiceSchema); 