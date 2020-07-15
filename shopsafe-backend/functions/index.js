const functions = require("firebase-functions");
const app = require("express")();

const auth = require("./util/auth");
var cors = require("cors");
app.use(cors());

const {
  signUpShop,
  loginShop,
  getShopDetail,
  updateShopDetails,
  uploadProfilePhotoShop,
} = require("./APIs/shops");

const {
  signUpUser,
  loginUser,
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
app.post("/loginshop", loginShop);
app.get("/shop", shop, auth, getShopDetail);
app.put("/shop", shop, auth, updateShopDetails);
app.post("/shop/image", shop, auth, uploadProfilePhotoShop);

// customer routes
app.post("/signup", signUpUser);
app.post("/login", loginUser);
app.get("/user", customer, auth, getUserDetail);
app.get("/shops", getShops);
app.put("/user", customer, auth, updateUserDetails);
app.post("/image", customer, auth, uploadProfilePhoto);
// app.post("/resetpassword", handleReset);

// bookings routes
app.get("/bookings", shop, auth, getAllBookings);
app.get("/userbookings", customer, auth, getAllBookings);
app.post("/booking", customer, auth, createBooking);
app.put("/booking/:bookingId", customer, auth, editBooking);
app.delete("/booking/:bookingId", customer, auth, deleteBooking);

function shop(request, response, next) {
  response.locals.collectionName = "shops";
  return next();
}
function customer(request, response, next) {
  response.locals.collectionName = "customers";
  return next();
}

exports.api = functions.https.onRequest(app);
