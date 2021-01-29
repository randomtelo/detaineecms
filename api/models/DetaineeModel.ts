import { DetaineeModel } from '../db/schemas';

async function GetDetainees() {
    let mongooseQuery = await DetaineeModel.find();
    return mongooseQuery;
}

async function CreateDetainee(detainee) {
    let newForecast = new DetaineeModel.create({
        сounty: detainee.сounty,
        institution: detainee.institution,
        fio: detainee.fio,
        dateDetention: detainee.dateDetention,
        personsNearby: detainee.personsNearby,
        contact: detainee.contact,
        specific: detainee.specific, //Особые пожелания
        comment: detainee.comment, //Комментарий
        courier: detainee.courier, //Кто везёт передачу
        article: detainee.article,
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
    CreateDetainee,
    UpdateDetainee,
    DeleteDetainee,
}