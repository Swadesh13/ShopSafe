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
      const data = db
        .collection(response.locals.collectionName)
        .where("userId", "==", request.user.uid)
        .limit(1)
        .get();
      return data;
    })
    .then((data) => {
      console.log(data.docs[0]);
      // if (!request.user.email_verified)
      //   return response.status(400).json({
      //     message: "User email verification pending. Complete to proceed",
      //   });
      request.user.isShop = false;
      if (Object.values(data.docs[0].data()).indexOf("ownerName") >= 0)
        request.user.isShop = true;
      request.user.email = data.docs[0].data().email;
      request.user.imageUrl = data.docs[0].data().imageUrl;
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token", err);
      return response.status(403).json(err);
    });
};
