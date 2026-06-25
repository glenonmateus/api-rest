import Student from "../models/Student.js";

class StudentController {
  index = async (req, res) => {
    try {
      return res.json(await Student.findAll());
    } catch (error) {
      console.error(error);
      return res.status(500).json(null);
    }
  };

  store = async (req, res) => {
    try {
      return res.json(await Student.create(req.body));
    } catch (error) {
      console.error(error);
      return res.status(500).json(null);
    }
  };

  show = async (req, res) => {
    try {
      return res.json(await Student.findByPk(req.params.id));
    } catch (error) {
      console.error(error);
      return res.status(500).json(null);
    }
  };

  update = async (req, res) => {
    try {
      const student = await Student.update(req.body, {
        where: { id: req.params.id },
      });
      if (!student[0]) return res.status(404).json(null);
      return res.json(await Student.findByPk(req.params.id));
    } catch (error) {
      console.error(error);
      return res.status(400).json(null);
    }
  };

  delete = async (req, res) => {
    try {
      return res.json(await Student.destroy({ where: { id: req.params.id } }));
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };
}

export default new StudentController();
