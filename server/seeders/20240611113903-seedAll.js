"use strict";
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let userData = require("../data/users.json").map((user) => {
      delete user.id;
      user.password = hashPassword(user.password);
      user.createdAt = user.updatedAt = new Date();
      return user;
    });

    let roomData = require("../data/rooms.json").map((room) => {
      room.createdAt = room.updatedAt = new Date();
      return room;
    });

    let bookingData = require("../data/bookings.json").map((booking) => {
      booking.createdAt = booking.updatedAt = new Date();
      return booking;
    });

    let photoData = require("../data/photos.json").map((photo) => {
      photo.createdAt = photo.updatedAt = new Date();
      return photo;
    });

    await queryInterface.bulkInsert("Users", userData);
    await queryInterface.bulkInsert("Rooms", roomData);
    await queryInterface.bulkInsert("Bookings", bookingData);
    await queryInterface.bulkInsert("Photos", photoData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Photo", null);
    await queryInterface.bulkDelete("Bookings", null);
    await queryInterface.bulkDelete("Rooms", null);
    await queryInterface.bulkDelete("Users", null);
  },
};
