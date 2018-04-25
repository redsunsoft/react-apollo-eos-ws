const { makeExecutableSchema } = require('graphql-tools');

const blocks = [];

const topics = {
    newBlocks: 'newBlocks'
};

const typeDefs = `
  type Query { blocks: [Block] }
  type Block { 
    block_num: Int
    previous: String
    timestamp: String
    transaction_mroot: String
    action_mroot: String
    block_mroot: String
    schedule_version: Int
    new_producers: String
    producer: String
    producer_signature: String
    regions: [Region]
    input_transactions: [BlockTransaction]
    id: String
    ref_block_prefix: Int
  }
  type BlockTransaction {
    signatures: [String]
    compression: String
    data: String
  }  
  type Region {
    region: Int
    cycles_summary: [[Cycle]]
  }  
  type Cycle {
    read_locks: [String]
    write_locks: [String]
    transactions: [CycleTransaction]
  }
  type CycleTransaction {
    status: String
    kcpu_usage: Int
    net_usage_words: Int
    id: String
  }
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
