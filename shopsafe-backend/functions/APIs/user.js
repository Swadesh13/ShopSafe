const { db, admin } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");
const { validateLoginData } = require("../util/validators");

exports.loginuser = (request, response) => {
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
      var loggedinUser = firebase.auth().currentUser;
      if (loggedinUser.emailVerified == false) {
        firebase
          .auth()
          .signOut()
          .then(function () {
            loggedinUser
              .sendEmailVerification()
              .then(function () {
                // Email sent.
                return response.status(400).json({
                  message:
                    "Email not verified yet. Verification Mail resent to your registered email address. Verify and re-login",
                });
              })
              .catch(function (error) {
                // An error happened.
              });

            // Sign-out successful.
          })
          .catch(function (error) {
            console.error(error);
            return response.status(400).json({ error: error.code });
            // An error happened.
          });
      }
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
          return response
            .status(400)
            .json({ message: "Error in fetching user details" });
        });
    })
    .catch((error) => {
      console.error(error);
      return response
        .status(403)
        .json({ general: "Wrong credentials. Please try again" });
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
