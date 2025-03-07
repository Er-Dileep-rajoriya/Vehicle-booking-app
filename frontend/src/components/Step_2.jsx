import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNumberOfWheel, setSteps } from "../redux/reducer.js";

function Step_2() {
  const { steps } = useSelector((store) => store.reducer);
  const dispatch = useDispatch();

  const [selectedWheels, setSelectedWheels] = useState("2");
  const [error, setError] = useState("");

  const handleWheelChange = (e) => {
    setSelectedWheels(e.target.value);
    setError("");
  };

  const handleSubmitStep_2 = (e) => {
    e.preventDefault();

    if (!selectedWheels) {
      setError("Please select a wheel option.");
      return;
    }

    dispatch(setNumberOfWheel(selectedWheels));
    dispatch(setSteps(3));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Step {steps}: Select Wheel Option
        </h2>
        <form onSubmit={handleSubmitStep_2} className="space-y-5">
          <div>
            <div className="flex justify-center space-x-6">
              <label
                className={`flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg border transition duration-300 ${
                  selectedWheels === "2"
                    ? "bg-white/20 border-white/50"
                    : "border-white/30"
                }`}
              >
                <input
                  type="radio"
                  name="wheels"
                  value="2"
                  checked={selectedWheels === "2"}
                  onChange={handleWheelChange}
                  className="hidden"
                />
                <span className="text-white">2 Wheels</span>
              </label>
              <label
                className={`flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg border transition duration-300 ${
                  selectedWheels === "4"
                    ? "bg-white/20 border-white/50"
                    : "border-white/30"
                }`}
              >
                <input
                  type="radio"
                  name="wheels"
                  value="4"
                  checked={selectedWheels === "4"}
                  onChange={handleWheelChange}
                  className="hidden"
                />
                <span className="text-white">4 Wheels</span>
              </label>
            </div>
            {error && (
              <small className="text-red-400 font-bold block text-center mt-2">
                {error}
              </small>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-white/20 text-white py-2 rounded-lg font-medium hover:bg-white/30 transition duration-300 border border-white/40 backdrop-blur-lg"
          >
            Next →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Step_2;
