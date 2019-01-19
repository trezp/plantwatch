'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define('Plant', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    waterFrequency: DataTypes.INTEGER,
    lastWatered: DataTypes.INTEGER,
    meter: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  Plant.associate = function(models) {
    // associations can be defined here
  };
  return Plant;
};