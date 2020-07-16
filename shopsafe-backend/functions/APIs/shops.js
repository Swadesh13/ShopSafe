const { db, admin } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");
const { validateLoginData, validateSignUpShop } = require("../util/validators");

// firebase.initializeApp(config);

// Signup
exports.signUpShop = (request, response) => {
  const newUser = {
    shopName: request.body.shopName,
    ownerName: request.body.ownerName,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    phoneNumber: request.body.phoneNumber,
    address: request.body.address,
    openingHour: request.body.openingHour,
    closingHour: request.body.closingHour,
    openingMinute: request.body.openingMinute,
    closingMinute: request.body.closingMinute,
    tags: request.body.tags,
    shopRating: request.body.shopRating,
    // shopPhoto: "url",
    payment_modes: request.body.payment_modes,
    discount: request.body.discount,
    bookingTimeUnit: request.body.bookingTimeUnit,
    maxConcurrent: request.body.maxConcurrent,
  };

  const { valid, errors } = validateSignUpShop(newUser);

  if (!valid) return response.status(400).json(errors);

  let token, userId;
  db.doc(`/shops/${newUser.email}`)
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
        shopName: newUser.shopName,
        ownerName: newUser.ownerName,
        email: newUser.email,
        // password: newUser.password,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
        openingHour: newUser.openingHour,
        closingHour: newUser.closingHour,
        openingMinute: newUser.openingMinute,
        closingMinute: newUser.closingMinute,
        tags: newUser.tags,
        shopRating: newUser.shopRating,
        // shopPhoto: newUser.shopPhoto,
        payment_modes: newUser.payment_modes,
        discount: newUser.discount,
        bookingTimeUnit: newUser.bookingTimeUnit,
        createdAt: new Date().toISOString(),
        maxConcurrent: newUser.maxConcurrent,
        userId,
      };
      return db.doc(`/shops/${newUser.email}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      // return response.status(500).json({ general: 'Something went wrong, please try again' });
      return response.status(500).send(err.message);
    });
};

exports.getShopDetail = (request, response) => {
  let userData = {};
  db.doc(`/shops/${request.user.email}`)
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

exports.updateShopDetails = (request, response) => {
  let document = db.collection("shops").doc(`${request.user.email}`);
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
exports.uploadProfilePhotoShop = (request, response) => {
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
        return db.doc(`/shops/${request.user.email}`).update({
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
