import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName, setSteps } from "../redux/reducer.js";

const Step_1 = () => {
  const { steps } = useSelector((store) => store.reducer);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState({
    fnameError: "",
    lnameError: "",
  });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   setError({ ...error, [`${e.target.name}Error`]: "" });
  // };

  const handleSubmitStep_1 = (e) => {
    e.preventDefault();

    let errors = {};

    if (!formData.firstName.trim() || formData.firstName.length <= 2) {
      errors.fnameError =
        "First Name is required and must be at least 3 characters.";
    }

    if (!formData.lastName.trim() || formData.lastName.length <= 2) {
      errors.lnameError =
        "Last Name is required and must be at least 3 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    dispatch(setName(formData));
    dispatch(setSteps(2));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Step {steps}: Personal Details
        </h2>
        <form onSubmit={handleSubmitStep_1} className="space-y-5">
          <div>
            <label
              htmlFor="fname"
              className="block text-white font-medium mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="fname"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                setError({ ...error, fnameError: "" });
              }}
              className={`outline-none w-full px-4 py-2 bg-white/20 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/60 placeholder-white/70 ${
                error.fnameError ? "border-red-500" : "border-white/30"
              }`}
              placeholder="Enter your first name"
            />
            {error.fnameError && (
              <small className="text-red-400 font-bold">
                {error.fnameError}
              </small>
            )}
          </div>
          <div>
            <label
              htmlFor="lname"
              className="block text-white font-medium mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lname"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                setError({ ...error, lnameError: "" });
              }}
              className={`outline-none w-full px-4 py-2 bg-white/20 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/60 placeholder-white/70 ${
                error.lnameError ? "border-red-500" : "border-white/30"
              }`}
              placeholder="Enter your last name"
            />
            {error.lnameError && (
              <small className="text-red-400 font-bold">
                {error.lnameError}
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
};

export default Step_1;
