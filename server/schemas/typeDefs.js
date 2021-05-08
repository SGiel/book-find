// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// define query with type Query {}
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
    link: String
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Query {
    users: [User]
    getMe: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(
      authors: [String],
      description: String 
      bookId: String!
      image: String, 
      title: String!
      link: String
    ): User
    deleteBook(bookId: String!): User
  }
  
  type Auth {
    token: ID!
    user: User
  }
  


`;



// export the typeDefs
module.exports = typeDefs;