import React, { Component } from 'react';
import BlockSubscriber from './BlockSubscriber';

import './BlockTable.css';

const BlockTable = (props) => {
    const blocks = props.blocks || [];

    return (
        <div className="App-intro">
            {blocks.map((block) =>
                <div>{block.block_num}</div>
            )}
        </div>
    );
};

export default BlockSubscriber(BlockTable);
