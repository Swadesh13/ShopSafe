const functions = require("firebase-functions");
const app = require("express")();

const auth = require("./util/auth");
var cors = require("cors");
app.use(cors());

const { loginUser, logoutuser } = require("./APIs/user");

const {
  signUpShop,
  getShopDetail,
  updateShopDetails,
  uploadProfilePhotoShop,
} = require("./APIs/shops");

const {
  signUpUser,
  getUserDetail,
  updateUserDetails,
  uploadProfilePhoto,
  getShops,
} = require("./APIs/customers");

const {
  getAllBookings,
  createBooking,
  deleteBooking,
  editBooking,
} = require("./APIs/bookings");

// shops routes
app.post("/signupshop", signUpShop);
app.get("/shop", auth, getShopDetail);
app.put("/shop", auth, updateShopDetails);
app.post("/shop/image", auth, uploadProfilePhotoShop);

// customer routes
app.post("/signup", signUpUser);
app.get("/user", auth, getUserDetail);
app.get("/shops", getShops);
app.put("/user", auth, updateUserDetails);
app.post("/image", auth, uploadProfilePhoto);

// bookings routes
app.get("/bookings", auth, getAllBookings);
app.post("/booking", auth, createBooking);
app.put("/booking/:bookingId", auth, editBooking);
app.delete("/booking/:bookingId", auth, deleteBooking);

// common user routes
app.post("/login", loginUser);
app.get("/logout", logoutuser);

exports.api = functions.https.onRequest(app);
