'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accessibility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Accessibility.init({
    id: DataTypes.UUID,
    unlettered: DataTypes.BOOLEAN,
    pronouns: DataTypes.ENUM('Ele', 'Ela', 'Elu'),
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Accessibility',
  });
  return Accessibility;
};