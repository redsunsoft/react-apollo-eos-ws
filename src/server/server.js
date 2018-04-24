const express = require('express');
const { initGraphql } = require('./graphql.js');
const { initEosConnector } = require('./eosConnector');


const app = express();
const port = process.env.PORT || 5000;

const {pubsub} = initGraphql(app, port);

initEosConnector(pubsub);