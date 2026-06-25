import User from "../models/User.js";
import jwt from "jsonwebtoken";

class TokenController {
  store = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!(await this.isValidCredentials(user, password))) {
        return res.status(401).json({ errors: ["Invalid credentials"] });
      }
      return res.json({ access_token: this.generateToken(user.id, email) });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };

  isValidCredentials = async (user, password) => {
    try {
      return user || (await user.isValidPassword(password));
    } catch (error) {
      console.error(error);
    }
  };

  generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
  };
}

export default new TokenController();
