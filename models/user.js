'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    biography: DataTypes.STRING,
    avatar: DataTypes.STRING,
    isverified: DataTypes.BOOLEAN,
    gender: DataTypes.ENUM('Masculino', 'Feminino', 'Outros'),
    birthday: DataTypes.DATE,
    contact: DataTypes.JSON,
    tags: DataTypes.JSON,
    ban_info: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};