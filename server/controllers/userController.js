const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      let { email, password, fullName, role, phoneNumber } = req.body;
      let user = await User.create({ email, password: hashPassword(password), fullName, role, phoneNumber });
      res.status(201).json({ message: "User created!" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) throw { name: "InvalidInputEmail" };
      if (!password) throw { name: "InvalidInputPass" };
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user || !comparePassword(password, user.password)) {
        throw { name: "InvalidLogin" };
      }
      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
