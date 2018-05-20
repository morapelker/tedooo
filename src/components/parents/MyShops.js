import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";
import {RefreshIndicator} from "material-ui";
import shopApi from "../../api/shopApi";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

class MyShops extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};

        if (props.shops === undefined && props.authentication.token !== '') {
            console.log('find shops');
            shopApi.findShop({userid: this.props.authentication.userId}).then(shops => {
                this.props.actions.updateMyShops(shops);
            }).catch(err => {
                console.log(err);

            })
        }
        this.shopSelected = this.shopSelected.bind(this);
    }

    render() {
        return (
            <div>
                {this.props.shops === undefined && this.props.authentication.token !== '' &&
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <RefreshIndicator
                        size={50}
                        left={0}
                        top={0}
                        loadingColor="#FF9800"
                        status="loading"
                        style={{
                            backgroundColor: 'transparent',
                            position: 'relative',
                            alignSelf: 'center'
                        }}
                    />
                </div>}
                {this.props.authentication.token !== '' && this.props.shops !== undefined &&
                <GenericShopsPage name={'My Shops'} shopSelected={this.shopSelected}
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

    shopSelected(shopId, shopName) {
        this.props.history.push("/results/" + shopId);
        this.props.actions.addShopHistory(shopId, shopName);
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