import http from './httpServices';
import api from '../configApi.json';

var Hash = require("sha256");

export const customerRegister =  data => {
    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = data;
    const address = data.streetname + ", " + data.cityName + ", " + data.stateName + ", " + data.country;
    const userData = {
      firstName,
      lastName,
      email,
      password:Hash(password), 
      confirmPassword:Hash(confirmPassword), 
      phoneNumber,
      address,
      gender: "Male",
    };
    const response = http.post(api.customerSignup, userData);
    
    return ( response );
}

export const ShopRegister = data => {
    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = data;
    const address = data.streetname + ", " + data.cityName + ", " + data.stateName + ", " + data.country;
    const userData = {
      firstName,
      lastName,
      email,
      password:Hash(password), 
      confirmPassword:Hash(confirmPassword), 
      phoneNumber,
      address,
    };
    const response = http.post(api.customerSignup, userData);
    
    return ( response );
}
 

export const login = (email,password) => {
  const response = http.post(api.login, {
    email,
    password:Hash(password)
  });
  return response;
}
