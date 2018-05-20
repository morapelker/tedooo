import React, {Component} from 'react';
import './App.css';
import HomePage from "./components/MainApp";
import {MuiThemeProvider} from "material-ui";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <HomePage />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
