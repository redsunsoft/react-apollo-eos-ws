import React, {Component} from 'react';
import './App.css';
import BlockSubscriber from '../BlockSubscriber/BlockSubscriber';
import BlockSubscriberActions from '../BlockSubscriberActions/BlockSubscriberActions';
import BlockTable from '../BlockTable/BlockTable';


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">EOS Blocks</h1>
                </header>

                <div className="App-intro">
                    <BlockSubscriber>{({ blocks, isStreamPaused, pauseDataStream }) =>
                        <React.Fragment>
                            <BlockSubscriberActions
                                isStreamPaused={isStreamPaused}
                                pauseDataStream={pauseDataStream}
                            />
                            <BlockTable
                                blocks={blocks}
                                pauseDataStream={pauseDataStream}
                            />
                        </React.Fragment>
                    }</BlockSubscriber>
                </div>
            </div>
        );
    }
}

export default App;