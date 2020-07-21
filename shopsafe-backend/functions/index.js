const functions = require("firebase-functions");
const app = require("express")();

const auth = require("./util/auth");
var cors = require("cors");
app.use(cors());

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

// common user routes
app.post("/login", loginuser);
app.get("/logout", auth, logoutuser);

app.post("/rate", auth, rateShop);

exports.api = functions.https.onRequest(app);
