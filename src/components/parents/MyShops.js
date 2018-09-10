import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";
import shopApi from "../../api/shopApi";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import RefreshIndicator from "../common/RefreshIndicator";

class MyShops extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};

        if (props.shops === undefined && props.authentication.token !== '') {
            shopApi.findShop({userid: this.props.authentication.userId}).then(shops => {
                this.props.actions.updateMyShops(shops.data);
            }).catch(err => {
                console.log(err);

            })
        }
    }

    render() {
        return (
            <div>
                {this.props.shops === undefined && this.props.authentication.token !== '' &&
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <RefreshIndicator style={{alignSelf: 'center'}} />
                </div>}
                {this.props.authentication.token !== '' && this.props.shops !== undefined &&
                <GenericShopsPage
                    history={this.props.history}
                    addHistoryAction={this.props.actions.addShopHistory}
                    name={'My Shops'}
                                  shops={this.props.shops}/>}
                {this.props.authentication.token === '' && <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h4>You are logged out</h4>
                    <Button component={Link} to="/" variant='raised' color={'primary'}>Search</Button>
                    <Button style={{marginTop: 5}} component={Link} to="/login" variant='raised' color={'secondary'}>Login</Button>

                </div>}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.saved.authentication,
        shops: state.shops.myShops
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyShops);