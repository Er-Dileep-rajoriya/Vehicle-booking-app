import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSteps,
  setVehicleTypeInPreference,
  setVehicleTypes,
} from "../redux/reducer.js";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Step_3() {
  const dispatch = useDispatch();
  const { steps, userPreference, vehicleTypes } = useSelector(
    (store) => store.reducer
  );

  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehiclesByWheels = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/vehicle-types?wheels=${userPreference.numberOfWheel}`
        );
        if (res?.data?.success) {
          dispatch(setVehicleTypes(res.data.vehicleTypes));
        }
      } catch (err) {
        console.error("Error fetching vehicle types:", err);
        setError("Failed to fetch vehicle types. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehiclesByWheels();
  }, [userPreference.numberOfWheel, dispatch]);

  const handleTypesChange = (e) => {
    setSelectedVehicleType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVehicleType) {
      dispatch(setSteps(4));
      dispatch(setVehicleTypeInPreference(selectedVehicleType));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Step {steps}: Type of vehicle
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white font-medium mb-2">
              Vehicle Type
            </label>
            <select
              value={selectedVehicleType}
              onChange={handleTypesChange}
              className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={loading}
            >
              <option value="" disabled>
                {loading ? "Loading..." : "Select Vehicle Type"}
              </option>
              {vehicleTypes?.map((type, index) => (
                <option key={index} value={type.name} className="bg-blue-300">
                  {type.name}
                </option>
              ))}
            </select>
            {error && (
              <small className="text-red-400 font-bold block text-center mt-2">
                {error}
              </small>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-white/20 text-white py-2 rounded-lg font-medium hover:bg-white/30 transition duration-300 border border-white/40 backdrop-blur-lg"
            disabled={!selectedVehicleType || loading}
          >
            {loading ? "Loading..." : "Next →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Step_3;
