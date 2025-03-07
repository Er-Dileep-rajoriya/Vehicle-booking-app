import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSteps, setBookingInfo } from "../redux/reducer.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Step_5() {
  const { steps, userPreference } = useSelector((store) => store.reducer);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Please select a valid date range.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const bookingInfo = {
        vehicleId: parseInt(userPreference.vehicle.id),
        startDate,
        endDate,
      };

      const res = await axios.post(`${BACKEND_URL}/api/bookings`, bookingInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res?.data?.success) {
        dispatch(setBookingInfo(res.data.booking));
        dispatch(setSteps(6));
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError(
        err.response?.data?.message || "Failed to book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Step {steps}: Select Date Range
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col justify-center items-center">
            <label className="block text-white font-medium mb-2">
              Select Booking Date Range
            </label>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
                setError("");
              }}
              minDate={new Date()}
              className="w-full px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholderText="Select a date range"
            />
            {error && (
              <small className="text-red-400 font-bold block text-center mt-2">
                {error}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white/20 text-white py-2 rounded-lg font-medium hover:bg-white/30 transition duration-300 border border-white/40 backdrop-blur-lg"
            disabled={!startDate || !endDate || loading}
          >
            {loading ? "Booking..." : "Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Step_5;
