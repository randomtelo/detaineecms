import { server } from '../config';
import { User } from '../models/user';
import County from '../models/сounty';
import Institution from '../models/institution';
import ObservedInstitution from '../models/observedInstitution';
import Detainee from '../models/detainee';


export namespace API {
    export namespace Autorization {
        export async function Login(username: string, password: string) {
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


    export namespace County {
        export async function сountyGet(jwt: string): Promise<County[]> {
            return fetch(server.host + '/county/get/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
            .then(response => response.json() as Promise<any>)
            .then(institution => {
                return institution as unknown as County[];
            });
        };
    }

    export namespace Institution {
        export async function getInstitutionsByCounty(jwt: string, countyId: string) {
            return fetch(server.host + `/institution/getbycounty/${ countyId }`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
            .then(response => response.json() as Promise<any>)
            .then(institution => {
                return institution as unknown as Institution[];
            });
        }

        export async function institutionsGet(jwt: string): Promise<Institution[]> {
            return fetch(server.host + '/institution/get/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
            .then(response => response.json() as Promise<any>)
            .then(institution => {
                return institution as unknown as Institution[];
            });
        };
        
        export async function getObservedInstitution(jwt: string) {
            return fetch(server.host + '/observedinstitution/get/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
            .then(response => response.json() as Promise<any>)
            .then(institution => {
                return institution as unknown as ObservedInstitution[];
            });
        };

        export async function createObservedInstitution(jwt: string, observedInstitution: ObservedInstitution) {
            return fetch(server.host + '/observedinstitution/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
                body: JSON.stringify(observedInstitution)
            });
        };
        
        export async function institutionUpdate(jwt: string, institutionId: string, institution: Institution) {
            fetch(server.host + `/institution/update/${ institutionId }/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
                body: JSON.stringify(institution)
            });
        };
        
        export async function institutionDelete(jwt: string, institutionId: string) {
            fetch(server.host + `/institution/delete/${ institutionId }/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
        };
    }

    export namespace Detainee {
        export async function detaineeGet(jwt: string): Promise<Detainee[]> {
            return fetch(server.host + '/detainee/get/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
            .then(response => response.json() as Promise<any>)
            .then(institution => {
                return institution as unknown as Detainee[];
            });
        };
        
        export async function detaineeGetByInstitution(jwt: string, institutionId: string): Promise<Detainee[]> {
            return fetch(server.host + `/detainee/getbyinstitution/${ institutionId }`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
            .then(response => response.json() as Promise<any>)
            .then(institution => {
                return institution as unknown as Detainee[];
            });
        };

        export async function detaineeCreate(jwt: string, detainee: Detainee) {
            return fetch(server.host + '/detainee/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
                body: JSON.stringify(detainee)
            });
        };
        
        export async function detaineeUpdate(jwt: string, detaineeId: string, detainee: Detainee) {
            fetch(server.host + `/detainee/update/${ detaineeId }/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
                body: JSON.stringify(detainee)
            });
        };
        
        export async function detaineeDelete(jwt: string, detaineeId: string) {
            fetch(server.host + `/detainee/delete/${ detaineeId }/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
        };
    }

    export namespace User {
        export async function usersGet(jwt: string): Promise<User[]> {
            return fetch(server.host + '/user/get/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
            .then(response => response.json() as Promise<any>)
            .then(institution => {
                return institution as unknown as User[];
            });
        };
        
        export async function userCreate(jwt: string, user: User) {
            return fetch(server.host + '/user/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
                body: JSON.stringify(user)
            });
        };
        
        export async function userUpdate(jwt: string, userId: string, user: User) {
            fetch(server.host + `/user/update/${ userId }/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
                body: JSON.stringify(user)
            });
        };
        
        export async function userDelete(jwt: string, userId: string) {
            fetch(server.host + `/user/delete/${ userId }/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt,
                },
            })
        };
    }
}