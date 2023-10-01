import { Request } from 'express';
import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import passport from 'passport';
import { JwtConfig } from '../configs/jwt.config';
import { UserModel } from '../database/models/user.model';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JwtConfig.jwtSecret,
};

const strategy = new Strategy(options, async (jwt_payload: { id: string }, done: VerifiedCallback) => {
  if (!jwt_payload.id) {
    throw new Error('User id not found');
  }

  const user = await UserModel.findOne({
    rejectOnEmpty: false,
    where: { id: jwt_payload.id },
    attributes: { include: ['id', 'email', 'nickname', 'role'] },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { id, email, nickname, role } = user;

  done(false, { id, email, nickname, role });
});

export const AuthMiddleware = passport.authenticate(strategy, { session: false });
