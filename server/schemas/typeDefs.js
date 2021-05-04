// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// define query with type Query {}
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }

  type Query {
    getMe: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(authors: String,
      description: String!, 
      userId: ID!, 
      image: String, 
      link: String, 
      title: String! 
    ): User
    deleteBook(userId: ID!): User
  }
  
  type Auth {
    token: ID!
    user: User
  }
  


`;





// export the typeDefs
module.exports = typeDefs;