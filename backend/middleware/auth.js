import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ success: false, message: 'token mancante' });
  }
  const token = authHeader.split(' ')[1];
  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ success: false, message: 'JWT_SECRET non definito' });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.body.userId = token_decode.id;
    req.user = { id: token_decode.id };
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'token non valido' });
  }
};

export default authMiddleware;
