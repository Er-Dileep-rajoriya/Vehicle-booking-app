import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createBooking = async (req, res) => {
  const { vehicleId, startDate, endDate } = req.body;

  // Input validation
  if (!vehicleId || !startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: vehicleId, startDate, or endDate.",
    });
  }

  // Validate date range
  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({
      success: false,
      message: "startDate must be before endDate.",
    });
  }

  try {
    console.log("Checking vehicle with ID:", vehicleId);

    const vehicleExists = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    console.log("Vehicle exists:", vehicleExists);

    if (!vehicleExists) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found." });
    }

    // Check for overlapping bookings
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        vehicleId,
        OR: [
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(startDate) },
          },
        ],
      },
    });

    if (conflictingBooking) {
      return res.status(400).json({
        success: false,
        message: "Vehicle is already booked for these dates.",
      });
    }

    // Create new booking
    const booking = await prisma.booking.create({
      data: {
        vehicleId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Booking successful!", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book vehicle",
      details: error.message,
    });
  }
};

export default createBooking;
