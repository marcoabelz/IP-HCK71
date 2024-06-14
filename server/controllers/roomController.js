const { Room, Photo } = require("../models");

class RoomController {
  static async getAllRoom(req, res, next) {
    try {
      let data = await Room.findAll({
        include: {
          model: Photo,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getRoomDetail(req, res, next) {
    try {
      const { id } = req.params;
      // let room = await Room.findByPk(id);
      let room = await Room.findOne({
        include: {
          model: Photo,
        },
        where: {
          id,
        },
      });

      if (!room) {
        throw { name: "NotFound" };
      } else {
        res.status(200).json({ room });
      }
    } catch (error) {
      next(error);
    }
  }

  static async putRoom(req, res, next) {
    try {
      let { id } = req.params;
      let { name, price, description, availability } = req.body;
      let room = await Room.findByPk(id);
      if (!room) {
        throw { name: "NotFound" };
      } else {
        await room.update({
          name,
          price,
          description,
          availability,
        });
        res.status(200).json({ name, price, description, availability });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteRoom(req, res, next) {
    try {
      let { id } = req.params;
      let room = await Room.findByPk(id);
      if (!room) {
        throw { name: "NotFound" };
      } else {
        await room.destroy();
        res.status(200).json({ message: `${room.name} success to delete` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomController;
