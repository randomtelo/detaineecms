import { API } from '../api/index';
import Institution from '../Models/institution';

const getInstitutions = (jwt: string): Institution[] => {
    return [];
}

const createInstitution = (jwt: string, institution: Institution) => {

}

const updateInstitution = (jwt: string, institutionId: string, institution: Institution) => {

}

const deleteInstitution = (jwt: string, institutionId: string) => {

}

export default {
    createInstitution,
    getInstitutions,
    updateInstitution,
    deleteInstitution,
}