'use strict'
const category = require('../models/Category');
const { generateId, handlePagination } = require('@codecraftkit/utils')


const Category_Create = async (_, {categoryInput}) => {
  try {
    const ID = generateId()
    const { name, description} = categoryInput
    new category ({_id:ID,  name, description}).save()
    return ID
  } catch (error) {
    console.error(`se crea error en Category_Create ${error}`);
    return error;
  }
}

const Category_Update = async (_, {categoryInput}) => {
  try {
    const {
      _id,
      name,
      description
    } = categoryInput
    await category.findByIdAndUpdate(categoryInput._id, {
      $set: {
        _id,
        name,
        description
      }
    })
    return categoryInput._id
  } catch (error) {
    console.error(`se crea error en Category_Update ${error}`);
    return error;
  }
}

const Category_Save = async(_,{categoryInput}) => {
  try {
    if(categoryInput._id){
      return await Category_Update (_,{categoryInput})
    }
    else{
      return await Category_Create(_,{categoryInput})
    }    
  } catch (error) {
    return error
  }
}

const Category_Get = async (_, {filter={}, options={}}) => {
 
  try {
    let query = { isRemove: false }
    let {_id, name} = filter
    let {skip, limit} = handlePagination(options)
    

    if(_id) query._id = _id 
    if(name) query.name = { $regex: name, $options: 'i' }

    const find = [ 
      {
        $match: query 
      },
      {
        $lookup:{
          from: "product",
          localField: "_id",
          foreignField: "categoryId",
          as: "categoryProduct"
        }
      },
    ]
   
    if(skip){
      find.skip(skip)
    }
    if(limit){
      find.limit(limit)
    }
    let results = await category.aggregate(find)
    console.log(results);
    return results    

  } catch (error) {
    console.error(`se crea error en Category_Get ${error}`);
    return error;
  } 
}


const Category_Count = async (_, {filter={}}) =>{
  try {
    const count = await Category_Get(_, {filter})
    return count.length
  } catch (error) {
    return error
  }
}

const Category_delete = async (_, {_id}) => {
  try {
      await category.findByIdAndUpdate(_id, { $set: { isRemove: true }
    })
    return true
  } catch (error) {
    console.error(`se crea error en Category_delete ${error}`);
    return error;
  }
}

module.exports = {
  Query: {
    Category_Get,
    Category_Count
  },

  Mutation: {
    Category_Save,
    Category_delete
  }
}