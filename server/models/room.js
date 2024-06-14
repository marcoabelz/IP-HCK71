"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasOne(models.Booking, { foreignKey: "RoomId" });
      Room.hasMany(models.Photo, { foreignKey: "RoomId" });
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      availability: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
