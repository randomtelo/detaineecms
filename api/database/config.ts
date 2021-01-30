const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

const salt: string = process.env.SALT as unknown as string;
const mongo: string = process.env.MONGO as unknown as string;

// JWT Salt
const jwtsecret = salt;
// Atlas
console.log('mongo: ', mongo);
const connect = mongoose.connect(mongo, { useNewUrlParser: true });

module.exports = {
    jwtsecret,
    connect,
};