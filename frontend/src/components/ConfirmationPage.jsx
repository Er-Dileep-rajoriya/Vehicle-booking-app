import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ConfirmationPage() {
  const { userPreference, bookingInfo, vehicles } = useSelector(
    (store) => store.reducer
  );
  const [vehicleName, setVehicleName] = useState("");

  useEffect(() => {
    console.log("Vehicles : ", vehicles);
    console.log(userPreference.vehicle);
    const vehicle = vehicles.find((v) => v.id == userPreference.vehicle.id);
    if (vehicle) setVehicleName(vehicle.name);
  }, []);

  const { startDate, endDate } = bookingInfo;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-white/20 text-white text-center transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold mb-6 animate-bounce">
          Booking Confirmed 🎉
        </h2>
        <p className="text-xl mb-6 font-light">
          Your vehicle has been successfully booked. Enjoy your ride! 🚗💨
        </p>

        <div className="bg-white/20 p-6 rounded-2xl border border-white/30 backdrop-blur-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
            Booking Details
          </h3>
          <div className="space-y-3 text-left">
            <p className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>
                {userPreference.firstName} {userPreference.lastName}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Wheels:</span>
              <span>{userPreference.numberOfWheel}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Vehicle Type:</span>
              <span>{userPreference.vehicleType}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Vehicle:</span>
              <span>{vehicleName}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Start Date:</span>
              <span>{startDate?.substring(0, 10)}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">End Date:</span>
              <span>{endDate?.substring(0, 10)}</span>
            </p>
          </div>
        </div>

        <p className="mt-6 text-lg font-light">
          Thank you for choosing us! Have a safe and enjoyable journey. 🌟
        </p>
      </div>
    </div>
  );
}

export default ConfirmationPage;
