import User from "../models/User.js";

class UserController {
  index = async (req, res) => {
    try {
      return res.json(await User.findAll());
    } catch (error) {
      console.error(error);
      return res.status(400).json(null);
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

  show = async (req, res) => {
    try {
      return res.json(await User.findByPk(req.params.id));
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };

  delete = async (req, res) => {
    try {
      const user = await User.destroy({
        where: { id: req.params.id, email: req.userEmail },
      });
      if (!user)
        return res.status(401).json({ errors: ["Deleted not allowed"] });
      return res.json(null);
    } catch (error) {
      console.error(error);
      return res.status(400).json(null);
    }
  };

  update = async (req, res) => {
    try {
      const user = await User.update(req.body, {
        where: { id: req.params.id, email: req.userEmail },
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
}

export default new UserController();
