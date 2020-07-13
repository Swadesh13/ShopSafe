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
	if (isEmpty(data.phoneNumber)) errors.phoneNumber = 'Must not be empty';
	if (isEmpty(data.address)) errors.address = 'Must not be empty';

	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';
    if (!(data.openingHour) || !(data.openingHour>=0 && data.openingHour<24)) errors.openingHour='Must be between 0 and 24';
    if (isEmpty(data.closingHour)|| !(data.closingHour>=0 && data.closingHour<24)) errors.closingHour='Must be between 0 and 24';
    if (length(data.tags)==0) errors.tags = "Must have atleast 1 tag";
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
	if (isEmpty(data.phoneNumber)) errors.phoneNumber = 'Must not be empty';
	if (isEmpty(data.address)) errors.address = 'Must not be empty';

	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';
	if (isEmpty(data.username)) errors.username = 'Must not be empty';

    const genders = ["Male", "Female", "Others"]
    if (!genders.includes(data.gender)) error.gender = "Must be a valid sex";

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};