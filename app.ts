const middleware = require('./middleware');
import Koa from 'koa';
import session from 'koa-session';
import Range from 'koa-range';

import * as dotenv from "dotenv";
dotenv.config();

const connect = require('./api/database/config');
const salt: string = process.env.SALT as unknown as string;
const port = process.env.PORT;
const mongo = process.env.MONGO;
console.log('mongo: ', mongo);
const app = new Koa();

app.use( Range );

import { api } from './api/api';
import { admin } from './api/admin';

app.use(middleware.Middleware());
if (salt) app.keys = [salt];
app.use(session({}, app));

const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(admin.routes());
app.use(api.routes());

app.listen(port);

module.exports = app;