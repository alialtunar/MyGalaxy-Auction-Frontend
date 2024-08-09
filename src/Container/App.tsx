import React, { useEffect } from 'react';
import './App.css';
import { VehicleList } from '../Pages/Vehicles';

import { Header } from '../Layout';
import { Route, Routes } from 'react-router-dom';
import VehiceDetail from '../Pages/Vehicles/VehiceDetail';
import Register from '../Pages/Account/Register';
import Login from '../Pages/Account/Login';
import { useDispatch } from 'react-redux';
import userModel from '../interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import { setLoggedInUser } from '../Storage/Redux/authenticationSlice';
import BidCheckout from '../Pages/Bid/BidCheckout';
import Payment from '../Pages/Payment/Payment';

function App() {
const Dispatch = useDispatch();
useEffect(()=>{
const token = localStorage.getItem('token');
if(token){
  const {nameid,email,role,fullName}:userModel = jwtDecode(token);
  Dispatch(setLoggedInUser({
   nameid,email,role,fullName
  }))
}
},)

  return (
    <div className="App">
      <Header/>
     <div className='pb-5'>
      <Routes>
        <Route path='/' element={<VehicleList></VehicleList>}></Route>
        <Route path='Vehicle/VehicleId/:vehicleId' element={<VehiceDetail></VehiceDetail>}></Route>
        <Route path='Register' element={<Register></Register>}></Route>
        <Route path='Login' element={<Login></Login>}></Route>
        <Route path="Vehicle/BidCheckout/:vehicleId" element={<BidCheckout></BidCheckout>}></Route>
        <Route path='Payment' element={<Payment></Payment>}></Route>
      </Routes>
     </div>
    </div>
  );
}

export default App;
