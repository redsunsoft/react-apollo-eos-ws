/**
 * This component provides the UI to control the stream of blocks
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './BlockSubsciberActions.css';


class BlockSubscriberActions extends Component {

    constructor(props) {
        super(props);
        this.toggleDataStream = this.toggleDataStream.bind(this);
    }

    toggleDataStream() {
        this.setState({blockShowingDetails: null});
        this.props.pauseDataStream(!this.props.isStreamPaused);
    }

    render() {
        const {isStreamPaused} = this.props;

        return (<button
                    className="pauseButton"
                    onClick={this.toggleDataStream}
                >
                    {isStreamPaused ? "Unpause" : "Pause"} Stream
                </button>);
    }
}

BlockSubscriberActions.propTypes = {
    isStreamPaused: PropTypes.bool,
    pauseDataStream: PropTypes.func
};

export default BlockSubscriberActions;
