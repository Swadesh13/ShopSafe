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
    } = data;
    const address =
        data.streetName +
        ", " +
        data.cityName +
        ", " +
        data.stateName +
        "-" +
        data.zipCode +
        ", " +
        data.country;
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

export const bookNewSlot = (data,id) => {
    const { itemList, period, slot } = data;
    const slotName = period.toLowerCase();
    const body = {
        "purchaseItems": itemList.join(),
        "slotName":slotName,
        "isShop": false,
        "shopId": id,
        "slotGroupBegins": slot.start,
        "slotGroupEnds": slot.end,
    };
    console.log(body);
    return http.protectedPost(api.bookSlot, body);
};

export const updateRadius = r => {
    const rad = r * 1000;
    return http.get(api.shopList, {
        radius: rad,
    });
}