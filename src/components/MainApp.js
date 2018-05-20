import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchPage from "./SearchPage";
import {MuiThemeProvider} from "material-ui";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SearchResults from "./parents/SearchResultsPage";
import SpecificShop from "./specificShop/SpecificShopPage";
import TopBar from "./common/TopBar";
import HistoryPage from "./parents/HistoryPage";
import FavoritesPage from "./parents/FavoritesPage";
import AuthenticationPage from "./Authentication/AuthenticationPage";
import MyShops from "./parents/MyShops";
import AddShop from "./parents/AddShop";

class MainApp extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <div style={{height: '100%'}}>
                    <BrowserRouter>
                        <div style={{height: '100%'}}>
                            <TopBar />
                            <Switch>
                                <Route exact path='/' component={SearchPage}/>
                                <Route exact path='/results' component={SearchResults}/>
                                <Route exact path='/history' component={HistoryPage}/>
                                <Route exact path='/favorites' component={FavoritesPage}/>
                                <Route exact path='/login' component={AuthenticationPage}/>
                                <Route exact path='/myshops' component={MyShops}/>
                                <Route exact path='/addshop' component={AddShop}/>
                                <Route path='/results/:id' component={SpecificShop}/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>
            </MuiThemeProvider>

        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.title
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: null
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);