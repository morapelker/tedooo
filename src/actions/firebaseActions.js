import {FIREBASE_INIT} from "./managerConstants";
import * as firebase from 'firebase/app';
import 'firebase/storage';

export function firebaseInitialized() {
    return {
        type: FIREBASE_INIT, storageRef: true
    }
}

async function actualInit() {
    try {
        const config = {
            apiKey: "AIzaSyC8pGP8wWTCJ5Dwj42bnwqExdnIiooFfIQ",
            projectId: "fir-imageupload-b88e2",
            storageBucket: "fir-imageupload-b88e2.appspot.com",
            messagingSenderId: "410862309349"
        };
        firebase.initializeApp(config);
        return true;
    } catch (error) {
        throw new Error('Failed to create market');
    }
}

export function initFirebase() {
    return function(dispatch) {
        return actualInit().then(() => {
            dispatch(firebaseInitialized());
        }).catch(err=>{
            throw err;
        });
    };
}