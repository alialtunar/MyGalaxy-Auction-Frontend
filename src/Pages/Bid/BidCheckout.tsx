import React, { useState } from 'react'
import "./Styles/BidCheckout.css"
import { useNavigate, useParams } from 'react-router-dom'
import { useGetVehiclesByIdQuery } from '../../api/vehicleApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Storage/store';
import userModel from '../../interfaces/userModel';
import { useDoPaymentMutation } from '../../api/paymentApi';
import { Loader } from '../../Helper';
import { apiResponse } from '../../interfaces/apiResponse';
import { UseDispatch } from 'react-redux';
import { getOrderInfo } from '../../Storage/Redux/orderSlice';
import { getVehicle } from '../../Storage/Redux/VehicleSlice';


function BidCheckout() {
    const {vehicleId} = useParams();
    const {data,isLoading} = useGetVehiclesByIdQuery(vehicleId);
    const navigate = useNavigate();
    const Dispatch = useDispatch();
    const userStore:userModel = useSelector((state:RootState) => state.authenticationStore);
    const [loading,setLoadingState] = useState<boolean>(); 
    const [initialPayment] = useDoPaymentMutation();


    const initialState = {
      name:userStore.fullName,
      email:userStore.email,
      phoneNumber:"",
    }
    


    const [phone,setPhoneState] = useState(initialState.phoneNumber);
    const [name,setNameState] = useState(initialState.name);
    const [email,setEmailState] = useState(initialState.email);


   const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setLoadingState(true);
   
    const {data} :apiResponse = await initialPayment({
      userId:userStore.nameid,vehicleId:vehicleId
    })
    
    if(data){
      console.log(data,"data");
      Dispatch(getOrderInfo({
        vehicleId:data?.result.vehicleId,
        userId:data?.result.userId,
        clientSecret:data?.result.clientSecret,
        StripePaymentIntentId:data?.result.stripePaymentIntentId,
      }))
    }

    

     Dispatch(getVehicle(vehicleId));
     navigate("/payment",{
      state:{apiresult:data?.result,userStore}
     });

    setLoadingState(false);
   }

  if(data) {
    return (
      <div className='container'>
        <div className="card text-center">
          <form onSubmit={handleSubmit}>
            <img src={data?.result?.image} className='card-image' alt="" />
            <div className="card-content text-center">
              <h3 className='card-title'>{data?.result?.brandAndModel}</h3>
              <div className="card-text"><span className='text-black'>
                ${data?.result?.auctionPrice}
                </span></div>
                <div className="container">
                  <div className="form-group mt-3">
                    <span className='text-black'><strong>
                      Name
                      </strong></span>
                      <input onChange={(e) => setNameState(e.target.value)} defaultValue={name} className='form-control' placeholder='Default' type="text" />
                      
                  </div>
                  <div className="form-group mt-3">
                    <span className='text-black'><strong>
                      Email
                      </strong></span>
                      <input onChange={(e) => setEmailState(e.target.value)} defaultValue={email}  className='form-control' placeholder='Default' type="text" />
                      
                  </div>
                  <div className="form-group mt-3">
                    <span className='text-black'><strong>
                      Phone Number
                      </strong></span>
                      <input onChange={(e) => setPhoneState(e.target.value)} defaultValue={phone}  className='form-control' placeholder='Default' type="text" />
                      
                  </div>
                  <div className="card-footer">
                    <button className='btn btn-lg btn-success mt-3' type='submit'>
                   {loading ? (<Loader></Loader>) : "Pay Auction Price" } 
                    </button>
                  </div>
                </div>
            </div>
          </form>
        </div>
        
      </div>
    )
  }
else{
    return (<Loader></Loader>)
  }


}

export default BidCheckout
