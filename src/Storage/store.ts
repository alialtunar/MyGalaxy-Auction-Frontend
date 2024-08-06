import { configureStore } from "@reduxjs/toolkit";
import { vehicleReducer } from "./Redux/VehicleSlice";
import vehicleApi from "../api/vehicleApi";
import { accountApi } from "../api/accountApi";
import { authenticationReducer } from "./Redux/authenticationSlice";



const store = configureStore({
    reducer:{
        vehicleStore : vehicleReducer,
        authenticationStore:authenticationReducer,

        
        [vehicleApi.reducerPath]:vehicleApi.reducer,
        [accountApi.reducerPath]:accountApi.reducer
    },middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(vehicleApi.middleware,accountApi.middleware)
})



export type RootState = ReturnType<typeof store.getState>;
export default store;