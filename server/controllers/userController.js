const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      let { email, password, fullName, role, phoneNumber } = req.body;
      if (!password) throw { name: "EmptyPassword" };
      let user = await User.create({ email, password: hashPassword(password), fullName, role, phoneNumber });
      res.status(201).json({ message: "User created!" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) throw { name: "InvalidInputLogin" };
      if (!password) throw { name: "InvalidInputLogin" };
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user || !comparePassword(password, user.password)) {
        throw { name: "InvalidLogin" };
      }
      res.status(200).json({ access_token: signToken({ id: user.id }), role: user.role });
    } catch (error) {
      next(error);
    }
  }

  static async loginByGoogle(req, res, next) {
    try {
      // console.log(req.headers);
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENTID,
      });
      // console.log(ticket);
      const payload = ticket.getPayload();
      // console.log(payload);
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: hashPassword(`${Math.random() * 1000}`),
          fullName: payload.name,
          phoneNumber: "123",
        },
      });
      const token = signToken({
        id: user.id,
      });
      res.status(200).json({ access_token: token, role: user.role });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = UserController;
