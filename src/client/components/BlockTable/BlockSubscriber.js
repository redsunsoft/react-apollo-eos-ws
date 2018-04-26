import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag'
import {fullBlockQuery} from '../../../graphqlQueries/block';

const MAX_BLOCKS = 10;

const subNewBlocks = gql`
  subscription {
    newBlocks ${fullBlockQuery}
  }
`;// num, timestamp, input_transactions, producer

const blockQuery = gql`
  {
    blocks ${fullBlockQuery}
  }
`;

const BlockSubscriberWrapped = (WrappedComponent) => {
    class BlockSubscriber extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isStreamPaused: false
            };

            this.pauseDataStream = this.pauseDataStream.bind(this);
        }

        componentDidMount() {
            this.subscribeToNewBlocks();
        }

        pauseDataStream(newState) {
            this.setState({isStreamPaused: newState})
        }

        subscribeToNewBlocks() {
            this.props.data.subscribeToMore({
                document: subNewBlocks, updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data || this.state.isStreamPaused) return prev;

                    const newBlocks = subscriptionData.data.newBlocks || [];
                    let newBlockList = newBlocks.concat(prev.blocks);

                    // Trim the list to the X most recent blocks
                    newBlockList = newBlockList.slice(0, Math.min(newBlockList.length, MAX_BLOCKS));

                    return Object.assign({}, prev, {blocks: newBlockList});
                }
            })
        }

        render() {
            const blocks = (this.props.data && this.props.data.blocks) || [];

            return (<WrappedComponent
                    blocks={blocks}
                    isStreamPaused={this.state.isStreamPaused}
                    pauseDataStream={this.pauseDataStream}
                    {...this.props}
                />);
        }
    }

    return graphql(blockQuery)(BlockSubscriber);
};

export default BlockSubscriberWrapped;
