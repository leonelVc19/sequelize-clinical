'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull:false,
      },
      password: {
        type: Sequelize.STRING(164),
        allowNull:false,
      },
      rol: {
        type: Sequelize.STRING(20),
        defaultValue: 'user', // habrá: usuario, admin
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      passwordResetToken: {
        type: Sequelize.STRING,
      },
      passwordResetExpire: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};