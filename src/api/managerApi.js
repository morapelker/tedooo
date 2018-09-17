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

    static async loadCategories() {
        try{
            let response = await fetch(
                URL + 'categories/'
            );
            const json = await response.json();
            return json.data;
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

    static async createMarket(market) {
        try {
            const response = await fetch(
                URL + 'markets/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(market)
                }
            );
            return await response.json().data;
        } catch (error) {
            throw new Error('Failed to create market');
        }
    }
}

export default managerApi;