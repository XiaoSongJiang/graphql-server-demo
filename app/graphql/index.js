

const fs = require('fs')
const { resolve } = require('path')
const allCustomScalars = require('./scalars/index.js')
const allCustomDirectives = require('./directives/index.js')
const { ApolloServer, gql } = require('apollo-server-koa')

const defaultPath = resolve(__dirname, '../components/')
const typeDefFileName = 'schema.js'
const resolverFileName = 'resolver.js'
const connectorFileName = 'connector.js';

const linkSchema = gql`
  scalar Date
  directive @auth on FIELD_DEFINITION
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`
function generateTypeDefsAndResolvers() {
  const typeDefs = [linkSchema]
  const resolvers = { ...allCustomScalars }
  const _generateAllComponentRecursive = (path = defaultPath) => {
    const list = fs.readdirSync(path)

    for (let item of list) {
      const resolverPath = path + '/' + item
      const stat = fs.statSync(resolverPath)
      const isDir = stat.isDirectory()
      const isFile = stat.isFile()
      if (isDir) {
        _generateAllComponentRecursive(resolverPath)
      } else if (isFile && item === typeDefFileName) {
        const { schema } = require(resolverPath)
        typeDefs.push(schema)
      } else if (isFile && item === resolverFileName) {
        const resolversPerFile = require(resolverPath)

        Object.keys(resolversPerFile).forEach(k => {
          if (!resolvers[k]) resolvers[k] = {}
          resolvers[k] = { ...resolvers[k], ...resolversPerFile[k] }
        })
      }
    }
  }

  _generateAllComponentRecursive()
  return { typeDefs, resolvers }
}

const isProd = process.env.NODE_ENV === 'production'

const apolloServerOptions = {
  ...generateTypeDefsAndResolvers(),
  formatError: error => ({
    code: error.extensions.code,
    message: error.message
  }),
  schemaDirectives: { ...allCustomDirectives },
  context: ({ ctx }) => ({ ctx }),
  introspection: !isProd,
  playground: !isProd,
  mocks: false
}

module.exports = new ApolloServer({ ...apolloServerOptions })