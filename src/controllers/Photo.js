import multer from "multer";
import multerConfig from "../config/multer.js";

const photo = multer(multerConfig).single("photo");

class PhotoController {
  store = (req, res) => {
    return photo(req, res, (error) => {
      if (error) return res.status(400).json({ errors: [error.code] });
      return res.json(req.file);
    });
  };
}

export default new PhotoController();
