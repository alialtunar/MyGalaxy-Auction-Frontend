import React, { useEffect, useState } from 'react'
import { useGetVehiclesQuery } from '../../api/vehicleApi';
import { vehicleModel } from '../../interfaces/vehicleModel';
import { Link } from 'react-router-dom';
import Circle from './Circle';
import "./Styles/VehicleList.css"
import Banner from './Banner';

function VehicleList() {
  const {data,isLoading} = useGetVehiclesQuery(null);
  const [vehicles,setVehiclesState] = useState<vehicleModel[]>([]);
 
 useEffect(()=>{
  if(data){
    console.log(data);
    setVehiclesState(data.result);
  }

 },[data])
  return (
    <div className='container'>
      <Banner></Banner>
      <div className='row'>
    <>
      {vehicles.map((vehicle, index) => (
        <div className='col' key={index}>
          <div className='auction-card text-center'>
            <div className='card-image text-center'>
              <img src={vehicle.image} alt="" />
            </div>
            <div className="card-details text-center">
              <h2>{vehicle.brandAndModel}</h2>
              <p><strong>Year:</strong> {vehicle.manufacturingYear}</p>
              <p><strong>Color:</strong> {vehicle.color}</p>
              <p><strong>Current bid:</strong> ${vehicle.price}</p>
              <p><strong>End Time:</strong> ${vehicle.endTime}</p>
            </div>
            <div>
              <Link to={`Vehicle/VehicleId/${vehicle.vehicleId}`}>
              <button  className='btn btn-danger'>Detail</button>
              </Link>
            </div>
            <Circle vehicle={vehicle} />
          </div>
        </div>
      ))}
    </>
    </div>
    </div>
  )
}

export default VehicleList
