import {createSlice} from '@reduxjs/toolkit';



const InitialState = {
    vehicles:[],
}

export const vehicleSlice = createSlice({
    name:"vehicle",
    initialState:InitialState,
    reducers:{
        getVehicles:(state,action) =>{
            state.vehicles = action.payload;
        },
    }
})


export const {getVehicles} = vehicleSlice.actions;
export const vehicleReducer = vehicleSlice.reducer;