import jwt_decode from 'jwt-decode';
import {URL} from './apiConstants';

class authenticationApi {

    static async register(user) {
        let response;
        try {
            response = await fetch(
                URL + 'users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                }
            );
        } catch (error) {
            throw Error("Couldn't register");
        }
        let responseJson = await response.json();
        if (!response.ok)
            throw Error(responseJson.data.message);
        return true;
    }

    static async login(username, password) {
        let response;
        try {
            response = await fetch(
                URL + 'authentication/', {
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
        const {userId, admin, avatar} = decoded;
        return {token, firstName, admin, userId, avatar};
    }
}

export default authenticationApi;