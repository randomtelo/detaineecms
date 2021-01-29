import { server } from '../config';
import { User } from '../Models/user';
import { Version } from '../Models/version';

export namespace API {
    export namespace Autorization {
        export function Login(username: string, password: string) {
            return fetch(server.host + '/login/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                })
            }).then(response => response.json() as Promise<any>)
        };
        export async function UserCredentials<User>(jwt: string): Promise<User> {
            return fetch(server.host + '/getuser/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
            .then(response => response.json() as Promise<any>)
            .then(user => {
                return {
                    user
                } as unknown as User;
            });
        }
    }

    export namespace Detainee {
        export const institutionsGet = () => {

        };

        export const institutionCreate = () => {
            
        };

        export const institutionUpdate = () => {
            
        };

        export const institutionDelete = () => {

        };

        export const detaineeGet = () => {
            
        };
        export const detaineeCreate = () => {
            
        };
        export const detaineeUpdate = () => {
            
        };
        export const detaineeDelete = () => {
            
        };
    }

    export namespace User {
        export const userGet = () => {
            
        };
        export const userCreate = () => {
            
        };
        export const userrUpdate = () => {
            
        };
        export const userDelete = () => {
            
        };
    }
}