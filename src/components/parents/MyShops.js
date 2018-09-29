import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";
import shopApi from "../../api/shopApi";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import RefreshIndicator from "../common/RefreshIndicator";
import * as queryString from "query-string";

const MAX_SHOPS = 10;

class MyShops extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};


        const searchParams = queryString.parse(this.props.location.search);
        this.state.page = parseInt(searchParams.page, 0) || 1;
        this.findShops(this.state.page);
        document.title = 'Tedooo - My Shops';
    }

    findShops = page => {
        shopApi.findShop({
            userid: this.props.authentication.userId,
            $skip: (page - 1) * MAX_SHOPS,
            $limit: MAX_SHOPS
        }).then(shops => {
            this.props.actions.updateMyShops(shops.data);
            this.setState({shops: shops});
        }).catch(err => {
        })
    };

    handlePageChange = (page) => {
        if (page !== this.state.page) {
            this.props.history.push('/myshops?page=' + page);
        }
    };

    componentWillReceiveProps(nextProps) {
        this.reloadShops(nextProps);
    }

    reloadShops = (props) => {
        const searchParams = queryString.parse(props.location.search);
        const p = parseInt(searchParams.page || '1', 0);
        this.setState({
            shops: undefined,
            page: p
        }, () => {
            this.findShops(p);
        });
    };

    render() {
        return (
            <div style={{height: '100%'}}>
                {this.state.shops === undefined && this.props.authentication.token !== '' &&
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <RefreshIndicator style={{alignSelf: 'center'}}/>
                </div>}
                {this.props.authentication.token !== '' && this.state.shops &&
                <GenericShopsPage
                    history={this.props.history}
                    addHistoryAction={this.props.actions.addShopHistory}
                    name={'My Shops'}
                    pageChangeSelector={this.handlePageChange}
                    currentPage={this.state.page}
                    totalPages={this.state.shops.total}
                    shops={this.state.shops.data}/>}
                {this.props.authentication.token === '' && <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h4>You are logged out</h4>
                    <Button component={Link} to="/" variant='raised'
                            color={'primary'}>Search</Button>
                    <Button style={{marginTop: 5}} component={Link} to="/login" variant='raised'
                            color={'secondary'}>Login</Button>

                </div>}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.saved.authentication,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyShops);