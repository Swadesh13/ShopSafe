const functions = require('firebase-functions');
const app = require('express')();

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const auth = require('./util/auth');

const {
    signUpShop,
    loginShop,
    getShopDetail,
    updateShopDetails,
    uploadProfilePhotoShop
} = require('./APIs/shops')

const {
    signUpUser,
    loginUser,
    getUserDetail,
    updateUserDetails,
    uploadProfilePhoto
} = require('./APIs/customers')

app.post('/signupshop',signUpShop)
app.post('/loginshop',loginShop)
app.get('/shop', shop, auth, getShopDetail)
app.put('/shop', shop, auth, updateShopDetails);
app.post('/shop/image', shop, auth, uploadProfilePhotoShop);

app.post('/signup',signUpUser)
app.post('/login',loginUser)
app.get('/user', customer, auth, getUserDetail)
app.put('/user', customer, auth, updateUserDetails);
app.post('/image', customer, auth, uploadProfilePhoto);

function shop(request, response, next){
    response.locals.collectionName = 'shops';
    return next();
}
function customer(request, response, next){
    response.locals.collectionName = 'customers';
    return next();
}

exports.api = functions.https.onRequest(app);