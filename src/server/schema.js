const { makeExecutableSchema } = require('graphql-tools');

const blocks = [];

const topics = {
    newBlocks: 'newBlocks'
};

const typeDefs = `
  type Query { blocks: [Block] }
  type Block { block_num: Int }
  type Subscription { newBlocks: [Block] }
`;

const buildSchema = (pubsub) => {
  const resolvers = {
    Query: { blocks: () => blocks },
    Subscription: {
      newBlocks: {
        subscribe: () => pubsub.asyncIterator(topics.newBlocks)
      }
    },
  };

  return makeExecutableSchema({ typeDefs, resolvers })
};


module.exports = {
  topics,
  buildSchema
};
