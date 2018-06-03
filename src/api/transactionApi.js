export default class TransactionApi {
    static async loadTransactions(token) {
        try {
            const response = await fetch(
                'https://baloofeathers.herokuapp.com/transactions/', {
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
}