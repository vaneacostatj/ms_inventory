'use strict'
const product = require('../models/Product');
const { generateId, handlePagination } = require('@codecraftkit/utils')


const Product_Create = async (_, {productInput}) => {
  try {
    const ID = generateId()
    const { 
      name, 
      categoryId, 
      description, 
      amount, 
      unitValue,
      iva
    } = productInput
    new product ({
      _id:ID, 
      name, 
      categoryId, 
      description, 
      amount, 
      unitValue,
      iva 
    }).save()
    return ID
  } catch (error) {
    console.error(`se crea error en Product_Create ${error}`);
    return error;
  }
}

const Product_Update = async (_, {productInput}) => {
  try {
    const {
      _id,
      categoryId,
      name,
      amount,
      description,
      unitValue,
      iva 
    } = productInput
    await product.findByIdAndUpdate(_id, {
      $set: {
        categoryId,
        name,
        amount,
        description,
        unitValue,
        iva 
      }
    })
    return productInput._id
  } catch (error) {
    console.error(`se crea error en Product_Update ${error}`);
    return error;
  }
}

const Product_Save = async(_,{productInput}) => {
  try {
    if(productInput._id){
      return await Product_Update (_,{productInput})
    }
    else{
      return await Product_Create(_,{productInput})
    }    
  } catch (error) {
    return error
  }
}

const Product_Get = async (_, {filter={}, options={}}) => {
 
  try {
    let query = { isRemove: false }
    let {_id, categoryId, name} = filter
    let {skip, limit} = handlePagination(options)
    

    if(_id) query._id = _id 
    if(name) query.name = { $regex: name, $options: 'i' }
    if(categoryId) query.categoryId = categoryId
    const find = product.find(query) 

    if(skip){
      find.skip(skip)
    }
    if(limit){
      find.limit(limit)
    }
    let results = await find.lean()
    return results    
  } catch (error) {
    console.error(`se crea error en Product_Get ${error}`);
    return error;
  } 
}


const Product_Count = async (_, {filter={}}) =>{
  try {
    const count = await Product_Get(_, {filter})
    return count.length
  } catch (error) {
    return error
  }
}

const Product_delete = async (_, {_id}) => {
  try {
      await product.findByIdAndUpdate(_id, { $set: { isRemove: true }
    })
    return true
  } catch (error) {
    console.error(`se crea error en Product_delete ${error}`);
    return error;
  }
}


// se encaragara de descontar o agregar productos del stock
const Product_InStock = async (_, {filter}) =>{
  try {    
    let query = { isRemove: false }
    let {_id, Count, addProductInstock} = filter

    if(_id) query._id = _id    
    const find = product.find(query) 

    let results = await find.lean()
    let Amount = results[0]
    let discount

    if(addProductInstock == true){
      discount = Amount.amount + Count
    }else{
      discount = Amount.amount - Count
    }
  
    await product.findByIdAndUpdate(_id, { $set: { amount: discount }})
    return discount

  } catch (error) {
    return error
  }
}
//---------------------------------------------------------


module.exports = {
  Query: {
    Product_Get,
    Product_Count
  },

  Mutation: {
    Product_Save,
    Product_delete,
    Product_InStock
  }
}