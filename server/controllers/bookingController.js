const { Booking, Room } = require("../models");

class BookingControllers {
  static async createBooking(req, res, next) {
    try {
      let { id } = req.params;
      let roomCheck = await Room.findByPk(id);
      if (!roomCheck) throw { name: "NotFound" };
      if (!roomCheck.availability) throw { name: "Booked" };
      const { price } = roomCheck;
      let data = await Booking.create({
        paid: false,
        grandTotal: price,
        UserId: req.user.id,
        RoomId: id,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  //transaction
  static async updateBookingStatus(req, res, next) {
    try {
      const { id } = req.params;
      let bookingCheck = await Booking.findByPk(id);
      if (!bookingCheck) throw { name: "NotFound" };
      const { RoomId } = bookingCheck;
      await bookingCheck.update({
        paid: true,
      });
      await Room.update(
        { availability: false },
        {
          where: {
            id: RoomId,
          },
        }
      );
      res.status(200).json({ message: `Status has been updated 'Paid'` });
    } catch (error) {
      next(error);
    }
  }

  static async getAllBooking(req, res, next) {
    try {
      let data = await Booking.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async userBooking(req, res, next) {
    try {
      let data = await Booking.findAll({
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBooking(req, res, next) {
    try {
      let { id } = req.params;
      let booking = await Booking.findByPk(id);
      if (!booking) {
        throw { name: "NotFound" };
      } else {
        await booking.destroy();
        res.status(200).json({ message: `${booking.name} success to delete` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookingControllers;
