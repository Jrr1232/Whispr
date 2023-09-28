import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      whisprs {
        _id
        whisprText
        createdAt
      }
    }
  }
`;

export const QUERY_WHISPRS = gql`
  query getWhisprs {
    whisprs {
      _id
      whisprText
      whisprAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_WHISPR = gql`
  query getSingleWhispr($whisprId: ID!) {
    whispr(whisprId: $whisprId) {
      _id
      whisprText
      whisprAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      whisprs {
        _id
        whisprText
        whisprAuthor
        createdAt
      }
    }
  }
`;
