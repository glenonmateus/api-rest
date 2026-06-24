import Student from "../models/Student.js";

class StudentController {
  async index(req, res) {
    try {
      return res.json(await Student.findAll());
    } catch (error) {
      console.error(error);
      return res.status(500).json(null);
    }
  }

  async store(req, res) {
    try {
      return res.json(await Student.create(req.body));
    } catch (error) {
      console.error(error);
      return res.status(500).json(null);
    }
  }

  async show(req, res) {
    try {
      return res.json(await Student.findByPk(req.params.id));
    } catch (error) {
      console.error(error);
      return res.status(500).json(null);
    }
  }

  async update(req, res) {
    try {
      await Student.update(req.body, { where: { id: req.params.id } });
      return res.json(await Student.findByPk(req.params.id));
    } catch (error) {
      console.error(error);
      return res.status(400).json(null);
    }
  }

  async delete(req, res) {
    try {
      return res.json(await Student.destroy({ where: { id: req.params.id } }));
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  }
}

export default new StudentController();
