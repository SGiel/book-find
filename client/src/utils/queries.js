import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    getMe {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        title
        link
      }
    }
  }
`;