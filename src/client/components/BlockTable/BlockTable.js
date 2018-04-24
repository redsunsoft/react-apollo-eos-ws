import React, { Component } from 'react';
import './BlockTable.css';
import { graphql } from 'react-apollo'
import { Query } from "react-apollo";
import gql from 'graphql-tag'

class BlockTable extends Component {
  // componentWillReceiveProps({ data: { newBlocks } }) {
  //   console.log(newBlocks);
  // }
 componentDidMount() {
    this.props.subscribeToNewBlocks();
  }
  render() {
      //console.log(this.props);
    return (
        <div className="App-intro">
        </div>
    );
  }
}

const subNewNotification = gql`
  subscription {
    newBlocks {
      block_num
    }
  }
`;

//export default graphql(subNewNotification)(BlockTable);


const blockQuery = gql`
  query blocks{
     block_num
  }
`;

const CommentsPageWithData = ({ params }) => (
  <Query
    query={blockQuery}
  >
    {({subscribeToMore, ...result}) =>
        <BlockTable
            {...result}
            subscribeToNewBlocks={() =>
              subscribeToMore({
                document: subNewNotification,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  console.log(prev);
                  const newBlocks = subscriptionData.data.newBlocks;

                  return Object.assign({}, prev, {
                    entry: {
                      blocks: [...prev.blocks, ...newBlocks]
                    }
                  });
                }
              })
            }
        />}
  </Query>
);//<BlockTable {...result} />

export default CommentsPageWithData;