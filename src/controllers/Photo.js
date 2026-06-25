import multer from "multer";
import multerConfig from "../config/multer.js";
import Photo from "../models/Photo.js";

const photo = multer(multerConfig).single("photo");

class PhotoController {
  store = (req, res) => {
    return photo(req, res, async (error) => {
      try {
        if (error) return res.status(400).json({ errors: [error.code] });
        const { student_id } = req.body;
        const { originalname, filename } = req.file;
        const photo = await Photo.create({
          originalname,
          filename,
          student_id,
        });
        return res.json(photo);
      } catch (error) {
        console.error(error);
        return res.status(400).json({ errors: ["Invalid student_id"] });
      }
    });
  };
}

export default new PhotoController();
