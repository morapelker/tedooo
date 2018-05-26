import {CREATE_MARKET_SUCCESS, LOAD_MARKETS_SUCCESS} from "./managerConstants";
import managerApi from "../api/managerApi";

export function loadMarketsSuccess(markets) {
    return {
        type: LOAD_MARKETS_SUCCESS, markets
    }
}

export function createMarketSuccess(market) {
    return {
        type: CREATE_MARKET_SUCCESS, market
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

export function loadMarkets() {
    return function(dispatch) {
        return managerApi.loadMarkets().then(markets => {
            dispatch(loadMarketsSuccess(markets));
        }).catch(err=>{
            throw err;
        });
    };
}