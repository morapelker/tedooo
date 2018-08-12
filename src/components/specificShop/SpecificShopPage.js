import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/shopActions'
import * as transactionActions from "../../actions/storeActions";
import {bindActionCreators} from 'redux';
import SpecificShopData from "./SpecificShopData";
import RefreshIndicator from "../common/RefreshIndicator";
import './SpecificShop.css'
import {alterObject, cloneObjectOrUndefined, deepCloneObject} from "../helpers/helpers";
import {withRouter} from "react-router-dom";

class SpecificShopPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            addingToFavorites: false,
            editing: false,
            loadingImage: {}
        };
        const shop = deepCloneObject(this.props.cachedShops[this.props.match.params.id]);
        if (shop) {
            Object.assign(this.state, {
                shop,
                busy: false,
                favoritesName: shop.name,
                ownShop: shop.userId === props.authentication.userId
            });
        } else {
            Object.assign(this.state, {
                shop: {},
                busy: true,
                favoritesName: '',
                ownShop: false
            });
            this.props.actions.findShopById(this.props.match.params.id).then(() => {
                const shop = deepCloneObject(this.props.cachedShops[this.props.match.params.id]);
                if (shop !== undefined) {
                    if (shop.img_links && shop.img_links.length > 0)
                        this.props.actions.updateAvatar(shop._id, shop.img_links[0]);
                    this.setState({
                        busy: false,
                        shop,
                        favoritesName: shop.name,
                        ownShop: shop.userId === props.authentication.userId,
                    });
                } else {
                    this.setState({
                        shop: undefined,
                        busy: false,
                    });
                }
            });
        }
        if (!this.props.transactions && this.props.authentication.token.length > 0)
            this.props.transactionActions.loadTransactions(this.props.authentication.token)
    }

    deleteImage = index => {
        const shop = this.state.shop;
        if (!shop.items)
            shop.items = {};
        const replacedItem = cloneObjectOrUndefined(shop.items[index]);
        shop.items[index] = {};
        this.setState({loadingImage: alterObject(this.state.loadingImage, index, true)});
        this.props.actions.placeItem({
            shopId: shop._id,
            item: {},
            index
        }, this.props.authentication.token, replacedItem).then(() => {
            this.setState({
                shop,
                editing: false,
                loadingImage: alterObject(this.state.loadingImage, index, false)
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                editing: false,
                loadingImage: alterObject(this.state.loadingImage, index, false)
            })
        });

    };

    placeImage = (index) => {
        if (!this.state.editing)
            return;
        const shop = this.state.shop;
        if (!shop.items)
            shop.items = {};
        const replacedItem = cloneObjectOrUndefined(shop.items[index]);
        shop.items[index] = this.state.pickedUpItem;
        this.setState({loadingImage: alterObject(this.state.loadingImage, index, true)});
        this.props.actions.placeItem({
            item: this.state.pickedUpItem || {},
            index,
            shopId: shop._id
        }, this.props.authentication.token, replacedItem).then(() => {
            this.setState({
                shop,
                editing: false,
                loadingImage: alterObject(this.state.loadingImage, index, false)
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                editing: false,
                loadingImage: alterObject(this.state.loadingImage, index, false)
            })
        });

    };

    startEditing = (item) => {
        if (item.text==='getMore')
            this.props.history.push('/store');
        else {
            this.setState({
                editing: true,
                pickedUpItem: item
            });
        }
    };

    render() {
        return (
            <div className={'specificShopContainer'} style={{
                height: '100%'
            }}>
                {this.state.busy ?
                    <RefreshIndicator/>
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
                                          deleteImage={this.deleteImage}
                                          loadingImage={this.state.loadingImage}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecificShopPage));