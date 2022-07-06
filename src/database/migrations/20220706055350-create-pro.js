'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pro', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      plan: {
        type: Sequelize.ENUM('Nenhum', 'Padrão', 'Investido', 'Profissional'),
        defaultValue: 'Nenhum'
      },
      beginDate: {
        type: Sequelize.DATE,
      },
      expirationDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Pro');
  }
};