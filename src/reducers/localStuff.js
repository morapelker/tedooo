import {
    ADD_SHOP_FAVORITE,
    ADD_SHOP_HISTORY,
    DELETE_FAVORITE_SHOP,
    DELETE_HISTORY_SHOP
} from "../actions/shopConstants";

export default (state = {history: [], favorites: []}, action) => {
    switch (action.type) {
        case ADD_SHOP_HISTORY: {
            const history = Object.assign([], state.history);
            const index = history.map(his => his._id).indexOf(action.shop._id);
            if (index !== 0) {
                if (index !== -1)
                    history.splice(index, 1);
                history.splice(0, 0, {_id: action.shop._id, name: action.shop.name, shopNumber: action.shop.shopNumber});
                return Object.assign({}, state, {history});
            } else {
                return state;
            }
        }
        case DELETE_HISTORY_SHOP: {
            const history = Object.assign([], state.history);
            const index = history.map(his => his._id).indexOf(action.id);
            if (index === -1)
                return state;
            history.splice(index, 1);
            return Object.assign({}, state, {history});
        }
        case DELETE_FAVORITE_SHOP: {
            const favorites = Object.assign([], state.favorites);
            const index = favorites.map(his => his._id).indexOf(action.id);
            if (index === -1)
                return state;
            favorites.splice(index, 1);
            return Object.assign({}, state, {favorites});
        }
        case ADD_SHOP_FAVORITE: {
            const favorites = Object.assign([], state.favorites);
            const index = favorites.map(his => his._id).indexOf(action.id);
            if (index === -1) {
                favorites.push({_id: action.id, name: action.name, favName: action.favName});
                return Object.assign({}, state, {favorites});
            } else {
                if (favorites[index].favName === action.favName)
                    return state;
                const fav = Object.assign({}, favorites[index]);
                fav.favName = action.favName;
                favorites[index] = fav;
                return Object.assign({}, state, {favorites});
            }
        }
        default:
            return state;
    }
}