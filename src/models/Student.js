import { Sequelize, Model } from "sequelize";

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Name must be between 3 and 255 characters",
            },
          },
        },
        surname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Surname must be between 3 and 255 characters",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: { msg: "Email already exists" },
          validate: { isEmail: { msg: "Email is invalid" } },
        },
        age: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: { isInt: { msg: "Age must be an integer" } },
        },
        weight: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          validate: { isFloat: { msg: "Weight must be a float" } },
        },
        height: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          validate: { isFloat: { msg: "Height must be a float" } },
        },
      },
      { sequelize },
    );
    return this;
  }
}

export default Student;
