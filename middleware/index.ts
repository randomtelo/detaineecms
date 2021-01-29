
import compose from 'koa-compose';
import convert from 'koa-convert'
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import cors, { Options } from '@koa/cors';
import bodyParser from "koa-bodyparser";
import session from "koa-generic-session";
import serve from "koa-static";


export const Middleware = () => {
  return compose([
    logger(),
    serve('./public/'),
    helmet(), // reset HTTP headers (e.g. remove x-powered-by)
    cors({
        origin: '*',
        headers: '*',
      } as Options),
    bodyParser(),
    session({}),
  ]);
}