import { createSlice } from "@reduxjs/toolkit";
import userModel from "../../interfaces/userModel";

export const InitialState:userModel ={
    nameid:"",
    fullName:"",
    email:"",
    role:"",
}

export const authenticationSlice = createSlice({
    name:"authentication",
    initialState:InitialState,
    reducers:{
        setLoggedInUser:(state,action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.role = action.payload.role;
            state.nameid = action.payload.nameid;

        }
    }
})

export const {setLoggedInUser} = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;