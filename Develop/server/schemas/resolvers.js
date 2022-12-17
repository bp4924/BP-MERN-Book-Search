const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email, password });

      if (!user) {
        return null;
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      if (!user) {
        return null;
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async () => {},
    removeBook: async () => {},
  },
};

module.exports = resolvers;
