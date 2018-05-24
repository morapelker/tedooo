import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchPage from "./SearchPage";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SearchResults from "./parents/SearchResultsPage";
import SpecificShop from "./specificShop/SpecificShopPage";
import HistoryPage from "./parents/HistoryPage";
import FavoritesPage from "./parents/FavoritesPage";
import AuthenticationPage from "./Authentication/AuthenticationPage";
import MyShops from "./parents/MyShops";
import AddShop from "./parents/AddShop";
import Header from "./Drawer/Header";
import * as actions from "../actions/authenticationActions";
import {bindActionCreators} from 'redux';
import PendingShops from "./parents/PendingShops";
import Categories from "./parents/Categories";
import MediaQuery from "react-responsive";

class MainApp extends Component {
    render() {
        const title = (this.props.state.token === '' ? 'Tedooo' : ((this.props.state.admin ? 'Hey boss ' : 'Welcome back ') + this.props.state.firstName) + '!');

        return (
            <div style={{height: '100%'}}>
                <BrowserRouter>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Header logOut={this.props.actions.logOut} history={this.props.history}
                                auth={this.props.state} title={title}/>
                        <MediaQuery query="(min-width: 801px)">
                            <div style={{
                                marginTop: 50
                            }} />
                        </MediaQuery>
                        <div style={{
                            flex: 1
                        }}>
                            <Switch>
                                <Route exact path='/' component={SearchPage}/>
                                <Route exact path='/results' component={SearchResults}/>
                                <Route exact path='/history' component={HistoryPage}/>
                                <Route exact path='/favorites' component={FavoritesPage}/>
                                <Route exact path='/login' component={AuthenticationPage}/>
                                <Route exact path='/myshops' component={MyShops}/>
                                <Route exact path='/addshop' component={AddShop}/>
                                <Route exact path='/pending' component={PendingShops}/>
                                <Route exact path='/categories' component={Categories}/>
                                <Route path='/results/:id' component={SpecificShop}/>
                            </Switch>
                        </div>

                    </div>

                </BrowserRouter>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        state: state.saved.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);