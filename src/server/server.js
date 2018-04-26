const express = require('express');
const { initGraphql } = require('./graphql.js');
const { initEosBlockListener } = require('./EosBlockListener');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Initialize the graphql server and retrieve the pub/sub for new blocks
const {onNewBlockPub} = initGraphql(app, port);

// Initialize the block listener and pass the cb for new blocks
initEosBlockListener(onNewBlockPub);
