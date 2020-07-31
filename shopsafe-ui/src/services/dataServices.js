import http from "./httpServices";
import api from "../configApi.json";

export const getShopList = (r=3) => {
    const rad = r * 1000;
    const response = http.post(api.shopList, {
        userLocation:localStorage.getItem("userAddress"),
        radius: rad,
    });
    return response;
};

export const getShopDetails = (id) => {
    const response = http.get(
        api.shopData + `/${id}`,
        {params: {
            isShop: false,
            
        }}
    );
    return response;
};

export const getReviews = id => {
    return http.post(api.reviews, {
        "shopId": id
    });
}

export const getMyBookings = () => {
    return http.protectedPost(api.myBookings, { isShop: false });
}

export const getShopBookings = () => {
    return http.protectedPost(api.myBookings, { isShop: true });
}