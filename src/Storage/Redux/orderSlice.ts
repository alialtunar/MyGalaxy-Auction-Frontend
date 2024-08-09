import { createSlice } from "@reduxjs/toolkit";
import orderModel from "../../interfaces/orderModel";

const initialState : orderModel = {
    userId:"",
    vehicleId:0,
    StripePaymentIntentId:"",
    clientSecret:""
}

export const orderSlice = createSlice({
    name:"order",
       initialState:initialState,
       reducers:{
        getOrderInfo:(state,action) =>{
            state.userId = action.payload.userId;
            state.vehicleId = action.payload.vehicleId;
            state.StripePaymentIntentId = action.payload.StripePaymentIntentId;
            state.clientSecret = action.payload.clientSecret;
        }
       }
})


export const {getOrderInfo} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;