import React from 'react';
import './BlockItem.css';

const BlockItem = ({block, showDetail, showBlockDetail}) => {
    return (
        <div className="block-container" onClick={() => showBlockDetail(block.block_num)}>
            <div className="block-num">Block# {block.block_num}</div>
            <div className="block-meta">
                <span className="block-meta-item">
                    <span className="block-label">Timestamp: </span>
                    {block.timestamp}
                </span>
                <span className="block-meta-item">
                    <span className="block-label">Producer: </span>
                    {block.producer}
                </span>
                <span className="block-meta-item">
                    <span className="block-label"># Transactions: </span>
                    {block.input_transactions.length}
                </span>


            </div>

            {showDetail &&
                <pre className="block-details">
                    {JSON.stringify(block, null, "  ")}
                </pre>
            }
        </div>
    );
};

export default BlockItem;
