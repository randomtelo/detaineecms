import {
    CountyModel,
    InstitutionModel,
    ObservedInstitutionModel,
} from '../db/schemas';

async function GetInstitutions() {
    let mongooseQuery = await InstitutionModel.find();
    return mongooseQuery;
}

async function GetCountys() {
    let mongooseQuery = await CountyModel.find();
    return mongooseQuery;
}

async function GetInstitutionsByCounty(countyId: string) {
    let mongooseQuery = await InstitutionModel.find({ сounty: countyId });
    return mongooseQuery;
}

async function GetObservedInstitution(user: string) {
    const mongooseQuery = await ObservedInstitutionModel.find({ observerUser: user }).then( async (observedInstitution) => {
        const institution = observedInstitution.map( async (item) => {
            return await InstitutionModel.findById(item.observedInstitution);
        })
        const institutions = await Promise.all(institution);
        const institutionAndCounty =  institutions.map( async (item: any) => {
            const countyTitle = await CountyModel.findById(item.сounty);
            item.сounty = countyTitle;
            return item;
        })
        return await Promise.all(institutionAndCounty);
    });

    return mongooseQuery;
}

async function CreateObservedInstitution(user: string, observedInstitution: any) {
    ObservedInstitutionModel.create({
        observerUser: user,
        сounty: observedInstitution.сounty,
        observedInstitution: observedInstitution.observedInstitution,
    });
}

async function CreateInstitution(institution: any) {
    InstitutionModel.create({
        сounty: institution.сounty,
        titleShort: institution.titleShort,
        titleLong: institution.titleLong,
        district: institution.district, //Особые пожелания
        address: institution.address,
        contact: institution.contact,
        siteJ: institution.siteJ, // Сайт какого то Жени
        site: institution.site, // Официальный сайт
        latitude: institution.latitude, // Широта
        longitude: institution.longitude,
    });
}

async function UpdateInstitution(institutionId: string, institution: any) {
    let mongooseQuery = await InstitutionModel.findByIdAndUpdate(institutionId , {
        сounty: institution.сounty,
        titleShort: institution.titleShort,
        titleLong: institution.titleLong,
        district: institution.district, //Особые пожелания
        address: institution.address,
        contact: institution.contact,
        siteJ: institution.siteJ, // Сайт какого то Жени
        site: institution.site, // Официальный сайт
        latitude: institution.latitude, // Широта
        longitude: institution.longitude,
    } , (err: any, newInstitution: any) => {
        if (err) { return err; }
        return newInstitution;
    });
    return mongooseQuery;
}

async function DeleteInstitution(institutionId: string) {
    let mongooseQuery = await InstitutionModel.findByIdAndDelete(institutionId)
    .catch((e: any) => e);
    return mongooseQuery;
}

export = {
    GetCountys,
    GetInstitutions,
    GetInstitutionsByCounty,
    CreateInstitution,
    GetObservedInstitution,
    CreateObservedInstitution,
    UpdateInstitution,
    DeleteInstitution,
}