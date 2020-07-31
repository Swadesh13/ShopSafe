const { db, admin } = require("../util/admin");
const config = require("../util/config");
const sha256 = require("sha256");

const firebase = require("firebase");
const { validateSignUpCustomer } = require("../util/validators");

firebase.initializeApp(config);

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
    // imageUrl: "url",
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
      firebase
        .auth()
        .signOut()
        .then(function () {
          return response.status(200).json({ message: "Sign Up Successful" });
          // Sign-out successful.
        })
        .catch(function (error) {
          console.error(error);
          return response.status(400).json({ error: error.code });
          // An error happened.
        });
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

// exports.getShops = (request, response) => {
//   console.log("logging here@@@", request.body.userLocation);
//   var openingTime, closingTime, suffix;
//   var originvalue = request.body.userLocation,
//     destination;
//   var metrics = [];
//   var shops = [];
//   var i = 0,
//     count = 0;

//   db.collection("shops")
//     .get()
//     .then((data) => {
//       i = 0;
//       count = 0;
//       data.forEach((doc) => {
//         i += 1;
//       });
//       data.forEach((doc) => {
//         var distance = require("google-distance");
//         distance.apiKey = "AIzaSyBixtvcF5A38Z2dVP9fFkcvLf5P59RmnEA";
//         // distance.apiKey = "AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk";
//         destination = doc.data().address;
//         originvalue = request.body.userLocation;
//         distance.get(
//           {
//             origin: originvalue,
//             destination: destination,
//           },
//           function (err, data) {
//             if (err) return console.log(err);
//             metrics.travelRadius = data.distanceValue;
//             metrics.travelTime = data.durationValue;

//             count += 1;
//             if (
//               metrics.travelRadius <=
//               (typeof request.body.radius == "undefined"
//                 ? 2000
//                 : request.body.radius)
//             ) {
//               suffix = doc.data().openingHour >= 12 ? "PM" : "AM";
//               openingTime =
//                 (doc.data().openingHour >= 12
//                   ? doc.data().openingHour - 12
//                   : doc.data().openingHour) +
//                 (doc.data().openingMinute > 0
//                   ? ":" + doc.data().openingMinute
//                   : "") +
//                 " " +
//                 suffix;
//               suffix = doc.data().closingHour >= 12 ? "PM" : "AM";
//               closingTime =
//                 (doc.data().closingHour >= 12
//                   ? doc.data().closingHour - 12
//                   : doc.data().closingHour) +
//                 (doc.data().closingMinute > 0
//                   ? ":" + doc.data().closingMinute
//                   : "") +
//                 " " +
//                 suffix;
//               shops.push({
//                 shopName: doc.data().shopName,
//                 imageUrl: doc.data().imageUrl,
//                 address: doc.data().address,
//                 openingHour: doc.data().openingHour,
//                 closingHour: doc.data().closingHour,
//                 openingMinute: doc.data().openingMinute,
//                 closingMinute: doc.data().closingMinute,
//                 openingTimeIST: openingTime,
//                 closingTimeIST: closingTime,
//                 discount: doc.data().discount,
//                 shopRating: doc.data().shopRating,
//                 payment_modes: doc.data().payment_modes,
//                 tags: doc.data().tags,
//                 shopId: doc.data().userId,
//                 ownerName: doc.data().ownerName,
//                 distancemetric: (metrics.travelRadius / 1000).toFixed(2),
//                 travelDuration: metrics.travelTime,
//               });
//             }

//             // if all shops are iterated over, then return the final shop list
//             if (count == i && shops.length > 0)
//               return response.status(200).json(shops);
//             else if (count == i && shops.length == 0)
//               return response.status(400).json({ message: "No shops found" });
//             // else
//             //   return response
//             //     .status(400)
//             //     .json({ message: "No shops were found" });
//           }
//         );
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       return response.status(400).json({ error: err.code });
//     });
// };

exports.getShops = (request, response) => {
  // console.log("logging here@@@", request.body.userLocation);
  var openingTime, closingTime, suffix;
  // var originvalue = request.body.userLocation,
  //   destination;
  // var metrics = [];
  var shops = [];
  // var i = 0,
  //   count = 0;

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
          shopId: doc.data().userId,
          ownerName: doc.data().ownerName,
          distancemetric: 1.54,
          travelDuration: 313,
        });
      });
    })
    .then(() => {
      return response.status(200).json(shops);
    })
    .catch((err) => {
      console.error(err);
      return response.status(400).json({ error: err.code });
    });
};

exports.shopDetails = (request, response) => {
  var shops = [];
  var openingTime, closingTime, suffix;
  db.collection("shops")
    .where("userId", "==", request.params.shopId)
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
          shopId: doc.data().userId,
          ownerName: doc.data().ownerName,
          phoneNumber: doc.data().phoneNumber,
        });
      });
      return response.json(shops);
    })
    .catch((err) => {
      console.error(err);
      return response.status(400).json({ error: err.code });
    });
};

exports.checkapi = (request, response) => {
  var distance = require("google-distance");
  distance.apiKey = "AIzaSyBixtvcF5A38Z2dVP9fFkcvLf5P59RmnEA";

  var origin =
    "South+City+Mall,+Prince+Anwar+Shah+Road,+South+City+Complex,+Jadavpur,+Calcutta,+West+Bengal,+India";
  var destination =
    "Jadavpur+University,+3,+Jadavpur,+Calcutta,+West+Bengal,+India";
  var url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=AIzaSyBixtvcF5A38Z2dVP9fFkcvLf5P59RmnEA`;

  distance.get(
    {
      origin: origin,
      destination: destination,
    },
    function (err, data) {
      if (err) return console.log(err);
      console.log(data);
    }
  );
};

exports.encryptdata = (request, response) => {
  var hash = sha256(request.body.data);
  return response.status(200).json({ hashValue: hash });
};
