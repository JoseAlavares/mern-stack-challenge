'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RealState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RealState.init({
    description: DataTypes.STRING,
    field: DataTypes.INTEGER,
    construction: DataTypes.INTEGER,
    address: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    contact_mail: DataTypes.STRING,
    bathrooms: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    parking_lots: DataTypes.INTEGER,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'real_state_list',
  })

  return RealState
}