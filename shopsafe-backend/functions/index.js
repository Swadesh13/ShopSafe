const functions = require("firebase-functions");
const app = require("express")();

const auth = require("./util/auth");
var cors = require("cors");
app.use(cors());

const { extract } = require("./APIs/flipkart-grid");

const { loginuser, logoutuser } = require("./APIs/user");

const { rateShop, getReviews, editReview } = require("./APIs/ratings");

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
  shopDetails,
  checkapi,
  encryptdata,
} = require("./APIs/customers");

const {
  getAllBookings,
  createBooking,
  deleteBooking,
  editBooking,
  approveBooking,
} = require("./APIs/bookings");

// shops routes
app.post("/signupshop", signUpShop);
app.post("/shop", auth, getShopDetail);
app.put("/shop", auth, updateShopDetails);
app.post("/shop/image", auth, uploadProfilePhotoShop);

// customer routes
app.post("/signup", signUpUser);
app.post("/user", auth, getUserDetail);
app.post("/shops", getShops);
app.put("/user", auth, updateUserDetails);
app.post("/image", auth, uploadProfilePhoto);
app.get("/shop/:shopId", shopDetails);
app.post("/reviews", getReviews);
app.put("/review", auth, editReview);
app.get("/checkapi", checkapi);

// bookings routes
app.post("/bookings", auth, getAllBookings);
app.post("/booking", auth, createBooking);
app.put("/booking/:bookingId", auth, editBooking);
app.delete("/booking/:bookingId", auth, deleteBooking);
app.post("/validate", auth, approveBooking);

// common user routes
app.post("/login", loginuser);
app.get("/logout", auth, logoutuser);

app.post("/encrypt", encryptdata);
app.post("/rate", auth, rateShop);

app.post("/extract", extract);

exports.api = functions.https.onRequest(app);
