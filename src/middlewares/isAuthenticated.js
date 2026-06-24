import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ errors: ["Login required"] });
  }
  const token = authorization.split(" ")[1];
  try {
    const userData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.userEmail = userData.email;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ errors: ["Invalid credentials"] });
  }
};
