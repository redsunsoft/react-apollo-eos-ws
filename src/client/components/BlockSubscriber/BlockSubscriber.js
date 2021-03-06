/**
 * This HOC creates a subscription to the websocket and listen for new blocks.
 * It then passes those down as props to its children.
 */
import {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag'
import {fullBlockQuery} from '../../../graphqlQueries/block';

const MAX_BLOCKS = 10;

const subNewBlocks = gql`
  subscription {
    newBlocks ${fullBlockQuery}
  }
`;

const blockQuery = gql`
  {
    blocks ${fullBlockQuery}
  }
`;

export class BlockSubscriber extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isStreamPaused: false
        };

        this.pauseDataStream = this.pauseDataStream.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery(prev, {subscriptionData} = {}) {
        if (!subscriptionData.data || this.state.isStreamPaused) return prev;

        const newBlocks = subscriptionData.data.newBlocks || [];
        let newBlockList = newBlocks.concat(prev.blocks);

        // Trim the list to the X most recent blocks
        newBlockList = newBlockList.slice(0, Math.min(newBlockList.length, MAX_BLOCKS));

        return Object.assign({}, prev, {blocks: newBlockList});
    }

    componentDidMount() {
        this.subscribeToNewBlocks();
    }

    pauseDataStream(newState) {
        this.setState({isStreamPaused: newState})
    }

    subscribeToNewBlocks() {
        this.props.data.subscribeToMore({
            document: subNewBlocks,
            updateQuery: this.updateQuery
        })
    }

    render() {
        return this.props.children(
            Object.assign(
                {
                    isStreamPaused: this.state.isStreamPaused,
                    pauseDataStream: this.pauseDataStream
                }, this.props.data)
        );
    }
}

export default graphql(blockQuery)(BlockSubscriber);
