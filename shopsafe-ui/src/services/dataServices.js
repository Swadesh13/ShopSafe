import http from "./httpServices";
import api from "../configApi.json";

export const getShopList = () => {
    // try {
        // const response = await http.get(api.shopList, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
    //     const response = await http.get(api.shopList);
    //     return response.data;

    // } catch (ex) {
    //     console.log(ex);
    // }
    const response = http.post(api.shopList, {
        userLocation:
            "South City Mall, Prince Anwar Shah Road, South City Complex, Jadavpur, Calcutta, West Bengal,India",
        radius: 3000,
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