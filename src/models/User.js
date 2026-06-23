import { Sequelize, Model } from "sequelize";
import bcryptjs from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: [3, 255],
          },
        },
        surname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: [3, 255],
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            isEmail: {
              msg: "Email is invalid",
            },
          },
        },
        password_hash: { type: Sequelize.STRING, defaultValue: "" },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: [6, 50],
          },
        },
      },
      { sequelize },
    );

    this.addHook("beforeSave", async (user) => {
      user.password_hash = await bcryptjs.hash(user.password, 8);
    });

    return this;
  }
}

export default User;
