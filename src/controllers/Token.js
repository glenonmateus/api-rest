import User from "../models/User.js";
import jwt from "jsonwebtoken";

class TokenController {
  store = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(await this.isValidCredentials(email, password))) {
        return res.status(401).json({ errors: ["Invalid credentials"] });
      }
      return res.json({ access_token: this.generateToken(email) });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };

  isValidCredentials = async (email, password) => {
    try {
      const user = await User.findOne({ where: { email } });
      return user || (await user.isValidPassword(password));
    } catch (error) {
      console.error(error);
    }
  };

  generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
  };
}

export default new TokenController();
