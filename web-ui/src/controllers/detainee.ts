import { API } from '../api/index';
import Detainee from '../models/detainee';
import getLocalStorageJWT from '../utils/localStorageJWT';

const createDetainee = (detainee: Detainee) => {
    const jwt = getLocalStorageJWT();
    if (jwt) {
        return API.Detainee.detaineeCreate(jwt, detainee)
        .catch((error) => {
            console.log('Request error: ', error);
            return undefined;
        })
    }
}


const getDetaineeByInstitution = (institutionId: string): Promise<Detainee[] | undefined> | undefined => {
    const jwt = getLocalStorageJWT();
    if (jwt) {
        return API.Detainee.detaineeGetByInstitution(jwt, institutionId)
        .then((res: any) => res as unknown as Detainee[])
        .catch((error) => {
            console.log('Request error: ', error);
            return undefined;
        })
    }
}

const deleteDetainee = (detaineeId: string) => {
    const jwt = getLocalStorageJWT();
    if (jwt) {
        return API.Detainee.detaineeDelete(jwt, detaineeId)
        .catch((error) => {
            console.log('Request error: ', error);
            return undefined;
        })
    }
}

export default {
    createDetainee,
    getDetaineeByInstitution,
    deleteDetainee,
}