import User from "../models/User.js";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting users" });
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
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error getting user" });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.destroy({ where: { id: req.params.id } });
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error deleting user" });
    }
  }

  async update(req, res) {
    try {
      await User.update(req.body, {
        where: { id: req.params.id },
      });
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UserController();
