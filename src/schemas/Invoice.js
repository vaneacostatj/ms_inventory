'use strict'
const { gql } = require ('apollo-server-express');

const InvoiceSchema = gql`
  type Invoice {
    _id: String
    NumInvoice: Float
    productAdd: [Product_Unit]
    productValue: Float
    updatedAt: GraphQLDateTime
    createdAt: GraphQLDateTime
    isRemove: Boolean
    product: [Product]
  }

  type Product_Unit{
    product_id: String
    amount: Int
    iva: Int
    unitValue: Int 
    ttValue: Int
  }
  
  input Product_Unit_Input{
    product_id: String
    amount: Int!
    iva: Int!
    unitValue: Int!
    ttValue: Int
  }

  input Invoice_Filter {
    _id: String
    NumInvoice: Float
  }

  input Invoice_Input {
    productAdd: [Product_Unit_Input]!
  }

  type Query {
    Invoice(filter: Invoice_Filter, option: Option):[Invoice]
    Invoice_Count(filter: Invoice_Filter):Int 
  }

  type Mutation {
    Invoice_Create(invoice_input: Invoice_Input): ID
    #Invoice_delete(_id:String!): Boolean
  }
`
module.exports = InvoiceSchema;