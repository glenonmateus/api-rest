import Student from "../models/Student.js";
import Foto from "../models/Photo.js";

class StudentController {
  index = async (req, res) => {
    try {
      return res.json(
        await Student.findAll({
          attributes: [
            "id",
            "name",
            "surname",
            "email",
            "age",
            "weight",
            "height",
          ],
          order: [
            ["id", "DESC"],
            [Foto, "id", "DESC"],
          ],
          include: { model: Foto, attributes: ["filename"] },
        }),
      );
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
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };

  show = async (req, res) => {
    try {
      const student = await Student.findByPk(req.params.id, {
        attributes: [
          "id",
          "name",
          "surname",
          "email",
          "age",
          "weight",
          "height",
        ],
        order: [[Foto, "id", "DESC"]],
        include: { model: Foto, attributes: ["filename"] },
      });
      if (!student) return res.status(404).json(null);
      return res.json(student);
    } catch (error) {
      console.error(error);
      return res.status(500).json(null);
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.update(req.body, {
        where: { id },
      });
      if (!student[0]) return res.status(404).json(null);
      return res.json(
        await Student.findByPk(id, {
          attributes: [
            "id",
            "name",
            "surname",
            "email",
            "age",
            "weight",
            "height",
          ],
          order: [[Foto, "id", "DESC"]],
          include: { model: Foto, attributes: ["filename"] },
        }),
      );
    } catch (error) {
      console.error(error);
      return res.status(400).json(null);
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.destroy({ where: { id } });
      if (!student) return res.status(404).json(null);
      return res.json(null);
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: error.errors.map((e) => e.message) });
    }
  };
}

export default new StudentController();
