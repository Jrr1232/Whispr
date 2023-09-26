const { User, Whispr } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('whisprs');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('whisprs');
    },
    whisprs: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Whispr.find(params).sort({ createdAt: -1 });
    },
    whispr: async (parent, { whisprId }) => {
      return Whispr.findOne({ _id: whisprId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('whisprs');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addWhispr: async (parent, { whisprText }, context) => {
      if (context.user) {
        const whispr = await Whispr.create({
          whisprText,
          whisprAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { whisprs: whispr._id } }
        );

        return whispr;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { whisprId, commentText }, context) => {
      if (context.user) {
        return Whispr.findOneAndUpdate(
          { _id: whisprId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeWhispr: async (parent, { whisprId }, context) => {
      if (context.user) {
        const whispr = await Whispr.findOneAndDelete({
          _id: whisprId,
          whisprAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { whisprs: whispr._id } }
        );

        return whispr;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { whisprId, commentId }, context) => {
      if (context.user) {
        return Whispr.findOneAndUpdate(
          { _id: whisprId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
