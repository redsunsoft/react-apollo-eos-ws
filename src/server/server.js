const express = require('express');
const { initGraphql } = require('./graphql.js');
const { initEosBlockListener } = require('./EosBlockListener');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const {onNewBlockPub} = initGraphql(app, port);

initEosBlockListener(onNewBlockPub);
