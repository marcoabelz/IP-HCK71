const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const RoomController = require("../controllers/roomController");
const BookingControllers = require("../controllers/bookingController");
const PhotoControllers = require("../controllers/photoController");
const authentication = require("../middlewares/authentication");
const { authorizationAdmin } = require("../middlewares/authorization");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fileUpload = require("express-fileupload");

// define the home page route
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login-google", UserController.loginByGoogle);

router.use(authentication);
router.get("/rooms", RoomController.getAllRoom);
router.get("/rooms/:id", RoomController.getRoomDetail);
// router.get("/:id/photos", PhotoControllers.photosPerRoom); //fix gajadi
router.get("/bookings", BookingControllers.getAllBooking);
router.get("/myBookings", BookingControllers.userBooking);
router.post("/bookings/:id", BookingControllers.createBooking);

// router.get("/rooms/payment/midtrans/initiate", BookingControllers.initiateMidtransTrx); //midtrans
router.get("/rooms/:id/payment/midtrans/initiate", BookingControllers.initiateMidtransTrx); //midtrans
router.patch("/rooms/:id/payment/success", BookingControllers.updatePaymentStatus); //midtrans

router.use(authorizationAdmin);
// router.delete("/bookings/:id", BookingControllers.deleteBooking);
router.put("/bookings/:id", BookingControllers.updateBookingStatus);
router.put("/rooms/:id", RoomController.putRoom);
// router.delete("/rooms/:id", RoomController.deleteRoom);
router.use(fileUpload());
router.post("/:id/photos/upload", PhotoControllers.uploadRoomPhotos);

module.exports = router;
