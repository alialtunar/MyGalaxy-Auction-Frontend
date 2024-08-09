import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const paymentApi = createApi({
    reducerPath:'PaymentApi',
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:7241/api/Payment/"
    }),
    endpoints:(builder)=>({
        doPayment:builder.mutation({
            query:({userId,vehicleId}) => ({
                 method:"POST",
                 url:"Pay",
                 params:{
                    userId,vehicleId
                 }
,
            })
        })
    })
})



export const {useDoPaymentMutation} = paymentApi;
export default paymentApi;