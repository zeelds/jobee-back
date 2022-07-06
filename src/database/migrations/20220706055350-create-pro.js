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
      begindate: {
        type: Sequelize.DATE,
      },
      expirationdate: {
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.UUID
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pro');
  }
};