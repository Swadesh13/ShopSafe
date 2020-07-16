const { db, admin } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");
const { validateSignUpCustomer } = require("../util/validators");

firebase.initializeApp(config);

// exports.handleReset = (request, response) => {
//   // TODO: Implement getParameterByName()

//   // Get the action to complete.
//   var mode = getParameterByName("mode");
//   // Get the one-time code from the query parameter.
//   var actionCode = getParameterByName("oobCode");
//   // (Optional) Get the continue URL from the query parameter if available.
//   var continueUrl = getParameterByName("continueUrl");
//   // (Optional) Get the language code if available.
//   var lang = getParameterByName("lang") || "en";

//   // Configure the Firebase SDK.
//   // This is the minimum configuration required for the API to be used.
//   var config = {
//     apiKey: "AIzaSyDhDHBXHlxKoo_ugfqoB_oKQwaGprODDzI", // Copy this key from the web initialization
//     // snippet found in the Firebase console.
//   };
//   // var app = firebase.initializeApp(config);
//   var auth = app.auth();

//   // Handle the user management action.
//   switch (mode) {
//     case "resetPassword":
//       // Display reset password handler and UI.
//       handleResetPassword(auth, actionCode, continueUrl, lang);
//       break;
//     case "recoverEmail":
//       // Display email recovery handler and UI.
//       handleRecoverEmail(auth, actionCode, lang);
//       break;
//     case "verifyEmail":
//       // Display email verification handler and UI.
//       handleVerifyEmail(auth, actionCode, continueUrl, lang);
//       break;
//     default:
//     // Error: invalid mode.
//   }

//   function handleResetPassword(auth, actionCode, continueUrl, lang) {
//     // Localize the UI to the selected language as determined by the lang
//     // parameter.
//     var accountEmail;
//     // Verify the password reset code is valid.
//     auth
//       .verifyPasswordResetCode(actionCode)
//       .then(function (email) {
//         var accountEmail = email;
//         console.log("email is : ", accountEmail);

//         // TODO: Show the reset screen with the user's email and ask the user for
//         // the new password.

//         // Save the new password.
//         auth
//           .confirmPasswordReset(actionCode, newPassword)
//           .then(function (resp) {
//             console.log("password reset done");
//             // Password reset has been confirmed and new password updated.
//             // TODO: Display a link back to the app, or sign-in the user directly
//             // if the page belongs to the same domain as the app:
//             // auth.signInWithEmailAndPassword(accountEmail, newPassword);
//             // TODO: If a continue URL is available, display a button which on
//             // click redirects the user back to the app via continueUrl with
//             // additional state determined from that URL's parameters.
//           })
//           .catch(function (error) {
//             // Error occurred during confirmation. The code might have expired or the
//             // password is too weak.
//           });
//       })
//       .catch(function (error) {
//         // Invalid or expired action code. Ask user to try to reset the password
//         // again.
//       });
//   }
// };

// Signup
exports.signUpUser = (request, response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    phoneNumber: request.body.phoneNumber,
    address: request.body.address,
    // profilePhoto: "url",
    gender: request.body.gender,
  };

  const { valid, errors } = validateSignUpCustomer(newUser);

  if (!valid) return response.status(400).json(errors);

  let token, userId;
  db.doc(`/customers/${newUser.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ email: "This email is already registered." });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      var user = firebase.auth().currentUser;

      user
        .sendEmailVerification()
        .then(function () {
          console.log("Email Verification Sent");
          // Email sent.
        })
        .catch(function (error) {
          console.log(error);
          // An error happened.
        });
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      const userCredentials = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        // password: newUser.password,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
        // profilePhoto: newUser.profilePhoto,
        gender: newUser.gender,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/customers/${newUser.email}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return response
        .status(500)
        .json({ general: "Something went wrong, please try again" });
      // return response.status(500).send(err.message);
    });
};

exports.getUserDetail = (request, response) => {
  let userData = {};
  db.doc(`/customers/${request.user.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.userCredentials = doc.data();
        return response.json(userData);
      }
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({ error: error.code });
    });
};

exports.updateUserDetails = (request, response) => {
  let document = db.collection("customers").doc(`${request.user.email}`);
  document
    .update(request.body)
    .then(() => {
      response.json({ message: "Updated successfully" });
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({
        message: "Cannot Update the value",
      });
    });
};

deleteImage = (imageName) => {
  const bucket = admin.storage().bucket();
  const path = `${imageName}`;
  return bucket
    .file(path)
    .delete()
    .then(() => {
      return;
    })
    .catch((error) => {
      return;
    });
};

// Upload profile picture
exports.uploadProfilePhoto = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      return response
        .status(400)
        .json({ error: "Wrong file type submited! Only jpeg or png allowed" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${
      request.user.email.split("@")[0] + Date.now()
    }.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });
  deleteImage(imageFileName);
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/customers/${request.user.email}`).update({
          imageUrl,
        });
      })
      .then(() => {
        return response.json({ message: "Image uploaded successfully" });
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({ error: error.code });
      });
  });
  busboy.end(request.rawBody);
};

exports.getShops = (request, response) => {
  var shops = [];
  var openingTime, closingTime, suffix;
  db.collection("shops")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        suffix = doc.data().openingHour >= 12 ? "PM" : "AM";
        openingTime =
          (doc.data().openingHour >= 12
            ? doc.data().openingHour - 12
            : doc.data().openingHour) +
          (doc.data().openingMinute > 0 ? ":" + doc.data().openingMinute : "") +
          " " +
          suffix;
        suffix = doc.data().closingHour >= 12 ? "PM" : "AM";
        closingTime =
          (doc.data().closingHour >= 12
            ? doc.data().closingHour - 12
            : doc.data().closingHour) +
          (doc.data().closingMinute > 0 ? ":" + doc.data().closingMinute : "") +
          " " +
          suffix;
        shops.push({
          shopName: doc.data().shopName,
          imageUrl: doc.data().imageUrl,
          address: doc.data().address,
          openingHour: doc.data().openingHour,
          closingHour: doc.data().closingHour,
          openingMinute: doc.data().openingMinute,
          closingMinute: doc.data().closingMinute,
          openingTimeIST: openingTime,
          closingTimeIST: closingTime,
          discount: doc.data().discount,
          shopRating: doc.data().shopRating,
          payment_modes: doc.data().payment_modes,
          tags: doc.data().tags,
        });
      });
      return response.json(shops);
    })
    .catch((err) => {
      console.error(err);
      return response.status(400).json({ error: err.code });
    });
};
