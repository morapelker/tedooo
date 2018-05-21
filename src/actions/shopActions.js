import {
    ADD_SHOP_FAVORITE,
    ADD_SHOP_HISTORY, DELETE_FAVORITE_SHOP,
    DELETE_HISTORY_SHOP,
    FIND_SHOP_SUCCESS, UPDATE_MY_SHOPS
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

export function addShopHistory(shop) {
    return {
        type: ADD_SHOP_HISTORY,
        shop
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

export function addShopFavorites(id, name, favName) {
    return {
        type: ADD_SHOP_FAVORITE,
        id, name, favName
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