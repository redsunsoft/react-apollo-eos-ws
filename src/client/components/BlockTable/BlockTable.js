import React, {Component} from 'react';
import BlockSubscriber from './BlockSubscriber';
import BlockItem from '../BlockItem/BlockItem';
import './BlockTable.css';


class BlockTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blockShowingDetails: null
        };

        this.showBlockDetail = this.showBlockDetail.bind(this);
        this.toggleDataStream = this.toggleDataStream.bind(this);
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

    toggleDataStream() {
        this.setState({blockShowingDetails: null});
        this.props.pauseDataStream(!this.props.isStreamPaused);
    }

    render() {
        const {blocks, isStreamPaused} = this.props;

        return (<div className="blocks-container">
                <button
                    className="pauseButton"
                    onClick={this.toggleDataStream}
                >
                    {isStreamPaused ? "Unpause" : "Pause"} Stream
                </button>

                {blocks.map((block) => <BlockItem
                    key={`block-${block.block_num}`}
                    block={block}
                    showDetail={block.block_num === this.state.blockShowingDetails}
                    showBlockDetail={this.showBlockDetail}
                />)}

            </div>);
    }
}

export default BlockSubscriber(BlockTable);
