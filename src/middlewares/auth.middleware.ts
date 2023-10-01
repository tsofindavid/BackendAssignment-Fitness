import { Request } from 'express';
import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import passport from 'passport';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

const strategy = new Strategy(options, async (req: Request, jwt_payload, done: VerifiedCallback) => {
  console.log({
    headers: req.headers,
    jwt_payload,
  });

  done(null, true);
  // UserMo.findOne({ id: jwt_payload.sub }, function (err, user) {
  //   if (err) {
  //     return done(err, false);
  //   }
  //   if (user) {
  //     return done(null, user);
  //   } else {
  //     return done(null, false);
  //     // or you could create a new account
  //   }
  // });
});

export const AuthMiddleware = passport.authenticate(strategy, { session: false });
