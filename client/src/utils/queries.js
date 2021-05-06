import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    getMe {
      _id
      username
      email
      savedBooks {
        authors
        description
        image
        link
        title
        bookCount
      }
    }
  }
`;

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
// export const searchBookFind = (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };
