'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accessibility', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      unlettered: {
        type: Sequelize.BOOLEAN
      },
      pronouns: {
        type: Sequelize.ENUM('Ele/Dele', 'Ela/Dela', 'Elu/Delu')
      },
      color_blindness: {
        type: Sequelize.ENUM('Nenhum','Deuteranomalia', 'Protanomalia',
          'Protanopia', 'Deuteranopia',
          'Tritanomalia', 'Tritanopia',
          'Total'
        )
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
    await queryInterface.dropTable('Accessibility');
  }
};