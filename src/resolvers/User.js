'use strict'
const user = require('../models/User');
const { handlePagination } = require('@codecraftkit/utils')
const bcrypt = require('bcryptjs') 

const User_update = async (_, {userInput}) => {
  try {
    const {
      _id,
      name,
      email,
      password,
      avatar,
      role,
    } = userInput

    const salt = await bcrypt.genSalt(10) 
    password = await bcrypt.hash(password,salt)

    await user.findByIdAndUpdate(_id, {
      $set: {
        name,
        email,
        password,
        avatar,
        role,
      }
    })
    return userInput._id
  } catch (error) {
    return error;
  }
}


const User = async (_, {filter={}, options={}}) => {
 
  try {
    let query = { isRemove: false }
    let {_id, email} = filter
    let {skip, limit} = handlePagination(options)
    

    if(_id) query._id = _id 
    if(email) query.email = { $regex: email, $options: 'i' }

    const find = user.find(query) 

    if(skip){
      find.skip(skip)
    }
    if(limit){
      find.limit(limit)
    }
    return await find.lean()
        
  } catch (error) {
    return error;
  } 
}


const User_count = async (_, {filter={}}) =>{
  try {
    const count = await User(_, {filter})
    return count.length
  } catch (error) {
    return error
  }
}

const User_delete = async (_, {_id}) => {
  try {
      await user.findByIdAndUpdate(_id, { $set: { isRemove: true }
    })
    return true
  } catch (error) {
    return error;
  }
}




module.exports = {
  Query: {
    User,
    User_count
  },

  Mutation: {
    User_update,
    User_delete,
  }
}