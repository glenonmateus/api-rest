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
      return res.json(await User.destroy({ where: { id: req.params.id } }));
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };

  update = async (req, res) => {
    try {
      return res.json(
        await User.update(req.body, { where: { id: req.params.id } }),
      );
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };
}

export default new UserController();
