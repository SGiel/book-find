const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v')
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, args , context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );

        return { updatedUser };
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteBook: async (parent, args , context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId: args.bookId }} },
          { new: true }
          );
          console.log("%%%%%%% In deleteBook Resolver %%%%%%%", updatedUser)
          return { updatedUser };
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },



  }
};

module.exports = resolvers;