import { AdminModel } from '../db/dbSchemas';

async function GetUsers(params:type) {
    
}

async function CreateUser(array) {
    let queryCapper;
    let newCapper = new AdminModel({
        username:  array.username,
        password: array.password,
        userlevel: 2,
        capperName: array.capperName,
        capperRank: array.capperRank,
        imageLink: array.imageLink,
        capperDescription: array.capperDescription,

    });
    newCapper.save(function (err, result) {
        if (err) return console.error(err);
        queryCapper = result;
    });
    return queryCapper;
}

async function UpdateUser(id, array){
    let queryCapper = await AdminModel.findOneAndUpdate({public: true, userlevel: 2, _id: id}, {
        capperName: array.capperName,
        capperRang: array.capperRang,
        capperDescription: array.capperDescription,
        imageLink: array.imageLink,
    });
    return queryCapper;
}

async function DeleteUser(id){
    let queryCapper = await AdminModel.findOneAndDelete({public: true, userlevel: 2, _id: id});
    return queryCapper;
}

export = {
    GetUsers,
    CreateUser,
    UpdateUser,
    DeleteUser,
}