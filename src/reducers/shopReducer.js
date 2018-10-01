import {
    ADD_SHOP_SUCCESS,
    FIND_SHOP_SUCCESS, RESET_TRIP_ARRAY,
    SHOP_ALTERED, SHOP_DELETED,
    UPDATE_MY_SHOPS, UPDATE_TRIP_ARRAY
} from "../actions/shopConstants";
import {LOGOUT} from "../actions/authenticationConstants";

export default (state = {
    results: [],
    cachedShops: {},
    myShops: undefined,
    pendingShops: undefined,
    lastAddedId: ''
}, action) => {
    switch (action.type) {
        case ADD_SHOP_SUCCESS: {
            const {shop} = action;
            const cachedShops = Object.assign({}, state.cachedShops);
            cachedShops[shop._id] = shop;
            return Object.assign({}, state, {cachedShops, lastAddedId: shop._id});
        }
        case RESET_TRIP_ARRAY: {
            return Object.assign({}, state, {trip: undefined})
        }
        case UPDATE_TRIP_ARRAY: {
            const {startIndex, query} = action;
            if (Array.isArray(state.trip)) {
                const trip = [...state.trip];
                for (let i = 0; i < action.shops.length; i++) {
                    if (trip.length > startIndex + i)
                        trip[i + startIndex] = action.shops[i]._id;
                }
                return Object.assign({}, state, {trip, query});
            } else {
                const trip = [];
                for (let i = 0; i < action.total; i++) {
                    if (i >= action.startIndex && i < action.startIndex + action.shops.length)
                        trip.push(action.shops[i - action.startIndex]._id);
                    else
                        trip.push(undefined);
                }
                return Object.assign({}, state, {trip, query});
            }
        }
        case SHOP_DELETED: {
            const {id} = action;
            const cachedShops = Object.assign({}, state.cachedShops);
            cachedShops[id] = undefined;
            const myShops = Object.assign([], state.myShops);
            const index = myShops.map(shop => shop._id).indexOf(id);
            if (index >= 0)
                myShops.splice(index, 1);
            return Object.assign({}, state, {cachedShops, myShops});
        }
        case SHOP_ALTERED: {
            const {shop} = action;
            const cachedShops = Object.assign({}, state.cachedShops);
            cachedShops[shop._id] = shop;
            return Object.assign({}, state, {cachedShops, lastAddedId: shop._id});
        }
        case FIND_SHOP_SUCCESS: {
            const cachedShops = Object.assign({}, state.cachedShops);
            let pendingShops;
            if (!state.pendingShops)
                pendingShops = [];
            else
                pendingShops = Object.assign([], state.pendingShops);
            action.shops.forEach(shop => {
                if (!cachedShops.hasOwnProperty(shop._id))
                    cachedShops[shop._id] = shop;
                if (shop.authorized === '0') {
                    const index = pendingShops.map(shop => shop._id).indexOf(shop._id);
                    if (index === -1)
                        pendingShops.push({
                            _id: shop._id,
                            name: shop.name,
                            shop_number: shop.shop_number
                        });
                } else if (pendingShops) {
                    const index = pendingShops.map(shop => shop._id).indexOf(shop._id);
                    if (index !== -1)
                        pendingShops.splice(index, 1);
                }
            });
            if (pendingShops) {
                return Object.assign({}, state, {results: action.shops, cachedShops, pendingShops});
            }
            return Object.assign({}, state, {results: action.shops, cachedShops});
        }
        case LOGOUT:
            return Object.assign({}, state, {myShops: undefined});
        case UPDATE_MY_SHOPS: {
            const cachedShops = Object.assign({}, state.cachedShops);
            action.shops.forEach(shop => {
                if (!cachedShops.hasOwnProperty(shop._id))
                    cachedShops[shop._id] = shop;
            });
            return Object.assign({}, state, {cachedShops});
        }
        default:
            return state;
    }
}