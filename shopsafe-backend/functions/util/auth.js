const { admin, db } = require("./admin");

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
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      request.user = decodedToken;
      request.user.isShop = request.body.isShop;
      if (request.url == "/booking" && request.body.isShop == true) {
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
