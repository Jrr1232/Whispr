import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_WHISPR = gql`
  mutation addWhispr($whisprText: String!, $whisprType: String!) {
    addWhispr(whisprText: $whisprText, whisprType: $whisprType) {
      _id
      whisprText
      whisprType
      whisprAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($whisprId: ID!, $commentText: String!) {
    addComment(whisprId: $whisprId, commentText: $commentText) {
      _id
      whisprText
      whisprAuthor
      createdAt
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
mutation removeComment($whisprId: ID!, $commentId: ID!) {
  removeComment(whisprId: $whisprId, commentId: $commentId){
      _id
      whisprText
      whisprAuthor
      createdAt
        comments {
        _id
        commentText
        createdAt
  }
}
}
`;

export const REMOVE_WHISPR = gql`
mutation removeWhispr($whisprId: ID!) {
  removeWhispr(whisprId: $whisprId){
      _id
      whisprText
      whisprAuthor
      createdAt

  }
  
}
`
export const UPDATE_WHISPR = gql`
mutation UpdateWhispr($whisprId: ID!, $whisprText: String!) {
  updateWhispr(whisprId: $whisprId, whisprText: $whisprText) {
    _id
    createdAt
    whisprAuthor
    whisprText
    whisprType
  }
  }
`;
