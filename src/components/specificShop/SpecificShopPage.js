import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/shopActions'
import {bindActionCreators} from 'redux';
import SpecificShopData from "./SpecificShopData";
import RefreshIndicator from "../common/RefreshIndicator";
import './SpecificShop.css'

class SpecificShopPage extends Component {

    constructor(props, context) {
        super(props, context);
        const shop = props.cachedShops[this.props.match.params.id];
        if (shop !== undefined) {
            this.state = {
                shop,
                busy: false,
                addingToFavorites: false,
                favoritesName: shop.name,
                ownShop: shop.userId === props.authentication.userId
            };
        } else {
            this.state = {
                shop: {},
                busy: true,
                addingToFavorites: false,
                favoritesName: ''
            };
            this.props.actions.findShopById(this.props.match.params.id).then(() => {
                const shop = this.props.cachedShops[this.props.match.params.id];
                if (shop !== undefined) {
                    this.setState({
                        busy: false,
                        shop,
                        addingToFavorites: false,
                        favoritesName: shop.name,
                        ownShop: shop.userId === props.authentication.userId
                    });
                } else {
                    this.setState({
                        shop: undefined,
                        busy: false,
                        addingToFavorites: false,
                        favoritesName: ''
                    });
                }
            });
        }
    }

    render() {
        return (
            <div className={'specificShopContainer'}>
                {this.state.busy ?
                    <RefreshIndicator />
                    : this.state.shop === undefined ? 'no data' :
                        <SpecificShopData imgSelected={this.imageSelected}
                                          addFavoritesAction={this.props.actions.addShopFavorites}
                                          bigImgSrc={this.state.bigImgSrc}
                                          ownShop={this.state.ownShop}
                                          admin={this.props.authentication.admin}
                                          actions={this.props.actions}
                                          token={this.props.authentication.token}
                                          shop={this.state.shop}/>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.saved.authentication,
        cachedShops: state.shops.cachedShops
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificShopPage);