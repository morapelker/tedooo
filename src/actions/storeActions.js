import {ITEM_PURCHASED, TRANSACTIONS_LOADED} from "./storeConstants";
import transactionsApi from '../api/transactionApi';


export function transactionsLoaded(transactions) {
    return {
        type: TRANSACTIONS_LOADED, transactions
    }
}

export function purchaseItemSuccessful(item) {
    return {
        type: ITEM_PURCHASED, item
    }
}

export function purchaseItem(item, token) {
    return function (dispatch) {
        return transactionsApi.purchaseItem(item, token).then(transaction => {
            dispatch(purchaseItemSuccessful(transaction));
        }).catch(err => {
            throw err;
        });
    };
}

export function loadTransactions(token) {
    return function (dispatch) {
        return transactionsApi.loadTransactions(token).then(transactions => {
            dispatch(transactionsLoaded(transactions));
        }).catch(err => {
            throw err;
        });
    };
}