import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  steps: 1,
  userPreference: {
    firstName: "",
    lastName: "",
    numberOfWheel: 2,
    vehicleType: null,
    vehicle: null,
  },
  vehicleTypes: null,
  vehicles: null,
  bookingInfo: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // actions
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    setName: (state, action) => {
      const { firstName, lastName } = action.payload;
      state.userPreference = { ...state.userPreference, firstName, lastName };
      console.log(state.userPreference);
    },
    setNumberOfWheel: (state, action) => {
      state.userPreference = {
        ...state.userPreference,
        numberOfWheel: action.payload,
      };
      console.log(state.userPreference);
    },
    setVehicleTypes: (state, action) => {
      state.vehicleTypes = action.payload;
    },
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },

    setVehicleTypeInPreference: (state, action) => {
      state.userPreference = {
        ...state.userPreference,
        vehicleType: action.payload,
      };
    },
    setVehicleInPreference: (state, action) => {
      state.userPreference = {
        ...state.userPreference,
        vehicle: action.payload,
      };
    },

    setBookingInfo: (state, action) => {
      state.bookingInfo = action.payload;
    },
  },
});

export const {
  setSteps,
  setName,
  setNumberOfWheel,
  setVehicleTypes,
  setVehicles,
  setVehicleTypeInPreference,
  setVehicleInPreference,
  setBookingInfo,
} = appSlice.actions;
export const reducer = appSlice.reducer;
