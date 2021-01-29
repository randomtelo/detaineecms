const middleware = require('./middleware');
import Koa from 'koa';
import session from 'koa-session';
import Range from 'koa-range';

const app = new Koa();

app.use( Range );

import { api } from './api/api';
import { admin } from './api/admin';

app.use(middleware.Middleware());
app.keys = ['secret'];
app.use(session({}, app));

const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(admin.routes());
app.use(api.routes());

app.listen(3001);

module.exports = app;