import * as React from 'react';
import printer from './printer';
import './App.css';
import { getCookies, setCookie } from './util/storage';
import { requestDevice } from './usb/usb';

interface AppState {
    serialNumber: string
    printer?: USBDevice
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            serialNumber: getCookies().serialNumber,
            printer: undefined
        }
    }

    setPrinter = async () => {
        const printer = await requestDevice(this.state.serialNumber);
        if (printer && printer.serialNumber) {
            setCookie('serialNumber', printer.serialNumber);
            if (!this.state.printer) {
                this.setState({ printer, serialNumber: printer.serialNumber });
            }
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img className="printer" src={printer} onClick={this.setPrinter} />
                </header>
            </div>
        );
    }
}

export default App;
