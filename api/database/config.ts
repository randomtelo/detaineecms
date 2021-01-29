const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

// JWT Salt
const jwtsecret = '';
// Atlas
const connect = mongoose.connect('', { useNewUrlParser: true });

module.exports = {
    jwtsecret,
    connect,
};