import Sequelize from "sequelize";
import databaseConfig from "../config/database.cjs";
import Photo from "../models/Photo.js";
import Student from "../models/Student.js";
import User from "../models/User.js";

const connection = new Sequelize(databaseConfig);

const models = [Student, User, Photo];

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
