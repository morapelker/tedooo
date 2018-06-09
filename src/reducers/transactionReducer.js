import {ITEM_PURCHASED, TRANSACTIONS_LOADED} from "../actions/storeConstants";
import {ITEM_PLACED} from "../actions/shopConstants";
import {
    deepCloneObject
} from "../components/helpers/helpers";

export default (state = {transactions: undefined}, action) => {
    switch (action.type) {
        case TRANSACTIONS_LOADED:
            return {transactions: action.transactions};
        case ITEM_PURCHASED:
            if (state.transactions) {
                const transactions = Object.assign([], state.transactions);
                transactions.push(action.item);
                return {transactions};
            } else
                return {transactions: [action.item]};
        case ITEM_PLACED:
            const transactions = deepCloneObject(state.transactions);
            if (transactions) {
                const index = transactions.map(transaction => transaction._id).indexOf(action.item._id);
                const replacedIndex = action.replacedItem ?
                    transactions.map(transaction => transaction._id).indexOf(action.replacedItem._id) :
                    -1;
                if (index !== -1)
                    transactions[index].used = true;
                if (replacedIndex !== -1)
                    transactions[replacedIndex].used = false;
                if (index !== -1 || replacedIndex !== -1)
                    return {transactions};
            }
            return state;
        default:
            return state;
    }
}