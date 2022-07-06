'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pro.init({
    id: DataTypes.UUID,
    plan: DataTypes.ENUM('Nenhum', 'Padrao', 'Investido', 'Profissional'),
    beginDate: DataTypes.DATE,
    expirationDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pro',
  });
  return Pro;
};