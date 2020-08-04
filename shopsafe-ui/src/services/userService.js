import http from "./httpServices";
import api from "../configApi.json";

var Hash = require("sha256");

export const customerRegister = (data) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber,
    } = data;
    const address =
        data.streetname +
        ", " +
        data.cityName +
        ", " +
        data.stateName +
        ", " +
        data.country;
    const userData = {
        firstName,
        lastName,
        email,
        password: Hash(password),
        confirmPassword: Hash(confirmPassword),
        phoneNumber,
        address,
        gender: "Male",
    };
    const response = http.post(api.customerSignup, userData);

    return response;
};

export const ShopRegister = (data) => {
    const {
        firstName,
        lastName,
        shopName,
        email,
        phoneNumber,
        password,
        confirmPassword,
        openingHour,
        openingMinute,
        closingHour,
        closingMinute,
        tags,
        bookingTimeUnit,
        maxConcurrent,
        payment_modes,
        discount,
        address,
    } = data;
    const userData = {
        shopName,
        ownerName: firstName + " " + lastName,
        email,
        password: Hash(password),
        confirmPassword: Hash(confirmPassword),
        phoneNumber: parseInt(phoneNumber),
        address,
        openingHour,
        openingMinute,
        closingHour,
        closingMinute,
        tags,
        bookingTimeUnit,
        maxConcurrent,
        payment_modes,
        discount,
    };
    const response = http.post(api.shopSignup, userData);

    return response;
};

export const login = (email, password) => {
    const response = http.post(api.login, {
        email,
        password: Hash(password),
    });
    return response;
};

export const logout = () => {
    const response = http.protectedGet(api.logout);
    return response;
};

export const bookNewSlot = (data, id) => {
    const { itemList, period, slot } = data;
    const slotName = period.toLowerCase();
    const body = {
        purchaseItems: itemList.join(),
        slotName: slotName,
        isShop: false,
        shopId: id,
        otp: Math.round(Math.random(0, 1) * 777777 + 222222),
        slotGroupBegins: slot.start,
        slotGroupEnds: slot.end,
        customerName: localStorage.getItem("userName"),
    };
    console.log(body);
    return http.protectedPost(api.bookSlot, body);
};

// export const updateRadius = (r) => {
//     const rad = r * 1000;
//     console.log("radius", r);
//     return http.post(api.shopList, {
//         userLocation: localStorage.getItem("userAddress"),
//         radius: rad,
//     });
// };

export const updateBookings = (data, id) => {
    return http.protectedPut(api.editBooking + id, {
        slotName: data.period.toLowerCase(),
        slotGroupBegins: data.slot.start,
        slotGroupEnds: data.slot.end,
        isShop: false,
    });
};

export const userDetails = () => {
    return http.protectedPost(api.userData, { isShop: false });
}

export const deleteSlots = (id) => {
    return http.protectedDelete(api.editBooking + id, { isShop: false });
};

export const giveReview = (rating, shopId, text = "") => {
    if (text)
        return http.protectedPost(api.giveRating, {
            shopId,
            rating,
            review: text,
            isShop: false,
        });
    else
        return http.protectedPost(api.giveRating, {
            shopId,
            rating,
            isShop: false,
        });
};

export const getShopDetailsAuthorized = () => {
    return http.protectedPost(api.shopData, {
        isShop: true,
    });
};

export const uploadPhoto = file => {
    return http.protectedPost(api.uploadProfilePhoto, file);
}

export const validateSlotByOtp = (bookingId, otp) => {
    console.log("validate", bookingId + "@@##$$" + otp);
    return http.protectedPost(api.validateSlot, {
        isShop: true,
        qrdata: bookingId + "@@##$$" + otp,
    });
}