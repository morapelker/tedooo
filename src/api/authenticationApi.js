import jwt_decode from 'jwt-decode';

class authenticationApi {
    static async login(username, password) {
        let response;
        try {
            response = await fetch(
                'https://baloofeathers.herokuapp.com/authentication/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        strategy: 'local',
                        username: username.toLowerCase(),
                        password: password
                    })
                }
            );
        } catch (error) {
            throw Error("Couldn't login");
        }
        let responseJson = await response.json();
        if (!response.ok)
            throw Error(responseJson.data.message);
        const token = responseJson.accessToken;
        const decoded = jwt_decode(token);
        const firstName = decoded.username;
        const { userId, admin } = decoded;
        return {token, firstName, admin, userId};
    }
}

export default authenticationApi;