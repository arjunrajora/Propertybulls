const {
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
} = require('config');
const { AuthService } = require('../auth');

const { verifyJWT } = require('../utils/jwt');
const { UnauthorizedError } = require('../utils/api-errors');
module.exports = async (req, res, next) => {
  let token = req.header('Authorization') || req.header('authorization');
  if (!token) throw new UnauthorizedError();
  token = req.headers.authorization.replace('Bearer ', '');
  try {
    const payload = await verifyJWT({
      token,
      secretKey: JWT_ACCESS_TOKEN_SECRET,

      signOption: {
        ...SIGN_OPTION,
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      },
    });
    req.user = payload;
  } catch (err) {
    throw new UnauthorizedError('Token expired');
  }
  return next();
};
