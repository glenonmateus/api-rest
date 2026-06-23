import Sequelize from "sequelize";
import databaseConfig from "../config/database.cjs";
import Student from "../models/Student.js";
import User from "../models/User.js";

const connection = new Sequelize(databaseConfig);

const models = [Student, User];

models.forEach((model) => model.init(connection));
