import { createStore, combine, createEvent } from 'effector';
import Controllers from './../controllers';
import {
    User,
    UserCredentials,
} from '../Models/user';


const initUserCredential: User | null = null;
const initJwtToken: string | null = null; 

export const userCredential = createStore(initUserCredential as User | null);
export const token = createStore(initJwtToken as string | null);

export const userCredentialsChange  = createEvent<User | null>();
export const tokenStoreChange  = createEvent<string | null>();

userCredential.on(userCredentialsChange, (_, user) => user);
token.on(tokenStoreChange, (_, id) => id);

userCredential.watch(value => {
    console.log('userCredential: ', value)
})

token.watch(jwt => {
    if (jwt) {
        localStorage.setItem('jwt', jwt);
        Controllers.authController.updateAuth(jwt);
    }
})

const UserCredentials = combine(userCredential, token, (userCredentialStore, tokenStore) => {
    return {
        jwt: tokenStore,
        user: userCredentialStore,
    }
})

export default {
    store: UserCredentials,
    setToken: tokenStoreChange,
    setStore: userCredentialsChange,
}