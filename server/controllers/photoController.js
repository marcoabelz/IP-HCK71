const { Photo } = require("../models");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class PhotoControllers {
  //client -> multer (kyk body parser tapi buat data) -> cloudinary
  static async photosPerRoom(req, res, next) {
    try {
      const { id } = req.params;
      let data = await Photo.findAll({
        where: {
          RoomId: id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async uploadRoomPhotos(req, res, next) {
    try {
      const { id } = req.params;
      if (!req.files) {
        throw {
          name: "uploadFailed",
          message: "Image is required",
        };
      }
      const uploadedFiles = [];
      const files = req.files.imgUrl;

      // console.log(files);
      for (let file of files) {
        const base64 = Buffer.from(file.data).toString("base64");
        const base64string = `data:${file.mimetype};base64,${base64}`;
        // console.log(base64string);
        let result = await cloudinary.uploader.upload(base64string);
        await Photo.create({
          imgUrl: result.url,
          RoomId: id,
        });
      }
      res.status(200).json({ message: "Photos uploaded!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PhotoControllers;
