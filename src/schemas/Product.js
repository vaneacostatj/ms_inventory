'use strict'
const { gql } = require ('apollo-server-express');

const ProductSchema = gql`
  type Product {
    _id: String
    categoryId: String
    name: String
    amount: Int
    description: String
    unitValue: Float
    iva: Float
    updatedAt: GraphQLDateTime
    createdAt: GraphQLDateTime
    isRemove: Boolean
  }

  input Product_Filter {
    _id: String
    categoryId: String
    name: String
  }

  input Product_Discount_Input{
    _id: String!
    Count: Int!
    addProductInstock: Boolean
  }

  input Product_Input {
    _id: String
    categoryId: String!
    name: String
    amount: Int
    description: String
    unitValue: Float
    iva: Float
  }

  type Query {
    Product_Get(filter: Product_Filter, option: Option):[Product]
    Product_Count(filter: Product_Filter):Int 
  }

  type Mutation {
    Product_Save(productInput: Product_Input): ID
    Product_delete(_id:String!): String
    Product_InStock(filter:Product_Discount_Input):Int
  }
`
module.exports = ProductSchema;