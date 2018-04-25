import React from 'react';
import BlockSubscriber from './BlockSubscriber';
import './BlockTable.css';

const BlockItem = ({block}) => {
    return (
        <div className="block-container">
                <div class="block-num">Block# {block.block_num}</div>
                <div className="block-details">
                    <span className="block-detail-item">
                        <span className="block-label">Timestamp: </span>
                        {block.timestamp}
                    </span>
                    <span className="block-detail-item">
                        <span className="block-label">Producer: </span>
                        {block.producer}
                    </span>
                    <span className="block-detail-item">
                        <span className="block-label"># Transactions: </span>
                        {0}
                    </span>


                </div>
        </div>
    );
};

const BlockTable = (props) => {
    const blocks = props.blocks || [];

    return (
        <div className="blocks-container">
            {blocks.map((block) =>
                <BlockItem block={block} />
            )}
        </div>
    );
};

export default BlockSubscriber(BlockTable);
