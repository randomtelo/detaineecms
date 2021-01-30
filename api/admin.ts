import * as fs from'fs';
import * as path from'path';
import Router from'koa-router';
import passport from'koa-passport';
import * as jwt from'jsonwebtoken';
import * as passportLocal from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AdminModel } from './db/schemas';

const salt = process.env.SALT as unknown as string;
const jwtsecret = salt; // signing key for JWT

const LocalStrategy = passportLocal.Strategy;
const router = new Router();


router.get('*', function(ctx) {
  ctx.body = fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8')
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtsecret
};

passport.use(new Strategy(jwtOptions, function (payload, done) {
  console.log(payload.id);
  AdminModel.findById(payload.id, (err, user) => {
    if (err) {
      return done(err)
    }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  });
}));

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
},
function (username, password, done) {
  AdminModel.findOne({ username: username }, (err, user) => {
    console.log('findOne: ', user);
    if (err) {
      return done(err);
    }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  });
}));


// local auth route. Creates JWT is successful
router.post('/login', async(ctx, next) => {
  console.log(ctx.request.body);
  await passport.authenticate('local', function (err, user) {
    if (user == false) {
      ctx.body = '{"answer": "Login failed"}';
    } else {
      //--payload - info to put in the JWT
      const payload = {
        id: user._id,
        username: user.username,
        userlevel: user.userlevel
      };
      const token = jwt.sign(payload, jwtsecret); //JWT is created here

      ctx.body = {token: 'JWT ' + token};
    }
  })(ctx, next);
});


router.post('/profile', passport.authenticate('jwt', { session: false }), async ctx =>
  {
    ctx.body = ctx.request.body;
  }
);

export const admin = router;