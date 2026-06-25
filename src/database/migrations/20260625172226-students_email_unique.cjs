"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all(
        [
          queryInterface.addConstraint("students", {
            fields: ["email"],
            type: "unique",
            name: "students_email_unique",
          }),
        ],
        { transaction: t },
      );
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all(
        [queryInterface.removeConstraint("students", "students_email_unique")],
        { transaction: t },
      );
    });
  },
};
