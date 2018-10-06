import {
    CREATE_MARKET_SUCCESS,
    LOAD_CATEGORY_SUCCESS,
    LOAD_MARKETS_SUCCESS,
    LOAD_STORE_SUCCESS, PENDING_LOADED
} from "./managerConstants";
import managerApi from "../api/managerApi";

export function loadMarketsSuccess(markets) {
    return {
        type: LOAD_MARKETS_SUCCESS, markets
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

export function moneyPendingLoaded(count) {
    return {
        type: PENDING_LOADED, count
    }
}

export function createMarket(market, token) {
    return function(dispatch) {
        return managerApi.createMarket(market, token).then(market => {
            dispatch(createMarketSuccess(market));
        }).catch(err=>{
            throw err;
        });
    };
}

export function fetchPendingRequestsCount(token) {
    return function(dispatch) {
        return managerApi.fetchPendingMoneyCount(token).then(count => {
            dispatch(moneyPendingLoaded(count));
        }).catch(err=>{
            throw err;
        });
    };
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