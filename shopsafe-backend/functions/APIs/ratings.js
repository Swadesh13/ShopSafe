const { db, admin } = require("../util/admin");
const { validateRating, validateEditRating } = require("../util/validators");

exports.rateShop = (request, response) => {
  if (request.body.isShop == false) {
    var d = new Date();

    // db.collection("bookings")
    //   .where("customerId", "==", request.user.uid)
    //   .where("shopId", "==", request.body.shopId)
    //   .get()
    //   .then((data) => {
    //     data.forEach((doc) => {
    //       console.log(doc.exists);
    //       if (doc.exists) ratenow();
    //       else
    //         return response.status(400).json({
    //           message:
    //             "User should have completed at least one transaction to rate the shop",
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     return response.status(400).json(error.code);
    //   });

    // function ratenow() {
    var newRating = {
      rating: request.body.rating,
      review:
        typeof request.body.review == "undefined" ? "" : request.body.review,
      customerId: request.user.uid,
      shopId: request.body.shopId,
      createdAt: d.toISOString(),
    };

    const { valid, errors } = validateRating(newRating);

    if (!valid) return response.status(400).json(errors);

    fetch(newRating.shopId);

    function fetch(shopId) {
      var existingRating, existingReviews, shopEmail;
      db.collection("shops")
        .where("userId", "==", shopId)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            existingRating = doc.data().shopRating[0];
            existingReviews = doc.data().shopRating[1];
            shopEmail = doc.data().email;
          });
          update(shopEmail, existingRating, existingReviews);
        })
        .catch((error) => {
          console.error(error);
          return response.status(400).json(error.code);
        });
    }

    function getUser() {
      db.collection("customers")
        .where("userId", "==", request.user.uid)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            newRating.customerName =
              doc.data().firstName + " " + doc.data().lastName;
            newRating.imageUrl = doc.data().imageUrl;
          });
          // add here
          db.collection("ratings")
            .add(newRating)
            .then((doc) => {
              newRating.id = doc.id;
              return response.status(200).json(newRating);
            })
            .catch((err) => {
              console.error(err);
              return response.status(400).json(err);
            });
        });
    }
    function update(shopEmail, existingRating, existingReviews) {
      var currentReviews = existingReviews + 1;
      var currentRating = (
        (existingRating * existingReviews + newRating.rating) /
        currentReviews
      ).toFixed(1);

      db.doc(`shops/${shopEmail}`)
        .update({
          shopRating: [currentRating, currentReviews],
        })
        .then((data) => {
          newRating.currentRating = currentRating;
          newRating.currentReviews = currentReviews;
          getUser();
        });
    }
    // }
  } else {
    return response
      .status(400)
      .json({ message: "Only customer is allowed to rate shop" });
  }
};

exports.getReviews = (request, response) => {
  var ratingList = [];
  db.collection("ratings")
    .where("shopId", "==", request.body.shopId)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        ratingList.push({
          rating: doc.data().rating,
          review: doc.data().review,
          customerId: doc.data().customerId,
          customerName: doc.data().customerName,
          imageUrl: doc.data().imageUrl,
          createdAt: doc.data().createdAt,
          ratingId: doc.id,
        });
      });
      return response.status(200).json(ratingList);
    })
    .catch((error) => {
      console.error(error);
      return response.status(400).json(error.code);
    });
};

exports.editReview = (request, response) => {
  if (request.user.uid === request.body.customerId) {
    const validationData = {
      customerId: request.body.customerId,
      ratingId: request.body.ratingId,
      review: request.body.review,
    };
    const { valid, errors } = validateEditRating(validationData);

    if (!valid) return response.status(400).json(errors);

    const newRating = {
      review: request.body.review,
    };

    db.doc(`/ratings/${request.body.ratingId}`)
      .update(newRating)
      .then(() => {
        return response.status(200).json({ message: "Updated successfully" });
      });
  } else {
    return response.status(400).json({
      message: "User is only permitted to edit own review",
    });
  }
};
