const UserModel = require('./../models/userModel');

const jwtsecret = "USyEcT7tjB1qIWaTgBjv"; // signing key for JWT
const jwt = require('jsonwebtoken'); // auth via JWT for hhtp

function CheckToken(token){
  let j = jwt.verify(token, jwtsecret , (err, decoded) => {
    if (err) return false;
    else return decoded;
  });
  return j;
}

async function getUser(ctx){
  try {
    let date = CheckToken(ctx.request.header.authorization.split(' ')[1]);
    await UserModel.GetUserPanel(date.id).then((query) => {
      ctx.body = JSON.stringify(query);
    });
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
}


async function getUsers(ctx) {
    try {
        let querry =  await UserModel.GetUsers();
        ctx.body = JSON.stringify(querry);
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
}

async function createUser(ctx) {
  try {
      let querry =  await UserModel.CreateUser(ctx.request.body);
      ctx.body = querry;
  } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
  }
}

async function updateUser(ctx) {
  try {
      let querry =  await UserModel.UpdateUser(ctx.param.id , ctx.request.body);
      ctx.body = querry;
  } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
  }
}

async function deleteUser(ctx) {
  try {
    
      let querry =  await UserModel.DeleteUser(ctx.param.id);
      ctx.body = querry;
  } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
  }
}

export = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};