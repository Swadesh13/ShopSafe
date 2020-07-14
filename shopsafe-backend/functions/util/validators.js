const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
};

exports.validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
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
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	}

	if (isEmpty(data.shopname)) errors.shopName = 'Must not be empty';
	if (isEmpty(data.ownerName)) errors.ownerName = 'Must not be empty';
	if (!(data.phoneNumber) || data.phoneNumber<1e9 || data.phoneNumber>=1e10) errors.phoneNumber = 'Must be a 10 digit number';
	if (isEmpty(data.address)) errors.address = 'Must not be empty';

	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';
    if (!(data.openingHour) || !(data.openingHour>=0 && data.openingHour<24)) errors.openingHour='Must be between 0 and 24';
    if (!(data.closingHour)|| !(data.closingHour>=0 && data.closingHour<24)) errors.closingHour='Must be between 0 and 24';
	if (length(data.tags)==0) errors.tags = "Must have atleast 1 tag";
	if (length(data.payment_modes)==0) errors.payment_modes = "Must have atleast 1 payment_mode";
	if (!discount || discount<0 || discount>100) errors.discount = "Must be between 0 and 100";
    // if (length(data.shopRating)!=2) errors.shopRating = "Must have 2 fields: Rating and Number of customers";
    if (!(data.bookingTimeUnit) || data.bookingTimeUnit<=0) errors.bookingTimeUnit = "Must be a value greater than 0";
    if (!(data.maxConcurrent) || data.maxConcurrent<=0) errors.maxConcurrent = "Must be a value greater than 0"; 

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateSignUpCustomer = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	}

	if (isEmpty(data.firstName)) errors.firstName = 'Must not be empty';
	if (isEmpty(data.lastName)) errors.lastName = 'Must not be empty';
	if (!(data.phoneNumber) || data.phoneNumber<1e9 || data.phoneNumber>=1e10) errors.phoneNumber = 'Must be a 10 digit number';
	if (isEmpty(data.address)) errors.address = 'Must not be empty';

	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';
	// if (isEmpty(data.username)) errors.username = 'Must not be empty';

    const genders = ["Male", "Female", "Others"]
    if (!genders.includes(data.gender)) error.gender = "Must be a valid sex";

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};