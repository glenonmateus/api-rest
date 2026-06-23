import Student from "../models/Student.js";

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll();
      return res.json(students);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error getting students" });
    }
  }

  async store(req, res) {
    try {
      const student = await Student.create(req.body);
      return res.json(student);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error creating student" });
    }
  }

  async show(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(401).json({ error: "Student not found" });
      }
      return res.json(student);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new StudentController();
