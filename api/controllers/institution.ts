import InstitutionModel from '../models/InstitutionModel';

async function getInstitutions(ctx: any) {
    const query =  await InstitutionModel.GetInstitutions().then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = '{"array":' + query + '}';
}

async function createInstitution(ctx: any) {
    
    const query =  await InstitutionModel.CreateInstitution(ctx.request.body).then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = '{"array":' + query + '}';
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
    getInstitutions,
    createInstitution,
    updateInstitution,
    deleteInstitution,
}