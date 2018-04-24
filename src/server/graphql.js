const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { PubSub } = require('graphql-subscriptions');
const { buildSchema } = require('./schema.js');
const { topics } = require('./schema.js');

const pubsub = new PubSub();
const PORT = 5000;

function initGraphql(app){

  const schema = buildSchema(pubsub);

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
  }));

  const ws = createServer(app);

  ws.listen(PORT, () => {
    new SubscriptionServer({
        execute,
        subscribe,
        schema
      }, {
        server: ws,
        path: '/subscriptions',
      });
  });

  const mapBlocks = (blocks) =>
    blocks.map((block) => ({
        block_num: block.block_num
    }));

  const onNewBlockPub = (blocks) => {
      pubsub.publish(topics.newBlocks, {newBlocks: blocks});
      console.log(mapBlocks(blocks));
  };

  return {
    onNewBlockPub
  };
}

module.exports = { initGraphql };
