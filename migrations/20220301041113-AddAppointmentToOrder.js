'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Orders', 'appointmentId',
      {
        type: Sequelize.INTEGER,
        references: {
          model:'Appointments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        defaultValue: null,
        after: 'paymentDate',
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'appointmentId'),
    ]);
  }
};
