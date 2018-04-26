const eosJS = require('eosjs');

const eos = eosJS.Localnet();
const MAX_LOOK_BACK = 10;
const LOOP_INTERVAL_MS = 500;

let lastPushedBlock = 0;
let isFetchingBlocks = false;

const fetchNewBlocks = async (newBlockHead) => {
    const blocks = [];

    lastPushedBlock = Math.max(newBlockHead - MAX_LOOK_BACK, lastPushedBlock);

    for (let blockNum = newBlockHead; blockNum > lastPushedBlock; blockNum--) {

        blocks.push(await eos.getBlock(blockNum));
    }

    lastPushedBlock = newBlockHead;
    return blocks;
};

const checkForNewBlocks = async(onNewBlocks) => {
    eos.getInfo({}).then( async(result) => {

        if (!isFetchingBlocks) {
            isFetchingBlocks = true;
            const blocks = await fetchNewBlocks(result.head_block_num);
            if (blocks.length) {
                onNewBlocks(blocks);
            }
            isFetchingBlocks = false;
        } else console.log('skip');

    });
};

const eosBlockListener = (onNewBlocks) => {
    let listenerLoopTimer;

    const listenForNewBlocks = () => {
        listenerLoopTimer = setTimeout(async() => {
            await checkForNewBlocks(onNewBlocks);
            listenForNewBlocks();
        }, LOOP_INTERVAL_MS);
    };

    listenForNewBlocks();
};

module.exports = {
    initEosBlockListener: eosBlockListener
};