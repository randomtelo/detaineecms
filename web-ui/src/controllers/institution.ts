import { API } from '../api/index';
import Institution from '../models/institution';
import ObservedInstitution from '../models/observedInstitution';
import getLocalStorageJWT from '../utils/localStorageJWT';

const getInstitutionsByCounty = (jwt: string, countyId: string): Promise<Institution[] | undefined> => {
    return API.Institution.getInstitutionsByCounty(jwt, countyId)
    .then((res: any) => res as unknown as Institution[])
    .catch((error) => {
        console.log('Request error: ', error);
        return undefined;
    })
}

const getObservedInstitution = (): Promise<Institution[] | undefined> | undefined => {
    const jwt = getLocalStorageJWT();
    if (jwt) return API.Institution.getObservedInstitution(jwt)
    .then((res: any) => res as unknown as Institution[])
    .catch((error) => {
        console.log('Request error: ', error);
        return undefined;
    })
}

const createObservedInstitution = (observedInstitution: ObservedInstitution) => {
    const jwt = getLocalStorageJWT();
    if (jwt) {
        return API.Institution.createObservedInstitution(jwt, observedInstitution)
        .then((res: any) => res as unknown as Institution[])
        .catch((error) => {
            console.log('Request error: ', error);
            return undefined;
        })
    }
    
}

const updateInstitution = (jwt: string, institutionId: string, institution: Institution) => {

}

const deleteInstitution = (jwt: string, institutionId: string) => {

}

export default {
    getObservedInstitution,
    createObservedInstitution,
    getInstitutionsByCounty,
    updateInstitution,
    deleteInstitution,
}