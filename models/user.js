'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({ Avatar }) {

      this.hasMany(Avatar, { foreignKey: 'userId', as: 'avatars'})
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'Name must not be empty' },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an email' },
        notEmpty: { msg: 'Email must not be empty' },
        isEmail: { msg: 'Must be a valid email address' }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a password' },
        notEmpty: { msg: 'Password must not be empty' },
      }
    },
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
