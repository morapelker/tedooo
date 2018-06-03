import {TRANSACTIONS_LOADED} from "./storeConstants";
import transactionsApi from '../api/transactionApi';


export function transactionsLoaded(transactions) {
    return {
        type: TRANSACTIONS_LOADED, transactions
    }
}

export function loadTransactions(token) {
    return function(dispatch) {
        return transactionsApi.loadTransactions(token).then(transactions => {
            dispatch(transactionsLoaded([
                {
                    _id: 'ab',
                    used: 1,
                    name: 'cat moving hand - black'
                }, {
                    _id: 'abs',
                    used: 1,
                    purchased_id: 'aaa',
                    name: 'cat moving hand - gray'
                }, {
                    _id: 'abs',
                    used: 1,
                    purchased_id: 'aaa',
                    name: 'cat moving hand - gray'
                }, {
                    _id: 'abs',
                    used: 1,
                    purchased_id: 'aaa',
                    name: 'cat moving hand - gray'
                }, {
                    _id: 'abs',
                    used: 1,
                    purchased_id: 'aaa',
                    name: 'cat moving hand - gray'
                }, {
                    _id: 'abs',
                    used: 1,
                    purchased_id: 'aaa',
                    name: 'cat moving hand - gray'
                }, {
                    _id: 'abs',
                    used: 1,
                    purchased_id: 'aaa',
                    name: 'cat moving hand - gray'
                }, {
                    _id: 'abs',
                    used: 1,
                    purchased_id: 'aaa',
                    name: 'cat moving hand - gray'
                }, {
                    _id: 'abs',
                    used: 1,
                    purchased_id: 'aaa',
                    name: 'cat moving hand - gray'
                }, {
                    _id: 'abs',
                    used: 1,
                    purchased_id: 'aaa',
                    name: 'cat moving hand - gray'
                }
                ]));
        }).catch(err=>{
            throw err;
        });
    };
}