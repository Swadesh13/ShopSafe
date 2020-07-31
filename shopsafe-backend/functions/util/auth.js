const { admin, db } = require("./admin");
const config = require("../util/config");

const firebase = require("firebase");
module.exports = (request, response, next) => {
  let idToken;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = request.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return response.status(403).json({ error: "Unauthorized" });
  }
  if (request.url != "/logout") {
    if (typeof request.body.isShop == "undefined") {
      return response.status(403).json({ message: "isShop property missing" });
    }
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      if (request.url == "/logout") return next();
      request.user = decodedToken;
      request.user.isShop = request.body.isShop;
      if (request.url == "/shops" && request.body.isShop == true)
        return response
          .status(400)
          .json({ message: "Shops are not allowed to access this route" });
      if (request.url.startsWith("/booking/") && request.body.isShop == true) {
        return response.status(400).json({
          message: "Shops are not allowed to create / edit / delete booking",
        });
      }
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token", err);
      return response.status(403).json(err);
    });
};
