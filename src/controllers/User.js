import User from "../models/User.js";

class UserController {
  async index(req, res) {
    return res.json(await User.findAll());
  }

  async store(req, res) {
    const user = await User.create({
      name: "Glenon",
      surname: "Mateus",
      email: "glenonmateus+001@gmail.com",
      password: "0123456789",
    });
    return res.json(user);
  }
}

export default new UserController();
