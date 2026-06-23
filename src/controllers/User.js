import User from "../models/User.js";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(400).json(null);
    }
  }

  async store(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      return res.json(user);
    } catch (error) {
      return res.status(400).json(null);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ errors: ["User not found"] });
      await user.destroy();
      return res.json(null);
    } catch (error) {
      return res.status(400).json(null);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) return res.status(404).json({ errors: ["User not found"] });

      await user.update(req.body);

      return res.json(await User.findByPk(id));
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  }
}

export default new UserController();
