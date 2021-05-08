import gql from 'graphql-tag';


export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $authors: [String], $image: String, $title: String!, $description: String, $link: String) {
    saveBook(bookId: $bookId, authors: $authors, image: $image, title: $title, description: $description, link: $link) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        title
        description
        link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        title
        description
        link
      }
    }
  }
`;