import {
    AUTO_COMPLETE_LOADED,
    CREATE_MARKET_SUCCESS,
    LOAD_CATEGORY_SUCCESS,
    LOAD_MARKETS_SUCCESS,
    LOAD_STORE_SUCCESS, START_AUTO_COMPLETE
} from "./managerConstants";
import managerApi from "../api/managerApi";

export function loadMarketsSuccess(markets) {
    return {
        type: LOAD_MARKETS_SUCCESS, markets
    }
}

export function startAutoComplete() {
    return {
        type: START_AUTO_COMPLETE
    }
}

export function autoCompleteSuccess(requestId, items) {
    return {
        type: AUTO_COMPLETE_LOADED, requestId, items
    }
}

export function loadCategoriesSuccess(categories) {
    return {
        type: LOAD_CATEGORY_SUCCESS, categories
    }
}

export function createMarketSuccess(market) {
    return {
        type: CREATE_MARKET_SUCCESS, market
    }
}

export function loadStoreSuccess(items) {
    return {
        type: LOAD_STORE_SUCCESS, items
    }
}

export function createMarket(market) {
    return function(dispatch) {
        return managerApi.createMarket(market).then(market => {
            dispatch(createMarketSuccess(market));
        }).catch(err=>{
            throw err;
        });
    };
}

export function loadAutoComplete(requestId, text) {
    return function(dispatch) {
        return managerApi.loadAutoComplete(text).then(items => {
            dispatch(autoCompleteSuccess(requestId, items));
        }).catch(err=>{
            throw err;
        });
    }
}

export function loadMarkets() {
    return function(dispatch) {
        return managerApi.loadMarkets().then(markets => {
            dispatch(loadMarketsSuccess(markets));
        }).catch(err=>{
            throw err;
        });
    };
}

export function loadCategories() {
    return function(dispatch) {
        return managerApi.loadCategories().then(categories => {
            dispatch(loadCategoriesSuccess(categories));
        }).catch(err=>{
            throw err;
        });
    };
}

export function loadStoreItems() {
    return function(dispatch) {
        return managerApi.loadStoreItems().then(items => {
            dispatch(loadStoreSuccess(items));
        }).catch(err=>{
            throw err;
        });
    };
}