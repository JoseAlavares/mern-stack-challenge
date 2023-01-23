'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('real_state_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      field: {
        type: Sequelize.INTEGER
      },
      construction: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      contact_phone: {
        type: Sequelize.STRING
      },
      contact_mail: {
        type: Sequelize.STRING
      },
      bathrooms: {
        type: Sequelize.INTEGER
      },
      bedrooms: {
        type: Sequelize.INTEGER
      },
      parking_lots: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('real_state_lists');
  }
};