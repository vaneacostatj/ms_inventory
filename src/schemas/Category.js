'use strict'
const { gql } = require ('apollo-server-express');

const CategorySchema = gql`
  type Category {
    _id: String
    name: String
    description: String
    categoryProduct: [Product]
    updatedAt: GraphQLDateTime
    createdAt: GraphQLDateTime
    isRemove: Boolean
  }

  input Category_Filter {
    _id: String
    name: String
  }

  input Category_Input {
    _id: String
    name: String
    description: String
  }

  type Query {
    Category_Get(filter: Category_Filter, option: Option):[Category]
    Category_Count(filter: Category_Filter):Int 
  }

  type Mutation {
    Category_Save(categoryInput: Category_Input): ID
    Category_delete(_id:String!): String
  }
`
module.exports = CategorySchema;