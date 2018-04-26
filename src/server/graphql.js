const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {execute, subscribe} = require('graphql');
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {PubSub} = require('graphql-subscriptions');
const {buildSchema} = require('./schema.js');
const {topics} = require('./schema.js');

const pubsub = new PubSub();

function initGraphql(app, port) {

    const schema = buildSchema(pubsub);

    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql', subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
    }));

    const ws = createServer(app);
    
    ws.listen(port, () => {
        new SubscriptionServer({
            execute,
            subscribe,
            schema
        }, {
            server: ws,
            path: '/subscriptions',
        });
    });

    const onNewBlockPub = (blocks) => {
        pubsub.publish(topics.newBlocks, {newBlocks: blocks});
    };

    return {
        onNewBlockPub
    };
}

module.exports = {initGraphql};
