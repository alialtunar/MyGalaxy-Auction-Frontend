import React from 'react';
import './App.css';
import { VehicleList } from '../Pages/Vehicles';
import VehicleBase from '../Pages/Vehicles/VehicleBase';
import { Header } from '../Layout';

function App() {
  return (
    <div className="App">
      <Header/>
     <VehicleBase></VehicleBase>
    </div>
  );
}

export default App;
