const { makeExecutableSchema } = require('graphql-tools');

const blocks = [];

const topics = {
    newBlocks: 'newBlocks'
};

const typeDefs = `
  type Query { blocks: [Block] }
  type Block { number: Int }
  type Subscription { newBlock: Block }
`;

const buildSchema = (pubsub) => {
  const resolvers = {
    Query: { blocks: () => blocks },
    Subscription: {
      newBlock: {
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
