import React, {Component} from 'react';
import './App.css';
import BlockTable from '../BlockTable/BlockTable';


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">EOS Blocks</h1>
                </header>

                <div className="App-intro">
                    <BlockTable />
                </div>
            </div>
        );
    }
}

export default App;