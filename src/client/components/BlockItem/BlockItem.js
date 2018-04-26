/**
 * This component represents a single block
 */
import React from 'react';
import PropTypes from 'prop-types';
import './BlockItem.css';

//Todo - translate strings
const BlockItem = ({block, showDetail, showBlockDetail}) => {
    if (!block || !block.block_num) return null;

    return (
        <div
            className="block-container"
            onClick={() => showBlockDetail(block.block_num)}
        >
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


BlockItem.propTypes = {
    block: PropTypes.object.isRequired,
    showDetail: PropTypes.bool,
    showBlockDetail: PropTypes.func
};

export default BlockItem;
