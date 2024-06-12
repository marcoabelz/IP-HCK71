module.exports = function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal server error";
  let errors = null;
  // console.log(err.name);

  switch (err.name) {
    case "InvalidInputEmail":
      status = 400;
      message = "email is required";
      break;
    case "InvalidInputPass":
      status = 400;
      message = "password is required";
      break;
    case "InvalidLogin":
      status = 401;
      message = "error invalid username / password";
      break;
    case "SequelizeValidationError":
      status = 400;
      errors = err.errors.map((err) => err.message);
      message = errors;
      break;
    case "NotFound":
      status = 404;
      message = "Error not found";
      break;
    case "Booked":
      status = 404;
      message = "Room has been booked";
      break;
    // case "ValidationErrorItem":
    //   status = 400;
    //   errors = err.errors.map((err) => err.message);
    //   message = errors;
    //   break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    //   case "Forbidden":
    //     status = 403;
    //     message = "Forbidden access";
    //     break;
    //   case "Invalid Token":
    //   case "JsonWebTokenError":
    //     status = 401;
    //     message = "Invalid token";
    //     break;

    case "Admin Only":
      status = 403;
      message = "Forbidden access";
      break;

    case "Not Login":
      status = 401;
      message = "Please Login!";
      break;
  }
  res.status(status).json({ message });
};
