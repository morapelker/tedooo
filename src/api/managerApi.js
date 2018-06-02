class managerApi {
    static async loadMarkets() {
        try {
            let response = await fetch(
                'https://baloofeathers.herokuapp.com/markets/'
            );
            let responseJson = await response.json();
            return responseJson.data;
        } catch (error) {
            return [];
        }
    }

    static async loadStoreItems() {
        try {
            let response = await fetch(
                'https://baloofeathers.herokuapp.com/store/'
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
                'https://baloofeathers.herokuapp.com/markets/', {
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