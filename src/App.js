import React, {Component} from 'react';
import './App.css';
import HomePage from "./components/MainApp";
import {MuiThemeProvider} from "material-ui";
// import Layout from "./components/helpers/Layout";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    {/*<Layout />*/}
                    <HomePage />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
