const express = require('express');
const { initGraphql } = require('./graphql.js');
const { initEosBlockListener } = require('./initEosBlockListener');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

const {onNewBlockPub} = initGraphql(app, port);
initEosBlockListener(onNewBlockPub);

// const mapBlocks = (blocks) =>
//     blocks.map((block) => ({
//         number: block.block_num
//     }));

