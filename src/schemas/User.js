'use strict'
const { gql } = require ('apollo-server-express');

const UserSchema = gql`
  type User {
    _id: String
    name: String
    email: String
    password: String
    avatar: String
    role: Int
    updatedAt: GraphQLDateTime
    createdAt: GraphQLDateTime
    isRemove: Boolean
  }

  input User_Filter {
    _id: String
    email: String
  }

  input User_Input {
    _id: String
    name: String
    email: String
    password: String
    avatar: String
    role: Int
  }

  type Query {
    User(filter: User_Filter, option: Option):[User]
    User_count(filter: User_Filter):Int 
  }

  type Mutation {
    User_update(UserInput: User_Input): ID
    User_delete(_id:String!): String
  }
`
module.exports = UserSchema;