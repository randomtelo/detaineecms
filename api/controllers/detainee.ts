import { error } from 'console';
import DetaineeModel from '../models/DetaineeModel';

async function getDetainees(ctx: any) {
    const query =  await DetaineeModel.GetDetainees().then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = '{"array":' + query + '}';
}

async function createDetainee(ctx: any) {
    const query =  await DetaineeModel.CreateDetainee(ctx.request.body).then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = '{"array":' + query + '}';
}

async function updateDetainee(ctx: any) {
    const query =  await DetaineeModel.UpdateDetainee(ctx.params.id, ctx.request.body).then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = '{"array":' + query + '}';
}

async function deleteDetainee(ctx: any) {
    const query =  await DetaineeModel.DeleteDetainee(ctx.params.id).then( data => { return JSON.stringify(data) }, error => {
        console.log('Err: ' + error);
    });
    ctx.body = '{"array":' + query + '}';
}

export = {
    getDetainees,
    createDetainee,
    updateDetainee,
    deleteDetainee,
}