import { AdminModel } from '../db/schemas';

async function GetUsers() {
    const mongooseQuery = await AdminModel.find({userlevel: 2});
    return mongooseQuery;
}

async function CreateUser(user: any) {
    let mongooseQuery;
    let newUser = new AdminModel({
        username:  user.username,
        password: user.username,
        userlevel: user.userlevel,
        contact: user.contact,
        сounty: user.сounty,
    });
    newUser.save(function (err, result) {
        if (err) return console.error(err);
        mongooseQuery = result;
    });
    return mongooseQuery;
}

async function UpdateUser(userId: string, user: any){
    let mongooseQuery = await AdminModel.findOneAndUpdate({userlevel: 2, _id: userId}, {
        username:  user.username,
        password: user.username,
        userlevel: user.userlevel,
        contact: user.contact,
        сounty: user.сounty,
    });
    return mongooseQuery;
}

async function DeleteUser(userId: string){
    let mongooseQuery = await AdminModel.findOneAndDelete({userlevel: 2, _id: userId});
    return mongooseQuery;
}

export = {
    GetUsers,
    CreateUser,
    UpdateUser,
    DeleteUser,
}