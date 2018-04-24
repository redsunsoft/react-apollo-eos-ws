const express = require('express');
const { initGraphql } = require('./graphql.js');
const { initEosBlockListener } = require('./initEosBlockListener');

const app = express();
const port = process.env.PORT || 5000;

const {onNewBlockPub} = initGraphql(app, port);
initEosBlockListener(onNewBlockPub);

// const mapBlocks = (blocks) =>
//     blocks.map((block) => ({
//         number: block.block_num
//     }));

