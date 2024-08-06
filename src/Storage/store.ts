import { configureStore } from "@reduxjs/toolkit";
import { vehicleReducer } from "./Redux/VehicleSlice";
import vehicleApi from "../api/vehicleApi";
import { accountApi } from "../api/accountApi";
import { authenticationReducer } from "./Redux/authenticationSlice";
import bidApi from "../api/bidApi";
import paymentHistoryApi from "../api/paymentHistory";



const store = configureStore({
    reducer:{
        vehicleStore : vehicleReducer,
        authenticationStore:authenticationReducer,

        
        [vehicleApi.reducerPath]:vehicleApi.reducer,
        [accountApi.reducerPath]:accountApi.reducer,
        [bidApi.reducerPath]:bidApi.reducer,
        [paymentHistoryApi.reducerPath]:paymentHistoryApi.reducer
    },middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(vehicleApi.middleware,accountApi.middleware,bidApi.middleware,paymentHistoryApi.middleware)
})



export type RootState = ReturnType<typeof store.getState>;
export default store;