const request = require("supertest");
const app = require("../app");

const { sequelize, User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

const validUserDummy = {
  fullName: "user",
  email: "user@gmail.com",
  password: "password",
  phoneNumber: "081294150023",
  role: "customer",
};

const invalidUserDummy = {
  fullName: "invalid",
  email: "invalid@gmail.com",
  password: "invalid",
  phoneNumber: "01230123",
  role: "customer",
};

const registerUser = {
  fullName: "invalid",
  email: "register@gmail.com",
  password: "invalid",
  phoneNumber: "01230123",
  role: "customer",
};

let validUser, invalidUser;

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        email: validUserDummy.email,
        password: hashPassword(validUserDummy.password),
        fullName: validUserDummy.fullName,
        phoneNumber: validUserDummy.phoneNumber,
        role: validUserDummy.role,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        email: invalidUserDummy.email,
        password: hashPassword(invalidUserDummy.password),
        fullName: invalidUserDummy.fullName,
        phoneNumber: invalidUserDummy.phoneNumber,
        role: invalidUserDummy.role,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ],
    {}
  );
  validUser = await User.findOne({ where: { email: "user@gmail.com" } });
  invalidUser = await User.findOne({ where: { email: "invalid@gmail.com" } });
});

describe("users", () => {
  describe("Login", () => {
    describe("Success", () => {
      test("Login should be return access_token", async () => {
        console.log(validUserDummy);
        let { body, status } = await request(app).post("/login").send(validUserDummy);
        console.log(body);
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
      });
    });

    describe("Empty email", () => {
      test("return 'email / password is required' when email is empty", async () => {
        let { body, status } = await request(app).post("/login").send({
          email: "",
          password: validUser.password,
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "email / password is required");
      });
    });

    describe("Empty password", () => {
      test("return 'email / password is required' when password is empty", async () => {
        let { body, status } = await request(app).post("/login").send({
          email: validUser.email,
          password: "",
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "email / password is required");
      });
    });

    describe("Invalid email", () => {
      test("return 'error invalid username / password' when email is not registered", async () => {
        let { body, status } = await request(app).post("/login").send({
          email: invalidUser.email,
          password: invalidUser.password,
        });
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "error invalid username / password");
      });
    });

    describe("Invalid password", () => {
      test("return 'error invalid username / password' when password is not registered", async () => {
        let { body, status } = await request(app).post("/login").send({
          email: invalidUser.email,
          password: invalidUser.password,
        });
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "error invalid username / password");
      });
    });

    describe("Register success", () => {
      test("return 'User created!' when user success created", async () => {
        let { body, status } = await request(app).post("/register").send({
          email: registerUser.email,
          password: registerUser.password,
          fullName: registerUser.fullName,
          phoneNumber: registerUser.phoneNumber,
        });
        expect(status).toBe(201);
        expect(body).toHaveProperty("message", "User created!");
      });
    });

    describe("Email duplicate", () => {
      test("return 'Email must be unique' when password is not registered", async () => {
        let { body, status } = await request(app).post("/register").send({
          email: validUser.email,
          password: validUser.password,
          fullName: validUser.fullName,
          phoneNumber: validUser.phoneNumber,
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "email must be unique");
      });
    });

    describe("Email empty", () => {
      test("return 'Email is required' when email is empty", async () => {
        let { body, status } = await request(app).post("/register").send({
          email: "",
          password: validUser.password,
          fullName: validUser.fullName,
          phoneNumber: validUser.phoneNumber,
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Email is required!"]);
      });
    });

    describe("Password empty", () => {
      test("return 'Password is required' when password is empty", async () => {
        let { body, status } = await request(app).post("/register").send({
          email: validUser.email,
          password: "",
          fullName: validUser.fullName,
          phoneNumber: validUser.phoneNumber,
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required!");
      });
    });

    describe("FullName empty", () => {
      test("return 'Full Name is required' when Full Name is empty", async () => {
        let { body, status } = await request(app).post("/register").send({
          email: registerUser.email,
          password: registerUser.password,
          fullName: "",
          phoneNumber: registerUser.phoneNumber,
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Full Name is required!"]);
      });
    });

    describe("Empty phone number", () => {
      test("return 'Phone Number is required!' when phone number is empty", async () => {
        let { body, status } = await request(app).post("/register").send({
          email: registerUser.email,
          password: registerUser.password,
          fullName: registerUser.fullName,
          phoneNumber: "",
        });
        console.log(body);
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Phone Number is required!"]);
      });
    });
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true, //menghapus semua baris dalam tabel dan mereset auto increment
    cascade: true, //menghapus data dalam tabel yang memiliki hubungan dengan foriegn key
    restartIdentity: true, //mereset semua nilai auto increment (id) menjadi 0
  });
});
