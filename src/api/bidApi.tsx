import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


 const bidApi = createApi({
    reducerPath:"bidApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:7241/api/Bid/"
    }),
    endpoints:(builder) =>({
        getBidByVehicleId:builder.query({
            query:(vehicleId:any) =>({
                method: "GET",
                url: `GetBidsByVehicle/${vehicleId}`,
                params: vehicleId
            })
        })
    })
})

export const {useGetBidByVehicleIdQuery} = bidApi
export default bidApi