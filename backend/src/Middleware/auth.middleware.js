import jwt from "jsonwebtoken"

export const userauth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorised user',
      success: false,
      err: 'No token provided',
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized',
      success: false,
      err: 'Invalid token',
    });
  }
};
