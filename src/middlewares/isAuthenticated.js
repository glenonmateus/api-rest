import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ errors: ["Login required"] });
  }
  const token = authorization.split(" ")[1];
  try {
    const userData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const { id, email } = userData;
    const user = await User.findOne({ where: { id, email } });
    if (!user) return res.status(401).json({ errors: ["Invalid credentials"] });
    req.userEmail = userData.email;
    req.userId = userData.id;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ errors: ["Invalid credentials"] });
  }
};
