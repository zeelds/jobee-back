'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    id: DataTypes.UUID,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.ENUM('publicado', 'rascunho'),
    tags: DataTypes.JSON,
    author_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};