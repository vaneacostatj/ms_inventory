'use strict'
const invoice = require('../models/Invoice')
const { generateId, handlePagination } = require('@codecraftkit/utils')
const RandomNumber = () => Math.floor(Math.random()*1000)

const Invoice_Create = async (_, {invoice_input={}})=>{
  try {
    
    const ID = generateId()
    let totalProduct =[]
    let NumInvoice = RandomNumber(); 

    let {
      productAdd
    } = invoice_input

    for (let i = 0; i < productAdd.length; i++) {
      let {amount, iva, unitValue} = productAdd[i]
      let Piva = (unitValue * amount)*(iva/100)
      let ttValue = unitValue + Piva
      totalProduct.push(ttValue)
      productAdd[i].ttValue = ttValue
    }
 
    let productValue = totalProduct.reduce((a, b) => a + b, 0);

    await new invoice({
      _id: ID, 
      NumInvoice, 
      productAdd:productAdd,
      productValue
    }).save()
    return ID
  } catch (error) {
    return error
  }
}

/*const Invoice_Update = async(_, {invoice_input})=>{
  try {
    let {_id, NumInvoice, iva, productValue, productAdd} = invoice_input
  
    await invoice.findByIdAndUpdate(_id,{
      $set:{
        _id, 
        NumInvoice, 
        productAdd,
        iva, 
        productValue
      }
    })
    return _id
  } catch (error) {
    return error
  }
}*/


/*const Invoice_delete = async (_, {_id}) => {
  try {
      await invoice.findByIdAndUpdate(_id, { $set: { isRemove: true }
    })
    return true
  } catch (error) {
    return error;
  }
}*/

const Invoice = async (_, {filter={}, options={}}) => {
  try {
    let query = { isRemove: false }
    let {_id, NumInvoice} = filter
    let {skip, limit} = handlePagination(options)

    if(_id) query._id = _id 
    if(NumInvoice) query.NumInvoice = NumInvoice 

    const find = [
      {
        $match: query 
      }, 
    ]

    if(skip){
      find.skip(skip)
    }
    if(limit){
      find.limit(limit)
    }
    let results = await invoice.aggregate(find)
    //console.log(results[0].descriptionProduct);
    return results        

  } catch (error) {
    return error
  }
}

const Invoice_Count = async (_, {filter={}}) =>{
  try {
    const count = await Product_Get(_, {filter})
    return count.length
  } catch (error) {
    return error
  } 
}
module.exports = {
  Query: {
    Invoice,
    Invoice_Count
  },

  Mutation: {
    Invoice_Create,
  }
}