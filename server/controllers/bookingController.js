const midtransClient = require("midtrans-client");
const { Booking, Room, User } = require("../models");
const axios = require("axios");
const { patch } = require("../routers");

class BookingControllers {
  static async updatePaymentStatus(req, res, next) {
    const { id } = req.params;
    // console.log(id);
    const { orderId } = req.body;
    const booking = await Booking.findOne({
      where: {
        orderId,
      },
    });
    if (!booking) throw { name: "NotFound" };
    const room = await Room.findOne({
      where: {
        id,
      },
    });

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const base64ServerKey = Buffer.from(serverKey + ":").toString("base64");

    const response = await axios.get(`https://api.sandbox.midtrans.com/v2/${orderId}/status`, {
      headers: {
        Authorization: `Basic ${base64ServerKey}`,
      },
    });

    if (response.data.transaction_status === "capture" && response.data.status_code === "200") {
      await room.update({ availability: false });
      await booking.update({ paid: true });
    }
    try {
    } catch (error) {
      next(error);
    }
  }

  static async initiateMidtransTrx(req, res, next) {
    try {
      let { id } = req.params;
      let roomCheck = await Room.findByPk(id);

      const snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      //ini data detail order

      const orderId = Math.random().toString();
      // const amount = roomCheck.price;
      const amount = roomCheck.price;

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        //data jenis pembayaran
        credit_card: {
          secure: true,
        },
        //data detail customer
        customer_details: {
          name: req.user.fullName,
          email: req.user.email,
          phone: req.user.phoneNumber,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      console.log(transaction);
      // transaction token
      let transactionToken = transaction.token;

      await Booking.create({
        orderId,
        paid: false,
        RoomId: id,
        grandTotal: amount,
        UserId: req.user.id,
        //transactionToken
      });

      console.log("transactionToken:", transactionToken);
      res.json({ message: "Order created", transactionToken, orderId });
    } catch (error) {
      console.log(error);
    }
  }

  static async createBooking(req, res, next) {
    try {
      let { id } = req.params;
      let roomCheck = await Room.findByPk(id);
      if (!roomCheck) throw { name: "NotFound" };
      if (!roomCheck.availability) throw { name: "Booked" };
      let userName = await User.findByPk(req.user.id).fullName;
      const { price } = roomCheck;
      let data = await Booking.create({
        paid: false,
        grandTotal: price,
        UserId: req.user.id,
        RoomId: id,
      });
      console.log(data);
      res.status(201).json({ data, roomName: roomCheck.name });
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
      let data = await Booking.findAll({
        include: [
          {
            model: Room,
          },
          {
            model: User,
          },
        ],
      });
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
        include: [
          {
            model: User,
          },
          {
            model: Room,
          },
        ],
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
