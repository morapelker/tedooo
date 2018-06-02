import {
    ADD_SHOP_FAVORITE,
    ADD_SHOP_HISTORY, ADD_SHOP_SUCCESS, DELETE_FAVORITE_SHOP,
    DELETE_HISTORY_SHOP,
    FIND_SHOP_SUCCESS, SHOP_ALTERED, SHOP_DELETED, UPDATE_AVATAR, UPDATE_MY_SHOPS
} from "./shopConstants";
import shopApi from '../api/shopApi';

export function findShopSuccess(shops) {
    return {
        type: FIND_SHOP_SUCCESS,
        shops
    }
}

export function updateMyShops(shops) {
    return {
        type: UPDATE_MY_SHOPS,
        shops
    }
}

export function alterShopSuccess(shop) {
    return {
        type: SHOP_ALTERED,
        shop
    }
}

export function deleteShopSuccess(id) {
    return {
        type: SHOP_DELETED,
        id
    }
}

export function addShopSuccess(shop) {
    return {
        type: ADD_SHOP_SUCCESS,
        shop
    }
}

export function addShopHistory(shop) {
    return {
        type: ADD_SHOP_HISTORY,
        shop
    }
}


export function updateAvatar(id, avatar) {
    return {
        type: UPDATE_AVATAR,
        id,  avatar
    }
}

export function deleteHistoryShop(id) {
    return {
        type: DELETE_HISTORY_SHOP,
        id
    }
}

export function deleteFavoriteShop(id) {
    return {
        type: DELETE_FAVORITE_SHOP,
        id
    }
}

export function addShopFavorites(id, name, favName, avatar) {
    return {
        type: ADD_SHOP_FAVORITE,
        id, name, favName, avatar
    }
}

export function findShopById(id) {
    return function(dispatch) {
        return shopApi.findShopById(id).then(shops => {
            dispatch(findShopSuccess([shops]));
        }).catch(error => {
            throw(error);
        });
    };
}

export function findShop(props) {
    return function(dispatch) {
        return shopApi.findShop(props).then(shops => {
            dispatch(findShopSuccess(shops));
        }).catch(error => {
            throw(error);
        });
    };
}

export function addShop(shop, token) {
    return function(dispatch) {
        return shopApi.addShop(shop, token).then(shop => {
            dispatch(addShopSuccess(shop));
        }).catch(error => {
            throw(error);
        });
    };
}

export function alterShop(id, props, token) {
    return function(dispatch) {
        return shopApi.alterShop(id, props, token).then(shop => {
            dispatch(alterShopSuccess(shop));
        }).catch(error => {
            throw(error);
        });
    };
}

export function deleteShop(id, token) {
    return function(dispatch) {
        return shopApi.deleteShop(id, token).then(shop => {
            dispatch(deleteShopSuccess(shop._id));
        }).catch(error => {
            throw(error);
        });
    };
}