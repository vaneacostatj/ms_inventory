
const { mergeTypeDefs } = require('@graphql-tools/merge')
const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')

const typesArray = loadFilesSync(path.join(__dirname, '..','schemas'), {extensions: ['js']})

module.exports = mergeTypeDefs(typesArray)