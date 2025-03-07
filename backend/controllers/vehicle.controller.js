import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Fetch vehicle types based on the selected number of wheels (e.g., 2 or 4)
export const getVehicleTypesByWheels = async (req, res) => {
  try {
    const { wheels } = req.query;

    // Validate the input
    if (!wheels || (wheels !== "2" && wheels !== "4")) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing wheels parameter",
      });
    }

    // Fetch vehicle types based on the selected number of wheels
    const vehicleTypes = await prisma.vehicleType.findMany({
      where: { wheels: parseInt(wheels) },
    });

    res.json({
      success: true,
      vehicleTypes,
    });
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch vehicle types" });
  }
};

export const getVehiclesByVehicleType = async (req, res) => {
  // Accepts vehicle type name (e.g., "SUV", "Hatchback")
  const { type } = req.query;

  if (!type) {
    return res
      .status(400)
      .json({ success: false, message: "Vehicle type is required" });
  }

  try {
    // Find the vehicle type by name
    const vehicleType = await prisma.vehicleType.findUnique({
      where: { name: type },
      select: { id: true },
    });

    if (!vehicleType) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle type not found" });
    }

    // Fetch vehicles based on vehicleTypeId
    const vehicles = await prisma.vehicle.findMany({
      where: { vehicleTypeId: vehicleType.id },
    });

    res.json({
      success: true,
      vehicles,
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch vehicles" });
  }
};
