const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateLoginData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

// Signup Validation
const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateSignUpShop = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be valid email address";
  }

  if (isEmpty(data.shopName)) errors.shopName = "Must not be empty";
  if (isEmpty(data.ownerName)) errors.ownerName = "Must not be empty";
  if (!data.phoneNumber || data.phoneNumber < 1e9 || data.phoneNumber >= 1e10)
    errors.phoneNumber = "Must be a 10 digit number";
  if (isEmpty(data.address)) errors.address = "Must not be empty";

  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passowrds must be the same";
  if (!data.openingHour || !(data.openingHour >= 0 && data.openingHour < 24))
    errors.openingHour = "Must be between 0 and 24";
  if (!data.closingHour || !(data.closingHour >= 0 && data.closingHour < 24))
    errors.closingHour = "Must be between 0 and 24";
  // console.log(data.openingMinute);
  if (
    typeof data.openingMinute == "undefined" ||
    !(data.openingMinute >= 0 && data.openingMinute < 60)
  )
    errors.openingMinute = "Must be between 0 and 60";
  if (
    typeof data.closingMinute == "undefined" ||
    !(data.closingMinute >= 0 && data.closingMinute < 60)
  )
    errors.closingMinute = "Must be between 0 and 60";
  if (data.tags.length == 0) errors.tags = "Must have atleast 1 tag";
  if (data.payment_modes.length == 0)
    errors.payment_modes = "Must have atleast 1 payment_mode";
  if (!data.discount || data.discount < 0 || data.discount > 100)
    errors.discount = "Must be between 0 and 100";
  // if (length(data.shopRating)!=2) errors.shopRating = "Must have 2 fields: Rating and Number of customers";
  if (!data.bookingTimeUnit || data.bookingTimeUnit <= 0)
    errors.bookingTimeUnit = "Must be a value greater than 0";
  if (!data.maxConcurrent || data.maxConcurrent <= 0)
    errors.maxConcurrent = "Must be a value greater than 0";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignUpCustomer = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be valid email address";
  }

  if (isEmpty(data.firstName)) errors.firstName = "Must not be empty";
  if (isEmpty(data.lastName)) errors.lastName = "Must not be empty";
  if (!data.phoneNumber || data.phoneNumber < 1e9 || data.phoneNumber >= 1e10)
    errors.phoneNumber = "Must be a 10 digit number";
  if (isEmpty(data.address)) errors.address = "Must not be empty";

  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passowrds must be the same";
  // if (isEmpty(data.username)) errors.username = 'Must not be empty';

  const genders = ["Male", "Female", "Others"];
  if (!genders.includes(data.gender)) errors.gender = "Must be a valid sex";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateBooking = (data) => {
  let errors = {};
  if (isEmpty(data.shopId)) errors.shopId = "Shop ID should not be empty";
  if (isEmpty(data.slotName)) errors.slotName = "Slot Name should not be empty";
  if (data.slotGroupBegins == "")
    errors.slotGroupBegins = "Slot beginning time should not be empty";
  if (data.slotGroupEnds == "")
    errors.slotGroupEnds = "Slot ending time should not be empty";
  if (isEmpty(data.purchaseItems))
    errors.purchaseItems = "Purchase Items should not be empty";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateRating = (data) => {
  let errors = {};

  if (!data.rating || !(data.rating > 0 && data.rating <= 5))
    errors.rating = "Rating should be a valid value between 0 and 5";

  if (isEmpty(data.shopId)) errors.shopId = "Shop ID should not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateEditRating = (data) => {
  let errors = {};

  if (typeof data.review == "undefined" || isEmpty(data.review))
    errors.review = "Review should not be empty";

  if (typeof data.customerId == "undefined" || isEmpty(data.customerId))
    errors.customerId = "Customer ID should not be empty";

  if (typeof data.ratingId == "undefined" || isEmpty(data.ratingId))
    errors.ratingId = "Rating ID should not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
