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
      console.error(error);
      return res.status(500).json({ error: "Error creating user" });
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
}

export default new UserController();
