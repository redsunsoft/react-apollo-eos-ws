/**
 * This component receives a list of blocks and
 * creates a list of block items
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BlockItem from '../BlockItem/BlockItem';
import './BlockTable.css';


class BlockTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blockShowingDetails: null
        };

        this.showBlockDetail = this.showBlockDetail.bind(this);
    }

    showBlockDetail(blockNum) {
        // Close an open detail pane
        if (this.state.blockShowingDetails === blockNum) {
            this.setState({blockShowingDetails: null});
            this.props.pauseDataStream(false);
        } else {
            this.setState({blockShowingDetails: blockNum});
            this.props.pauseDataStream(true);
        }
    }

    render() {
        const {blocks = []} = this.props;

        return (
            <div className="blocks-container">
                {blocks.map((block) => <BlockItem
                    key={`block-${block.block_num}`}
                    block={block}
                    showDetail={block.block_num === this.state.blockShowingDetails}
                    showBlockDetail={this.showBlockDetail}
                />)}
            </div>
        );
    }
}

BlockTable.propTypes = {
    blocks: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BlockTable;
