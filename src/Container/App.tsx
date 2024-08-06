import React from 'react';
import './App.css';
import { VehicleList } from '../Pages/Vehicles';

import { Header } from '../Layout';
import { Route, Routes } from 'react-router-dom';
import VehiceDetail from '../Pages/Vehicles/VehiceDetail';
import Register from '../Pages/Account/Register';
import Login from '../Pages/Account/Login';

function App() {
  return (
    <div className="App">
      <Header/>
     <div className='pb-5'>
      <Routes>
        <Route path='/' element={<VehicleList></VehicleList>}></Route>
        <Route path='Vehicle/VehicleId/:vehicleId' element={<VehiceDetail></VehiceDetail>}></Route>
        <Route path='Register' element={<Register></Register>}></Route>
        <Route path='Login' element={<Login></Login>}></Route>
      </Routes>
     </div>
    </div>
  );
}

export default App;
