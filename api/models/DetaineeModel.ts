import { DetaineeModel } from '../db/schemas';

async function GetDetainees() {
    let mongooseQuery = await DetaineeModel.find();
    return mongooseQuery;
}

async function GetDetaineesByInstitution(institutionId: string) {
    let mongooseQuery = await DetaineeModel.find({ observedInstitution: institutionId });
    return mongooseQuery;
}

async function CreateDetainee(detainee) {
    console.log('CreateDetainee: ', detainee);
    let newDetainee = DetaineeModel.create({
        сounty: detainee.сounty ? detainee.сounty : null,
        observedInstitution: detainee.institution ? detainee.institution : null,
        fio: detainee.fio ? detainee.fio : null,
        dateDetention: detainee.dateDetention ? detainee.dateDetention : null,
        personsNearby: detainee.personsNearby ? detainee.personsNearby : null,
        contact: detainee.contact ? detainee.contact : null,
        specific: detainee.specific ? detainee.specific : null, //Особые пожелания
        comment: detainee.comment ? detainee.comment : null, //Комментарий
        courier: detainee.courier ? detainee.courier : null, //Кто везёт передачу
        article: detainee.article ? detainee.article : null,
    });
}

async function UpdateDetainee(detaineeId, detainee) {
    let mongooseQuery = await DetaineeModel.find();
    return mongooseQuery;
}

async function DeleteDetainee(detaineeId) {
    let mongooseQuery = await DetaineeModel.findByIdAndDelete(detaineeId)
    .catch(e => e);
    return mongooseQuery;
}

export = {
    GetDetainees,
    GetDetaineesByInstitution,
    CreateDetainee,
    UpdateDetainee,
    DeleteDetainee,
}