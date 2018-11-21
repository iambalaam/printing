import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getCookies } from './util/storage';
import { requestDevice } from './usb/usb';

interface AppState {
    serialNumber: string
    printer: any
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            serialNumber: getCookies().serialNumber,
            printer: null
        }
    }

    setPrinter = async () => {
        if (!this.state.printer) {
            this.setState({ printer: await requestDevice() });
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" onClick={this.setPrinter} />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
          </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
          </a>
                </header>
            </div>
        );
    }
}

export default App;
