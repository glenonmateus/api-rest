import User from "../models/User.js";

class UserController {
  index = async (req, res) => {
    try {
      return res.json(
        await User.findAll({ attributes: ["id", "name", "email"] }),
      );
    } catch (error) {
      console.error(error);
      return res.status(400).json(null);
    }
  };

  show = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      const { id, name, email } = user;
      return res.json({ id, name, email });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };

  store = async (req, res) => {
    try {
      return res.json(await User.create(req.body));
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };

  update = async (req, res) => {
    try {
      const user = await User.update(req.body, {
        where: { email: req.userEmail },
      });
      if (!user[0]) {
        return res.status(401).json({ errors: ["Updated not allowed"] });
      }
      return res.json(null);
    } catch (error) {
      console.error(error);
      return res.status(500).json(null);
    }
  };

  delete = async (req, res) => {
    try {
      const user = await User.destroy({
        where: { email: req.userEmail },
      });
      if (!user)
        return res.status(401).json({ errors: ["Deleted not allowed"] });
      return res.json(null);
    } catch (error) {
      console.error(error);
      return res.status(400).json(null);
    }
  };
}

export default new UserController();
