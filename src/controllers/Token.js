import User from "../models/User.js";
import jwt from "jsonwebtoken";

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .json({ errors: ["Email and password are required"] });
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.isValidPassword(password))) {
        return res.status(401).json({ errors: ["Invalid credentials"] });
      }
      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION,
      });
      return res.json({ access_token: token });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  }
}

export default new TokenController();
