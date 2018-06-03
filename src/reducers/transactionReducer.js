import {TRANSACTIONS_LOADED} from "../actions/storeConstants";

export default (state = {transactions: undefined}, action) => {
    switch (action.type) {
        case TRANSACTIONS_LOADED:
            return {transactions: action.transactions};
        default:
            return state;
    }
}