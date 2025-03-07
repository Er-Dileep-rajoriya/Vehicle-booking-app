import express from "express";
import createBooking from "../controllers/booking.controller.js";
import {
  getVehicleTypesByWheels,
  getVehiclesByVehicleType,
} from "../controllers/vehicle.controller.js";

const appRouter = express.Router();

appRouter.post("/bookings", createBooking);

// Get all vehicles type
// /vehicles-types?wheels=2
appRouter.get("/vehicle-types", getVehicleTypesByWheels);

// GET /api/vehicles?type=SUV
appRouter.get("/vehicles", getVehiclesByVehicleType);

export default appRouter;
