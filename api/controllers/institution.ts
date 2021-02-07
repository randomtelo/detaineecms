import InstitutionModel from '../models/InstitutionModel';

async function getCountys(ctx: any) {
    const query =  await InstitutionModel.GetCountys().then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = query;
}

async function getInstitutions(ctx: any) {
    const query =  await InstitutionModel.GetInstitutions().then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = query;
}


async function getInstitutionsByCounty(ctx: any) {
    const query =  await InstitutionModel.GetInstitutionsByCounty(ctx.params.id).then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = query;
}

async function getObservedInstitution(ctx: any) {
    const query =  await InstitutionModel.GetObservedInstitution(ctx.req.user._id).then(data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = query;
}


async function createObservedInstitution(ctx: any) {
    const query =  await InstitutionModel.CreateObservedInstitution(ctx.req.user._id, ctx.request.body).then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = query;
}

async function updateInstitution(ctx: any) {
    const query =  await InstitutionModel.UpdateInstitution(ctx.params.id, ctx.request.body).then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = '{"array":' + query + '}';
}

async function deleteInstitution(ctx: any) {
    const query =  await InstitutionModel.DeleteInstitution(ctx.params.id).then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = '{"array":' + query + '}';
}

export = {
    getCountys,
    getInstitutions,
    getInstitutionsByCounty,
    getObservedInstitution,
    createObservedInstitution,
    updateInstitution,
    deleteInstitution,
}