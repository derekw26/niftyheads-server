'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {

    static associate({ User }) {

      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined }
    }
  };
  Avatar.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.TEXT,
    category: DataTypes.TEXT,
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdBy: DataTypes.UUID,
    price: DataTypes.NUMERIC,
    listed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Avatar',
  });
  return Avatar;
};
