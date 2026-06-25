import multer from "multer";
import { extname, resolve } from "path";

export default {
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg"
    ) {
      return callback(new multer.MulterError("File not supported"));
    }
    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, resolve(import.meta.dirname, "..", "..", "uploads"));
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
};
