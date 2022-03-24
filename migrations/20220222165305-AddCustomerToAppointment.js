'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.addColumn('Appointments', 'customerId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Customers',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      defaultValue: null,
      after: 'date',
    }),
  ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Appointments', 'customerId'),
    ]);
  }
};
