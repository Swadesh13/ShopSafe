const { db, admin } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");
const { validateLoginData } = require("../util/validators");

exports.loginUser = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return response.status(400).json(errors);
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      var isShop = false;
      db.doc(`/customers/${user.email}`)
        .get()
        .then((doc) => {
          if (doc.exists) isShop = false;
          else isShop = true;
          return response.json({ token, isShop: isShop });
        })
        .catch((err) => {
          console.error(err);
          return response.status(400).json({ message: "server error" });
        });
    })
    .catch((error) => {
      console.error(error);
      return response
        .status(403)
        .json({ general: "wrong credentials, please try again" });
    });
};

exports.logoutuser = (request, response) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      return response.status(200).json({ message: "Logout successful" });
      // Sign-out successful.
    })
    .catch(function (error) {
      console.error(error);
      return response.status(400).json({ error: error.code });
      // An error happened.
    });
};
