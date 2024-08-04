import { configureStore } from "@reduxjs/toolkit";
import { vehicleReducer } from "./Redux/VehicleSlice";
import vehicleApi from "../api/vehicleApi";



const store = configureStore({
    reducer:{
        vehicleStore : vehicleReducer,
        [vehicleApi.reducerPath]:vehicleApi.reducer
    },middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(vehicleApi.middleware)
})



export type RootState = ReturnType<typeof store.getState>;
export default store;