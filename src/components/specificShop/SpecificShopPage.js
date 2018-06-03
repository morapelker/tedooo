import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/shopActions'
import * as transactionActions from "../../actions/storeActions";
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
                ownShop: shop.userId === props.authentication.userId,
                editing: false
            };
        } else {
            this.state = {
                shop: {},
                busy: true,
                addingToFavorites: false,
                favoritesName: '',
                editing: false
            };
            this.props.actions.findShopById(this.props.match.params.id).then(() => {
                const shop = this.props.cachedShops[this.props.match.params.id];
                if (shop !== undefined) {
                    if (shop.img_links && shop.img_links.length > 0)
                        this.props.actions.updateAvatar(shop._id, shop.img_links[0]);
                    this.setState({
                        busy: false,
                        shop,
                        addingToFavorites: false,
                        favoritesName: shop.name,
                        ownShop: shop.userId === props.authentication.userId,
                        editing: false
                    });
                } else {
                    this.setState({
                        shop: undefined,
                        busy: false,
                        addingToFavorites: false,
                        favoritesName: '',
                        editing: false
                    });
                }
            });
        }
        if (!this.props.transactions && this.props.authentication.token.length > 0) {
            console.log('load transactions');
            this.props.transactionActions.loadTransactions(this.props.authentication.token)
        }
    }

    placeImage = (index, item) => {
        console.log(index,  item);
    };

    startEditing = (item) => {
        console.log(item);
        this.setState({
            editing: true
        });
    };

    render() {
        return (
            <div className={'specificShopContainer'} style={{
                height: '100%'
            }}>
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
                                          transactions={this.props.transactions}
                                          edit={this.state.editing}
                                          editSelector={this.startEditing}
                                          placeImageSelector={this.placeImage}
                                          shop={this.state.shop}/>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.saved.authentication,
        cachedShops: state.shops.cachedShops,
        transactions: state.transactions.transactions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        transactionActions: bindActionCreators(transactionActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificShopPage);