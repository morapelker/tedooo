export default class TransactionApi {
    static async loadTransactions(token) {
        try {
            const response = await fetch(
                'https://baloofeathers.herokuapp.com/transactions/', {
                // 'http://localhost:3030/transactions/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                }
            );
            const responseJson = await response.json();
            return responseJson.data;
        } catch (error) {
            return [];
        }
    }

    static async purchaseItem(item, token) {
        const response = await fetch(
            'https://baloofeathers.herokuapp.com/transactions/', {
            // 'http://localhost:3030/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(item)
            }
        );
        if (!response.ok)
            throw new Error('Couldn\'t finish purchase');
        return await response.json();
    }
}