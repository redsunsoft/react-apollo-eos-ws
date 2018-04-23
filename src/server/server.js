const express = require('express');
const { initGraphql } = require('./graphql.js');

const app = express();
const port = process.env.PORT || 5000;

initGraphql(app, port);
