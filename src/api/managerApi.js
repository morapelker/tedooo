import {URL} from './apiConstants';


class managerApi {
    static async loadMarkets() {
        try {
            let response = await fetch(
                URL + 'markets/'
            );
            let responseJson = await response.json();
            return responseJson.data;
        } catch (error) {
            return [];
        }
    }

    static async changeAvatar(token, avatar, id) {
        if (token.length === 0 || id.length === 0)
            throw new Error('');
        const response = await fetch(
            URL + 'users/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    avatar
                })
            }
        );
        return response.ok;
    }

    static async loadCategories() {
        try {
            let response = await fetch(
                URL + 'categories/'
            );
            let responseJson = await response.json();
            return responseJson.data;
        } catch (error) {
            return [];
        }
    }

    static async loadAutoComplete(text) {
        if (text.length === 0)
            return [];
        try {
            let response = await fetch(
                URL + 'autocomplete?text=' + text
            );
            if (!response.ok)
                return [];
            return await response.json();
        } catch (error) {
            return [];
        }
    }

    static async fetchPendingMoneyCount(token) {
        if (token.length === 0)
            return 0;
        try {
            const response = await fetch(
                URL + 'topup?pending=true&$limit=0', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
            );
            if (response.ok) {
                const json = await response.json();
                return json.total;
            }
            return 0;
        } catch (error) {
            return 0;
        }
    }

    static async completeMoneyRequest(id, token, receipt) {
        if (token.length === 0)
            return false;
        try {
            const response = await fetch(
                URL + 'topup/' + id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({pending: false, receipt})
                }
            );
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    static async fetchPendingMoneyRequests(token, query) {
        if (token.length === 0)
            return [];
        try {
            const response = await fetch(
                URL + 'topup?' + query, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
            );
            if (response.ok)
                return await response.json();
            return [];
        } catch (error) {
            return [];
        }
    }

    static async loadStoreItems() {
        try {
            let response = await fetch(
                URL + 'store/'
            );
            let responseJson = await response.json();
            return responseJson.data;
        } catch (error) {
            return [];
        }
    }

    static async createMarket(market, token) {
        try {
            const response = await fetch(
                URL + 'markets/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(market)
                }
            );
            return await response.json().data;
        } catch (error) {
            throw new Error('Failed to create market');
        }
    }

    static async createCategory(category, token) {
        try {
            const response = await fetch(
                URL + 'categories/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(category)
                }
            );
            return await response.json();
        } catch (error) {
            throw new Error('Failed to create category');
        }
    }
}

export default managerApi;