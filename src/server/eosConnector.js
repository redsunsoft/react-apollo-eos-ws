const eosJS = require('eosjs');
const { topics } = require('./schema.js');

const eos = eosJS.Localnet();

let blocks = [];
let lastBlockHead = 0;
let lastPushedBlock = 0;

const fetchNewBlocks = async(head) => {
    lastBlockHead = Math.max(head - 10, lastBlockHead);

    for (let blockNum = lastBlockHead + 1; blockNum <= head; blockNum++){
        let result = await eos.getBlock(blockNum);
        blocks.push(result.block_num);
    }
    lastBlockHead = head;

    return head;
};

const pruneBlocks = () => {
    const min = Math.max(blocks.length - 10, 0);
    blocks = blocks.slice(min);
};

const initEosConnector = (pubsub) => {

    setInterval(()=>{
        eos.getInfo({}).then(async(result) => {
            const newBlockHead = await fetchNewBlocks(result.head_block_num);
            console.log(newBlockHead);

            pubsub.publish(topics.newBlocks, {newBlock: result});

            if (result.head_block_num % 10 === 0){
                pruneBlocks();
            }
        });
        console.log(blocks);
    }, 500);
};

module.exports = {
    initEosConnector
};