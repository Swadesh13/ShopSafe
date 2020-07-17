const { db, admin } = require("../util/admin");
const { validateBooking } = require("../util/validators");
// const config = require("../util/config");

// const firebase = require("firebase");
// firebase.initializeApp(config);

exports.getAllBookings = (request, response) => {
  // console.log("request object", request.user);
  if (request.user.isShop) {
    db.collection("bookings")
      .where("shopId", "==", request.user.uid)
      .orderBy("arrivalHour", "asc")
      .orderBy("arrivalMinute", "asc")
      .get()
      .then((data) => {
        var arrivalTime, deliveryTime, suffix;
        let bookings = [];
        data.forEach((doc) => {
          suffix = doc.data().arrivalHour >= 12 ? "PM" : "AM";
          arrivalTime =
            (doc.data().arrivalHour >= 12
              ? doc.data().arrivalHour - 12
              : doc.data().arrivalHour) +
            (doc.data().arrivalMinute > 0
              ? ":" + doc.data().arrivalMinute
              : "") +
            " " +
            suffix;
          suffix = doc.data().deliveryHour >= 12 ? "PM" : "AM";
          deliveryTime =
            (doc.data().deliveryHour >= 12
              ? doc.data().deliveryHour - 12
              : doc.data().deliveryHour) +
            (doc.data().deliveryMinute > 0
              ? ":" + doc.data().deliveryMinute
              : "") +
            " " +
            suffix;
          bookings.push({
            bookingId: doc.id,
            shopId: doc.data().shopId,
            slotName: doc.data().shopName,
            slotGroupBegins: doc.data().slotGroupBegins,
            slotGroupEnds: doc.data().slotGroupEnds,
            duration: doc.data().duration,
            customerId: doc.data().customerId,
            purchaseItems: doc.data().purchaseItems,
            arrivalHour: doc.data().arrivalHour,
            arrivalMinute: doc.data().arrivalMinute,
            deliveryHour: doc.data().deliveryHour,
            deliveryMinute: doc.data().deliveryMinute,
            arrivalTimeIST: arrivalTime,
            deliveryTimeIST: deliveryTime,
            createdAt: doc.data().createdAt,
          });
        });
        return response.json(bookings);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  } else {
    db.collection("bookings")
      .where("customerId", "==", request.user.uid)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        var arrivalTime, deliveryTime, suffix;
        let bookings = [];
        data.forEach((doc) => {
          suffix = doc.data().arrivalHour >= 12 ? "PM" : "AM";
          arrivalTime =
            (doc.data().arrivalHour >= 12
              ? doc.data().arrivalHour - 12
              : doc.data().arrivalHour) +
            (doc.data().arrivalMinute > 0
              ? ":" + doc.data().arrivalMinute
              : "") +
            " " +
            suffix;
          suffix = doc.data().deliveryHour >= 12 ? "PM" : "AM";
          deliveryTime =
            (doc.data().deliveryHour >= 12
              ? doc.data().deliveryHour - 12
              : doc.data().deliveryHour) +
            (doc.data().deliveryMinute > 0
              ? ":" + doc.data().deliveryMinute
              : "") +
            " " +
            suffix;
          bookings.push({
            bookingId: doc.id,
            shopId: doc.data().shopId,
            slotName: doc.data().shopName,
            slotGroupBegins: doc.data().slotGroupBegins,
            slotGroupEnds: doc.data().slotGroupEnds,
            duration: doc.data().duration,
            customerId: doc.data().customerId,
            purchaseItems: doc.data().purchaseItems,
            arrivalHour: doc.data().arrivalHour,
            arrivalMinute: doc.data().arrivalMinute,
            deliveryHour: doc.data().deliveryHour,
            deliveryMinute: doc.data().deliveryMinute,
            arrivalTimeIST: arrivalTime,
            deliveryTimeIST: deliveryTime,
            createdAt: doc.data().createdAt,
          });
        });
        return response.json(bookings);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  }
  //   }
  // });
};

exports.createBooking = (request, response) => {
  var shopDetails = [];
  db.collection("shops")
    .where("userId", "==", request.body.shopId)
    .limit(1)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        shopDetails.push({
          openingHour: doc.data().openingHour,
          closingHour: doc.data().closingHour,
          maxConcurrent: doc.data().maxConcurrent,
          bookingTimeUnit: doc.data().bookingTimeUnit,
          shopName: doc.data().shopName,
        });
      });
      booknow(shopDetails);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
  function booknow(shopDetails) {
    if (request.user.isShop) {
      return response.status(400).json({
        message: "User must be logged in as customer to create booking",
      });
    } else if (
      request.body.slotGroupBegins < shopDetails[0].openingHour ||
      request.body.slotGroupEnds > shopDetails[0].closingHour
    ) {
      return response
        .status(400)
        .json({ message: "Slots not permitted outside of shop working hours" });
    } else {
      var d = new Date();
      var currentOffset = d.getTimezoneOffset();
      var ISTOffset = 330;
      var ISTTime = new Date(d.getTime() + (ISTOffset + currentOffset) * 60000);

      const { valid, errors } = validateBooking(request.body);

      if (!valid) return response.status(400).json(errors);

      var listCustomers = [],
        tempCustomers = [],
        c = 0;
      var ArrivalMinute = 0;

      db.collection("bookings")
        .where("shopId", "==", request.body.shopId)
        .where("slotGroupBegins", "==", request.body.slotGroupBegins)
        .where("slotGroupEnds", "==", request.body.slotGroupEnds)
        .orderBy("deliveryHour", "asc")
        .orderBy("deliveryMinute", "asc")
        .get()
        .then((data) => {
          data.forEach((doc) => {
            listCustomers.push({
              Hour: doc.data().deliveryHour,
              Minute: doc.data().deliveryMinute,
            });
          });
          if (listCustomers.length >= shopDetails[0].maxConcurrent) {
            for (
              var i = listCustomers.length - shopDetails[0].maxConcurrent;
              i < listCustomers.length;
              i++
            ) {
              if (listCustomers[i].Hour == request.body.slotGroupEnds) c += 1;
            }
            if (c == shopDetails[0].maxConcurrent)
              return response.status(400).json({ message: "Slot full" });
          }

          db.collection("bookings")
            .where("shopId", "==", request.body.shopId)
            .where("deliveryHour", "==", request.body.slotGroupBegins)
            .orderBy("deliveryMinute", "asc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                tempCustomers.push({
                  Hour: doc.data().deliveryHour,
                  Minute: doc.data().deliveryMinute,
                });
              });
              if (tempCustomers.length >= shopDetails[0].maxConcurrent) {
                listCustomers = tempCustomers;
              }
              create(listCustomers);
            });
          // return response.json(lastCustomer[0]);
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({ error: err.code });
        });

      function create(listCustomers) {
        var items = request.body.purchaseItems;
        var nItems = items.split(",").length;

        var duration =
          nItems * shopDetails[0].bookingTimeUnit > 30
            ? 30
            : nItems * shopDetails[0].bookingTimeUnit;
        if (listCustomers.length >= shopDetails[0].maxConcurrent) {
          ArrivalMinute =
            listCustomers[listCustomers.length - shopDetails[0].maxConcurrent]
              .Minute;
        }

        if (ArrivalMinute + duration > 70)
          return response.status(400).json({
            message: `You will be allotted more than allowed time into next slot. Please change your slot or reduce items`,
          });

        var expectedMinute = (ArrivalMinute + duration) % 60;

        var expectedHour =
          request.body.slotGroupBegins +
          Math.trunc((ArrivalMinute + duration) / 60);

        // Checking if current booking clashes with initial bookings of next slot group
        var nextSlotBookings = [],
          nextSlotCount = 0;
        db.collection("bookings")
          .where("shopId", "==", request.body.shopId)
          .where("slotGroupBegins", "==", request.body.slotGroupBegins + 1)
          .where("slotGroupEnds", "==", request.body.slotGroupEnds + 1)
          .orderBy("arrivalHour", "asc")
          .orderBy("arrivalMinute", "asc")
          .limit(shopDetails[0].maxConcurrent)
          .get()
          .then((data) => {
            data.forEach((doc) => {
              nextSlotBookings.push({
                hour: doc.data().arrivalHour,
                minute: doc.data().arrivalMinute,
              });
            });
            if (nextSlotBookings.length > 0) {
              for (var i = 0; i < nextSlotBookings.length; i++) {
                if (
                  nextSlotBookings[i].hour == expectedHour &&
                  nextSlotBookings[i].minute < expectedMinute
                )
                  nextSlotCount += 1;
              }
            }
            if (nextSlotCount >= shopDetails[0].maxConcurrent)
              return response.status(400).json({
                message:
                  "Duration is too long. Next hour slot is already booked",
              });
            else finalCreate();
          });

        function finalCreate() {
          const newBooking = {
            shopId: request.body.shopId,
            slotName: request.body.slotName,
            slotGroupBegins: request.body.slotGroupBegins,
            slotGroupEnds: request.body.slotGroupEnds,
            customerId: request.user.uid,
            purchaseItems: items,
            arrivalHour: request.body.slotGroupBegins,
            arrivalMinute: ArrivalMinute,
            duration: duration,
            deliveryHour: expectedHour,
            deliveryMinute: expectedMinute,
            createdAt: d.toISOString(),
          };

          // if first slot of next slot group is not full then overflow booking permitted
          // overflow booking means if bookings of current slot extends to next slot
          db.collection("bookings")
            .add(newBooking)
            .then((doc) => {
              var arrivalTime, deliveryTime, suffix;
              suffix = newBooking.arrivalHour >= 12 ? "PM" : "AM";
              arrivalTime =
                newBooking.arrivalHour >= 12
                  ? newBooking.arrivalHour - 12
                  : newBooking.arrivalHour +
                    (newBooking.arrivalMinute > 0
                      ? ":" + newBooking.arrivalMinute
                      : "") +
                    " " +
                    suffix;
              suffix = newBooking.deliveryHour >= 12 ? "PM" : "AM";
              deliveryTime =
                newBooking.deliveryHour >= 12
                  ? newBooking.deliveryHour - 12
                  : newBooking.deliveryHour +
                    (newBooking.deliveryMinute > 0
                      ? ":" + newBooking.deliveryMinute
                      : "") +
                    " " +
                    suffix;
              let responseBooking = newBooking;
              responseBooking.bookingId = doc.id;
              responseBooking.arrivalTimeIST = arrivalTime;
              responseBooking.deliveryTimeIST = deliveryTime;
              return response.json(responseBooking);
            })
            .catch((err) => {
              response.status(500).json({ error: "Something went wrong" });
              console.error(err);
            });
        }
      }
    }
  }
};

//Edit booking - Customer cannot change shop name, booking ID, booking creation time.
// Can only reschedule the time and corresponding slot name if that mentioned slot is vacant
exports.editBooking = (request, response) => {
  var d = new Date();

  var shopDetails = [];

  if (request.body.bookingId || request.body.createdAt || request.body.shopId) {
    response
      .status(403)
      .json({ message: "Customer is only allowed to change time" });
  }

  db.doc(`/bookings/${request.params.bookingId}`)
    .get()
    .then((doc) => {
      if (request.body.slotGroupBegins <= doc.data().arrivalHour)
        return response
          .status(400)
          .json({ message: "Only booking postponement is allowed" });
      else {
        //Create booking now

        var listCustomers = [],
          tempCustomers = [],
          c = 0;
        var ArrivalMinute = 0;

        db.collection("bookings")
          .where("shopId", "==", doc.data().shopId)
          .where("slotGroupBegins", "==", request.body.slotGroupBegins)
          .where("slotGroupEnds", "==", request.body.slotGroupEnds)
          .orderBy("deliveryHour", "asc")
          .orderBy("deliveryMinute", "asc")
          .get()
          .then((data1) => {
            data1.forEach((doc1) => {
              listCustomers.push({
                Hour: doc1.data().deliveryHour,
                Minute: doc1.data().deliveryMinute,
              });
            });

            db.collection("shops")
              .where("userId", "==", doc.data().shopId)
              .limit(1)
              .get()
              .then((datashop) => {
                datashop.forEach((docshop) => {
                  shopDetails.push({
                    openingHour: docshop.data().openingHour,
                    closingHour: docshop.data().closingHour,
                    maxConcurrent: docshop.data().maxConcurrent,
                    bookingTimeUnit: docshop.data().bookingTimeUnit,
                    shopName: docshop.data().shopName,
                  });
                });
                console.log(shopDetails);
                editBookingNow(shopDetails);
              })
              .catch((err) => {
                console.error(err);
                return response.status(500).json({ error: err.code });
              });
            function editBookingNow(shopDetails) {
              if (listCustomers.length >= shopDetails[0].maxConcurrent) {
                for (
                  var i = listCustomers.length - shopDetails[0].maxConcurrent;
                  i < listCustomers.length;
                  i++
                ) {
                  if (listCustomers[i].Hour == request.body.slotGroupEnds)
                    c += 1;
                }
                if (c == shopDetails[0].maxConcurrent)
                  return response.status(400).json({ message: "Slot full" });
              }

              db.collection("bookings")
                .where("shopId", "==", doc.data().shopId)
                .where("deliveryHour", "==", request.body.slotGroupBegins)
                .orderBy("deliveryMinute", "asc")
                .get()
                .then((data2) => {
                  data2.forEach((doc2) => {
                    tempCustomers.push({
                      Hour: doc2.data().deliveryHour,
                      Minute: doc2.data().deliveryMinute,
                    });
                  });
                  if (tempCustomers.length >= shopDetails[0].maxConcurrent) {
                    listCustomers = tempCustomers;
                  }
                  create(listCustomers, shopDetails);
                });
            }
          })
          .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
          });

        function create(listCustomers, shopDetails) {
          var duration = doc.data().duration;
          if (listCustomers.length >= shopDetails[0].maxConcurrent) {
            ArrivalMinute =
              listCustomers[listCustomers.length - shopDetails[0].maxConcurrent]
                .Minute;
          }

          var expectedMinute = (ArrivalMinute + duration) % 60;

          var expectedHour =
            request.body.slotGroupBegins +
            Math.trunc((ArrivalMinute + duration) / 60);

          // Checking if current booking clashes with initial bookings of next slot group
          var nextSlotBookings = [],
            nextSlotCount = 0;
          db.collection("bookings")
            .where("shopId", "==", doc.data().shopId)
            .where("slotGroupBegins", "==", request.body.slotGroupBegins + 1)
            .where("slotGroupEnds", "==", request.body.slotGroupEnds + 1)
            .orderBy("arrivalHour", "asc")
            .orderBy("arrivalMinute", "asc")
            .limit(shopDetails[0].maxConcurrent)
            .get()
            .then((data3) => {
              data3.forEach((doc3) => {
                nextSlotBookings.push({
                  hour: doc3.data().arrivalHour,
                  minute: doc3.data().arrivalMinute,
                });
              });
              if (nextSlotBookings.length > 0) {
                for (var i = 0; i < nextSlotBookings.length; i++) {
                  if (
                    nextSlotBookings[i].hour == expectedHour &&
                    nextSlotBookings[i].minute < expectedMinute
                  )
                    nextSlotCount += 1;
                }
              }
              if (nextSlotCount >= shopDetails[0].maxConcurrent)
                return response.status(400).json({
                  message:
                    "Duration is too long. Next hour slot is already booked",
                });
              else updatenow();
            });

          function updatenow() {
            const newBooking = {
              shopId: doc.data().shopId,
              slotName: request.body.slotName,
              slotGroupBegins: request.body.slotGroupBegins,
              slotGroupEnds: request.body.slotGroupEnds,
              arrivalHour: request.body.slotGroupBegins,
              arrivalMinute: ArrivalMinute,
              duration: duration,
              deliveryHour: expectedHour,
              deliveryMinute: expectedMinute,
              createdAt: d.toISOString(),
            };

            db.doc(`/bookings/${request.params.bookingId}`)
              .update(newBooking)
              .then(() => {
                // slide users in that slot upwards
                var checkOne = -3;
                db.collection("bookings")
                  .where("shopId", "==", doc.data().shopId)
                  .where("slotGroupBegins", "==", doc.data().slotGroupBegins)
                  .where("slotGroupEnds", "==", doc.data().slotGroupEnds)
                  .where("arrivalMinute", ">", doc.data().arrivalMinute)
                  .orderBy("arrivalMinute", "asc")
                  .orderBy("createdAt", "asc")
                  .get()
                  .then((data4) => {
                    data4.forEach((doc4) => {
                      if (doc4.data().arrivalMinute != checkOne) {
                        db.doc(`/bookings/${doc4.id}`).update({
                          arrivalMinute: doc4.data().arrivalMinute - duration,
                          arrivalHour: doc4.data().arrivalHour,
                          deliveryMinute:
                            doc4.data().deliveryMinute - duration >= 0
                              ? doc4.data().deliveryMinute - duration
                              : 60 - (duration - doc4.data().deliveryMinute),
                          deliveryHour:
                            doc4.data().deliveryMinute - duration >= 0
                              ? doc4.data().deliveryHour
                              : doc4.data().deliveryHour - 1,
                        });
                        checkOne = doc4.data().arrivalMinute;
                      }
                    });
                  });
                var arrivalTime, deliveryTime, suffix;
                suffix = newBooking.arrivalHour >= 12 ? "PM" : "AM";
                arrivalTime =
                  newBooking.arrivalHour >= 12
                    ? newBooking.arrivalHour - 12
                    : newBooking.arrivalHour +
                      (newBooking.arrivalMinute > 0
                        ? ":" + newBooking.arrivalMinute
                        : "") +
                      " " +
                      suffix;
                suffix = newBooking.deliveryHour >= 12 ? "PM" : "AM";
                deliveryTime =
                  newBooking.deliveryHour >= 12
                    ? newBooking.deliveryHour - 12
                    : newBooking.deliveryHour +
                      (newBooking.deliveryMinute > 0
                        ? ":" + newBooking.deliveryMinute
                        : "") +
                      " " +
                      suffix;
                response.json({
                  message: "Booking updated successfully",
                  arrivalHour: newBooking.arrivalHour,
                  arrivalMinute: newBooking.arrivalMinute,
                  deliveryHour: newBooking.deliveryHour,
                  deliveryMinute: newBooking.deliveryMinute,
                  arrivalTimeIST: arrivalTime,
                  deliveryTimeIST: deliveryTime,
                });
              })
              .catch((err) => {
                console.error(err);
                return response.status(500).json({
                  error: err.code,
                });
              });
          } //updatenow function ends
        } //create function ends
      } //else block ends
    }) //firestore operation block ends
    .catch((err) => {
      console.error(err);
      return response.status(400).json({ error: err.code });
    });
};

exports.deleteBooking = (request, response) => {
  const document = db.doc(`/bookings/${request.params.bookingId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists)
        return response.status(404).json({ error: "Booking not found" });
      if (doc.data().customerId != request.user.uid)
        return response
          .status(400)
          .json({ message: "Customer can delete only his own booking" });

      var checkOne = -3;
      db.collection("bookings")
        .where("shopId", "==", doc.data().shopId)
        .where("slotGroupBegins", "==", doc.data().slotGroupBegins)
        .where("slotGroupEnds", "==", doc.data().slotGroupEnds)
        .where("arrivalMinute", ">", doc.data().arrivalMinute)
        .orderBy("arrivalMinute", "asc")
        .orderBy("createdAt", "asc")
        .get()
        .then((data4) => {
          data4.forEach((doc4) => {
            if (doc4.data().arrivalMinute != checkOne) {
              db.doc(`/bookings/${doc4.id}`).update({
                arrivalMinute: doc4.data().arrivalMinute - doc.data().duration,
                arrivalHour: doc4.data().arrivalHour,
                deliveryMinute:
                  doc4.data().deliveryMinute - doc.data().duration >= 0
                    ? doc4.data().deliveryMinute - doc.data().duration
                    : 60 - (doc.data().duration - doc4.data().deliveryMinute),
                deliveryHour:
                  doc4.data().deliveryMinute - doc.data().duration >= 0
                    ? doc4.data().deliveryHour
                    : doc4.data().deliveryHour - 1,
              });
              checkOne = doc4.data().arrivalMinute;
            }
          });
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({
            error: err.code,
          });
        });

      return document.delete();
    })
    .then(() => {
      response.json({ message: "Booking deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
