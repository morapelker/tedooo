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
import TripNavigator from "./TripNavigator";
import shopApi from "../../api/shopApi";

class SpecificShopPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            addingToFavorites: false,
            editing: false,
            loadingImage: {},
        };
        this.loadShop(props, 1);
    }

    componentWillReceiveProps(nextProps, context) {
        if (this.props.match.params.id !== nextProps.match.params.id)
            this.loadShop(nextProps, 2);
    }

    loadShop = (props, type) => {
        const shop = deepCloneObject(props.cachedShops[props.match.params.id]);
        if (shop) {
            document.title = 'Tedooo - ' + shop.shop_number;
            const obj = {
                shop,
                busy: false,
                favoritesName: shop.name,
                ownShop: shop.userId === props.authentication.userId
            };
            if (type === 1)
                Object.assign(this.state, obj);
            else
                this.setState(Object.assign({}, obj, {
                    addingToFavorites: false,
                    editing: false,
                    loadingImage: {}
                }));
        } else {
            const obj = {
                shop: {},
                busy: true,
                favoritesName: '',
                ownShop: false
            };
            if (type === 1)
                Object.assign(this.state, obj);
            else
                this.setState(Object.assign({}, obj, {
                    addingToFavorites: false,
                    editing: false,
                    loadingImage: {}
                }));
            props.actions.findShopById(props.match.params.id).then(() => {
                const shop = deepCloneObject(this.props.cachedShops[props.match.params.id]);
                if (shop !== undefined) {
                    document.title = 'Tedooo - ' + shop.shop_number;
                    if (shop.img_links && shop.img_links.length > 0)
                        props.actions.updateAvatar(shop._id, shop.img_links[0]);
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
        if (!props.transactions && props.authentication.token.length > 0)
            props.transactionActions.loadTransactions(props.authentication.token)
    };

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
            this.setState({
                editing: false,
                loadingImage: alterObject(this.state.loadingImage, index, false)
            })
        });

    };

    startEditing = (item) => {
        if (item.text === 'getMore')
            this.props.history.push('/store');
        else {
            this.setState({
                editing: true,
                pickedUpItem: item
            });
        }
    };

    leftClicked = () => {
        const curId = this.props.match.params.id;
        const index = this.props.trip.indexOf(curId);
        if (this.props.trip[index - 1])
            this.props.history.replace('/results/' + this.props.trip[index - 1]);
        else {
            const query = Object.assign({}, this.props.query);
            query.$limit = 10;
            query.$skip = index - 10 < 0 ? 0 : (index - 10);
            this.setState({busy: true, shop: undefined});
            shopApi.findShop(query).then(shops => {
                this.props.actions.findShopSuccess(shops.data);
                this.props.actions.updateTripArray(query.$skip, shops.data, query, shops.total);
                if (this.props.trip[index - 1])
                    this.props.history.replace('/results/' + this.props.trip[index - 1]);
                else
                    this.setState({busy: false});
            });
        }
    };

    rightClicked = () => {
        const curId = this.props.match.params.id;
        const index = this.props.trip.indexOf(curId);
        if (this.props.trip[index + 1])
            this.props.history.replace('/results/' + this.props.trip[index + 1]);
        else {
            const query = Object.assign({}, this.props.query);
            query.$limit = 10;
            query.$skip = index + 1;
            this.setState({busy: true, shop: undefined});
            shopApi.findShop(query).then(shops => {
                this.props.actions.findShopSuccess(shops.data);
                this.props.actions.updateTripArray(query.$skip, shops.data, query, shops.total);
                if (this.props.trip[index + 1])
                    this.props.history.replace('/results/' + this.props.trip[index + 1]);
                else
                    this.setState({busy: false});
            });
        }
    };

    render() {
        let right, left;
        if (this.props.trip) {
            left = true;
            right = true;
            const curId = this.props.match.params.id;
            const index = this.props.trip.indexOf(curId);
            if (index === -1) {
                left = false;
                right = false;
            } else {
                left = (index !== 0);
                right = (index !== this.props.trip.length);
            }
        } else {
            left = false;
            right = false;
        }
        return (
            <div className={'specificShopContainer'} style={{
                height: '100%'
            }}>
                {this.state.busy ?
                    <RefreshIndicator/>
                    : this.state.shop === undefined ? 'no data' :
                        <div style={{width: '100%', height: '100%'}}>
                            {(right || left) &&
                            <TripNavigator right={right} left={left} leftClicked={this.leftClicked}
                                           rightClicked={this.rightClicked}/>
                            }
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
                                              shop={this.state.shop}/>
                        </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.saved.authentication,
        cachedShops: state.shops.cachedShops,
        transactions: state.transactions.transactions,
        trip: state.shops.trip,
        query: state.shops.query
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        transactionActions: bindActionCreators(transactionActions, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecificShopPage));