import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getVehicles } from "../Storage/Redux/VehicleSlice";


const vehicleApi = createApi({
    reducerPath:"vehicleApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:7241/api/Vehicle/"
    }),
endpoints:(builder) => ({
    getVehicles:builder.query({
        query:()=>({
            url:"GetVehicles"
        })
    }),
    getVehiclesById:builder.query({
        query:(id)=>({
            url:`${id}`,
            
        })
    }),
})
})

export const {useGetVehiclesQuery,useGetVehiclesByIdQuery} = vehicleApi;
export default vehicleApi;