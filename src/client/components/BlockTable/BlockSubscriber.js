import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const MAX_BLOCKS = 10;

const BlockSubscriberWrapped = (WrappedComponent) => {
    class BlockSubscriber extends Component {

        componentDidMount() {
            this.subscribeToNewBlocks();
        }

        subscribeToNewBlocks() {
            this.props.data.subscribeToMore({
                document: subNewBlocks,
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;

                    const newBlocks = subscriptionData.data.newBlocks || [];
                    let newBlockList = newBlocks.concat(prev.blocks);

                    // Trim the list to the X most recent blocks
                    newBlockList = newBlockList.slice(
                        0,
                        Math.min(newBlockList.length, MAX_BLOCKS)
                    );

                    return Object.assign({}, prev, {blocks: newBlockList});
                }
            })
        }

        render() {
            const blocks = (this.props.data && this.props.data.blocks) || [];

            return (
                <WrappedComponent blocks={blocks} {...this.props}/>
            );
        }
    }

    return graphql(blockQuery)(BlockSubscriber);
};

const subNewBlocks = gql`
  subscription {
    newBlocks {
      block_num
    }
  }
`;

const blockQuery = gql`
  {
    blocks{
     block_num
    }
  }
`;

export default BlockSubscriberWrapped;
