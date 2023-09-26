const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    whisprs: [Whispr]!
  }

  type Whispr {
    _id: ID
    whisprText: String
    whisprAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    whisprs(username: String): [Whispr]
    whispr(whisprId: ID!): Whispr
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWhispr(whisprText: String!): Whispr
    addComment(whisprId: ID!, commentText: String!): Whispr
    removeWhispr(whisprId: ID!): Whispr
    removeComment(whisprId: ID!, commentId: ID!): Whispr
  }
`;

module.exports = typeDefs;
