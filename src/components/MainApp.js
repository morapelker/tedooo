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
import TopBar from "./common/TopBar";
import * as actions from "../actions/authenticationActions";
import {bindActionCreators} from 'redux';

const style = {
    bar: {
        backgroundColor: '#3CBF95',
        boxShadow: 'none',
        width: '5%'
    },
    dot: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 40
    },
    dotContainer: {
        display: 'flex',
        width: 310,
        marginTop: 10,
        margin: '0 auto',
        justifyContent: 'space-around'
    }

};

class MainApp extends Component {

    render() {
        return (
            <div style={{height: '100%'}}>
                <BrowserRouter>
                    <TopBar logOut={this.props.actions.logOut} auth={this.props.state}>
                        <div style={{height: '100%'}}>
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
                    </TopBar>
                </BrowserRouter>
                <div style={{
                    margin: '0 auto',
                    pointerEvents: 'none',
                    position: 'absolute',
                    width: '100%',
                    top: 10,
                    zIndex: 999,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={style.dotContainer}>
                        <span style={style.dot}/>
                        <span style={style.dot}/>
                        <span style={style.dot}/>
                    </div>
                    <h3 style={{color: 'white', marginTop: 10}}>Tedooo</h3>
                </div>
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