import { API } from '../api/index';
import Store from '../effectorStore';
import { User } from '../models/user';


function getLocalStorageJWT() {
    const jwt = localStorage.getItem('jwt')
    if(jwt) {
        Store.userCredentials.setToken(jwt);
    }
}

function initialAuth() {
    // Get user credential with local storage

}

function validAuth(username: string, password: string) {
    // fetch login
    API.Autorization.Login(username, password)
    .then((response) => {
        if (response.token) {
            //console.log('response.token: ', response.token);
            Store.userCredentials.setToken(response.token);
        }
    })
    .catch((error) => {
        console.log('Request error: ', error);
    });
}

function updateAuth(jwt: string) {
    // fetch user credential
    API.Autorization.UserCredentials(jwt)
    .then((response: any) => {
        console.log('response: ', response);
        Store.userCredentials.setStore({
            capperDescription: response.capperDescription,
            capperName: response.capperName,
            capperRank: response.capperRank,
            id: response.user._id,
            imageLink: response.imageLink,
            password: response.password,
            userlevel: response.user.userlevel,
            username: response.user.username,
        } as unknown as User);
    })
    .catch((error) => {
        console.log('Request error: ', error);
    })
}

function clearAuth() {
    // clear storage, clear local storage
    Store.userCredentials.setStore(null);
}

export default {
    getLocalStorageJWT,
    initialAuth,
    validAuth,
    updateAuth,
    clearAuth,
}