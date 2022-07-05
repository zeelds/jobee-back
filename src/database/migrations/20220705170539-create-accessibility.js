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
        type: Sequelize.ENUM('Ele', 'Ela', 'Elu')
      },
      color_blindness: {
        type: Sequelize.ENUM('Deuteranomalia', 'Protanomalia',
          'Protanopia', 'Deuteranopia',
          'Tritanomalia', 'Tritanopia',
          'Total'
        )
      },
      user_id: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('Accessibility');
  }
};