import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSteps,
  setVehicles,
  setVehicleInPreference,
} from "../redux/reducer.js";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Step_4() {
  const { steps, vehicles, userPreference } = useSelector(
    (store) => store.reducer
  );
  const dispatch = useDispatch();
  const [vehicleInfo, setVehicleInfo] = useState({
    name: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/vehicles?type=${userPreference?.vehicleType}`
        );
        if (res?.data?.success) {
          dispatch(setVehicles(res.data.vehicles));
        }
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to fetch vehicles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [userPreference?.vehicleType, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleInfo.id) {
      setError("Please select a vehicle.");
      return;
    }

    dispatch(setVehicleInPreference(vehicleInfo));
    dispatch(setSteps(5));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Step {steps}: Select Your Vehicle
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white font-medium mb-2">
              Select a Vehicle
            </label>
            <select
              onChange={(e) => {
                const selectedVehicle = vehicles.find(
                  (vehicle) => vehicle.id == e.target.value
                );
                setVehicleInfo({
                  id: e.target.value,
                  name: selectedVehicle?.name || "",
                });
                setError("");
              }}
              className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={loading}
            >
              <option value="" className="bg-blue-300">
                {loading ? "Loading..." : "Select Vehicle"}
              </option>
              {vehicles?.map((vehicle, index) => (
                <option key={index} value={vehicle.id} className="bg-blue-300">
                  {vehicle.name}
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
            disabled={!vehicleInfo.id || loading}
          >
            {loading ? "Loading..." : "Next →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Step_4;
