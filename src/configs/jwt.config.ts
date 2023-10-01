const { JWT_EXPIRES_IN, JWT_SECRET } = process.env;

export class JwtConfig {
  public static readonly jwtExpiresIn: string = JWT_EXPIRES_IN || '1h';
  public static readonly jwtSecret: string = JWT_SECRET;
}
