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

// export const SAVE_BOOK = gql`
//   mutation saveBook($userId: ID!, $authors: [String], $image: String, $link: String, $title: String) {
//     saveBook(userId: $userId, authors: $authors, image: $image, link: $link, title: $title) {
//       _id
//       }
//     }
//   }
// `;