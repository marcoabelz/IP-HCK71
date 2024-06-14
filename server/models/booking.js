"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: "UserId" });
      Booking.belongsTo(models.Room, { foreignKey: "RoomId" });
    }
  }
  Booking.init(
    {
      orderId: DataTypes.STRING,
      paid: DataTypes.BOOLEAN,
      grandTotal: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      RoomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
