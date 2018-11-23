import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchPage from "./SearchPage";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SearchResults from "./parents/SearchResultsPage";
import SpecificShop from "./specificShopNew/SpecificShopPage";
import HistoryPage from "./parents/HistoryPage";
import FavoritesPage from "./parents/FavoritesPage";
import AuthenticationPage from "./Authentication/AuthenticationPage";
import MyShops from "./parents/MyShops";
import AddShop from "./parents/AddShop/AddShop";
import Header from "./Drawer/Header";
import * as actions from "../actions/authenticationActions";
import {fetchPendingRequestsCount, loadCategories} from "../actions/manager";
import {bindActionCreators} from 'redux';
import PendingShops from "./parents/PendingShops";
import Categories from "./parents/Categories";
import Markets from "./parents/Markets";
import AboutPage from "./parents/AboutPage";
import Register from "./Authentication/Register";
import Layout from "./helpers/Layout";
import SettingsPage from "./parents/SettingsPage";
import StorePage from "./parents/Store/StorePage";
import Topup from "./parents/TopUp/Topup";
import MoneyAdmin from "./parents/MoneyAdmin";

class MainApp extends Component {
    constructor(props, context) {
        super(props, context);
        if (props.pendingCount === -1 && props.state.token !== '')
            props.managerActions[0](props.state.token);
        if (!props.loadedCategories)
            props.managerActions[1]();
        this.state = {
            textValue: ''
        }
    }

    categoryClicked = text => {
        this.setState({textValue: text});
    };

    render() {
        const title = (this.props.state.token === '' ? 'Tedooo' : ((this.props.state.admin ? 'Hey boss ' : 'Welcome back ') + this.props.state.firstName) + '!');
        /*
        * <Header pendingCount={this.props.pendingCount}
                                            logOut={this.props.actions.logOut} history={this.props.history}
                                            auth={this.props.state} title={title}/>*/
        return (
            <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
                <BrowserRouter>
                    <div style={{
                        height: '100%',
                        overflow: 'auto',
                        width: '100%',
                    }}>
                        <Header
                            user={this.props.state && this.props.state.firstName}
                            textValue={this.state.textValue} title={title}
                                pendingCount={this.props.pendingCount}
                                favCount={Array.isArray(this.props.favorites) && this.props.favorites.length}
                                logOut={this.props.actions.logOut} history={this.props.history}
                                auth={this.props.state}
                        />
                        <Switch>
                            <Route exact path='/' render={() => <SearchPage
                                catClicked={this.categoryClicked}/>}/>
                            <Route exact path='/results' component={SearchResults}/>
                            <Route exact path='/history' component={HistoryPage}/>
                            <Route exact path='/favorites' component={FavoritesPage}/>
                            <Route exact path='/login' component={AuthenticationPage}/>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/myshops' component={MyShops}/>
                            <Route exact path='/addshop' component={AddShop}/>
                            <Route exact path='/addshop/:id' component={AddShop}/>
                            <Route exact path='/pending' component={PendingShops}/>
                            <Route exact path='/store' component={StorePage}/>
                            <Route exact path='/settings' component={SettingsPage}/>
                            <Route exact path='/categories' component={Categories}/>
                            <Route exact path='/markets' component={Markets}/>
                            <Route exact path='/about' component={AboutPage}/>
                            <Route exact path='/layout' component={Layout}/>
                            <Route exact path='/topup' component={Topup}/>
                            <Route exact path='/money' component={MoneyAdmin}/>
                            <Route path='/results/:id' component={SpecificShop}/>
                        </Switch>
                    </div>

                </BrowserRouter>
                <div style={{height: 30}} />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        state: state.saved.authentication,
        pendingCount: state.session.pendingMoneyRequest,
        loadedCategories: state.session.loadedCategories,
        favorites: state.saved.local.favorites
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        managerActions: bindActionCreators([fetchPendingRequestsCount, loadCategories], dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);