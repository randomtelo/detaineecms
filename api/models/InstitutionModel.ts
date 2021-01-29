import { InstitutionModel } from '../db/schemas';

async function GetInstitutions() {
    let mongooseQuery = await InstitutionModel.find();
    return mongooseQuery;
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
    GetInstitutions,
    CreateInstitution,
    UpdateInstitution,
    DeleteInstitution,
}