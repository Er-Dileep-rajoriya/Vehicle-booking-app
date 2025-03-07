import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.vehicleType.createMany({
    data: [
      { name: "Hatchback", wheels: 4 },
      { name: "SUV", wheels: 4 },
      { name: "Sedan", wheels: 4 },
      { name: "Sports Bike", wheels: 2 },
      { name: "Cruiser Bike", wheels: 2 },
    ],
  });

  console.log("✅ Seeded Vehicle Types");

  const vehicleTypes = await prisma.vehicleType.findMany();
  const typeMap = Object.fromEntries(
    vehicleTypes.map((vt) => [vt.name, vt.id])
  );

  // Seed Vehicles
  await prisma.vehicle.createMany({
    data: [
      { name: "Toyota Yaris", vehicleTypeId: typeMap["Hatchback"] },
      { name: "Ford Focus", vehicleTypeId: typeMap["Hatchback"] },
      { name: "Volkswagen Golf", vehicleTypeId: typeMap["Hatchback"] },

      { name: "Toyota RAV4", vehicleTypeId: typeMap["SUV"] },
      { name: "Honda CR-V", vehicleTypeId: typeMap["SUV"] },
      { name: "Ford Explorer", vehicleTypeId: typeMap["SUV"] },

      { name: "Toyota Camry", vehicleTypeId: typeMap["Sedan"] },
      { name: "Honda Accord", vehicleTypeId: typeMap["Sedan"] },
      { name: "BMW 3 Series", vehicleTypeId: typeMap["Sedan"] },

      { name: "Yamaha YZF-R1", vehicleTypeId: typeMap["Sports Bike"] },
      { name: "Kawasaki Ninja ZX-10R", vehicleTypeId: typeMap["Sports Bike"] },
      { name: "Ducati Panigale V4", vehicleTypeId: typeMap["Sports Bike"] },
    ],
  });

  console.log("✅ Seeded Vehicles");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
