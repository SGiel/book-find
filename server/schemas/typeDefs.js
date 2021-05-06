// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// define query with type Query {}
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }

  type Query {
    getMe: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(
      authors: [String],
      description: String 
      bookId: ID!, 
      image: String, 
      title: String! 
    ): User
    deleteBook(bookId: ID!): User
  }
  
  type Auth {
    token: ID!
    user: User
  }
  


`;



// export the typeDefs
module.exports = typeDefs;