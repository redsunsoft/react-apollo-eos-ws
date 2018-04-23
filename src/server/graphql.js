const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { PubSub } = require('graphql-subscriptions');
const { topics, buildSchema } = require('./schema.js');

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

  var count = 1;
  setInterval(()=>{
    const payload = { number: count++ };
    pubsub.publish(topics.newBlocks, {newBlock: payload});
  }, 300);
}

module.exports = { initGraphql };