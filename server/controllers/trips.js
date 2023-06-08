const express = require("express");
const router = express.Router();
const {
  getAllTrips,
  getTripById,
  createTrip,
  updateTripById,
  deleteTripById,
} = require("../models/trip");

router.get("/trips", (req, res, next) => {
  return getAllTrips()
    .then((trips) => res.json(trips))
    .catch((err) => next(err));
});

router.get("/trips/:tripId", (req, res, next) => {
    const tripId = Number(req.params.tripId);
  return getTripById(tripId)
    .then((trip) => res.json(trip))
    .catch((err) => next(err));
});

router.post("/trips", async (req, res, next) => {
    const { user_id, name, start_date, end_date, is_public, is_active } = req.body;
    try {
      const trip = await createTrip({ user_id, name, start_date, end_date, is_public, is_active });
      const { user_name, ...rest } = trip;
      res.json({ ...rest, user_name });
    } catch (error) {
      next(error);
    }
  });

router.put("/trips/:tripId", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  const { name, start_date, end_date, is_public, is_active } = req.body;
  const tripUpdates = { name, start_date, end_date, is_public, is_active };
  return updateTripById(tripId, tripUpdates)
    .then((trip) => res.json(trip))
    .catch((err) => next(err));
});

router.delete("/trips/:tripId", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  return deleteTripById(tripId)
    .then(() => res.json({ message: "Trip deleted successfully" }))
    .catch((err) => next(err));
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const {
//   getAllTrips,
//   getTripById,
//   createTrip,
//   updateTripById,
//   deleteTripById,
// } = require("../models/trip");

// const upload = require("../models/upload");

// router.get("/trips", (req, res, next) => {
//   return getAllTrips()
//     .then((trips) => res.json(trips))
//     .catch((err) => next(err));
// });

// router.get("/trips/:tripId", (req, res, next) => {
//   const tripId = Number(req.params.tripId);
//   return getTripById(tripId)
//     .then((trip) => res.json(trip))
//     .catch((err) => next(err));
// });

// router.post("/trips", upload.single("photo"), async (req, res, next) => {
//     const { user_id, name, start_date, end_date } = req.body;
//     try {
//       const trip = await createTrip({
//         user_id,
//         name,
//         start_date,
//         end_date,
//         photo_url: req.file 
//       });
//       const { user_name, ...rest } = trip;
//       res.json({ ...rest, user_name });
//     } catch (error) {
//       next(error);
//     }
//   });

// router.put("/trips/:tripId", (req, res, next) => {
//   const tripId = Number(req.params.tripId);
//   const { name, start_date, end_date, photo_url } = req.body;
//   const tripUpdates = { name, start_date, end_date, photo_url };
//   return updateTripById(tripId, tripUpdates)
//     .then((trip) => res.json(trip))
//     .catch((err) => next(err));
// });

// router.delete("/trips/:tripId", (req, res, next) => {
//   const tripId = Number(req.params.tripId);
//   return deleteTripById(tripId)
//     .then(() => res.json({ message: "Trip deleted successfully" }))
//     .catch((err) => next(err));
// });

// module.exports = router;
