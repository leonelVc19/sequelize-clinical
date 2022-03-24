'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imageInformations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      informationHomeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'informationHomes',
          key: 'id',
        },
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        defaultValue: null,
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
    await queryInterface.dropTable('imageInformations');
  }
};