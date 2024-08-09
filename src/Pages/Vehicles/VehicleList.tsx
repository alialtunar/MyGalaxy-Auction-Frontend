import React, { useEffect, useState } from 'react'
import { useGetVehiclesQuery } from '../../api/vehicleApi';
import { vehicleModel } from '../../interfaces/vehicleModel';
import { Link } from 'react-router-dom';
import Circle from './Circle';
import "./Styles/VehicleList.css"
import Banner from './Banner';
import { SD_FilterTypes } from '../../interfaces/enums/SD_FilterTypes';

function VehicleList() {
  const {data,isLoading} = useGetVehiclesQuery(null);
  const [filterResponse,setFilterResponse] = useState<vehicleModel[]>([]);
  const [result,setResultState] = useState<vehicleModel[]>([]);
  const [vehicles,setVehicleState] = useState<vehicleModel[]>([]);

  const filterOptions : Array<SD_FilterTypes> = [
    SD_FilterTypes.NAME_A_Z,
    SD_FilterTypes.NAME_Z_A,
    SD_FilterTypes.PRICE_HIGH_LOW,
    SD_FilterTypes.PRICE_LOW_HIGH,
    SD_FilterTypes.RemoveFilter
    
  ]
  const handleFilterClick = (sortTypes:any) => {
   let forSortArray = [...result]
   if(filterOptions[sortTypes]=== SD_FilterTypes.PRICE_HIGH_LOW){
    forSortArray.sort((a,b) =>{return b.price - a.price})
   }

   if(filterOptions[sortTypes]=== SD_FilterTypes.PRICE_LOW_HIGH){
    forSortArray.sort((a,b) =>{return a.price - b.price})
   }
    
   if(filterOptions[sortTypes]=== SD_FilterTypes.NAME_A_Z){
    forSortArray.sort((a,b) => a.brandAndModel.toLowerCase().localeCompare(b.brandAndModel.toLowerCase()))
   }

   if(filterOptions[sortTypes]=== SD_FilterTypes.NAME_Z_A){
    forSortArray.sort((a,b) => b.brandAndModel.toLowerCase().localeCompare(a.brandAndModel.toLowerCase()))
   }

   localStorage.setItem("myFilter",JSON.stringify(forSortArray));

   if(filterOptions[sortTypes]=== SD_FilterTypes.RemoveFilter){
    localStorage.removeItem("myFilter");

   }

   setFilterResponse(forSortArray);

  }
  
 useEffect(()=>{
  if(data){
   setVehicleState(data.result);
    setResultState(data.result);
  }

 },[data])

 useEffect(()=>{
  const storedArray = JSON.parse(localStorage.getItem("myFilter")!);
  if(data && storedArray==null){

    setFilterResponse(data.result);
  }
  if(storedArray==null){
    setFilterResponse(storedArray);
  }
 },[vehicles,data])



  return (
    <div className='container'>
      <Banner></Banner>
      <div className='row'>
      <div className='dropdown mt-3' >
        <button className='btn btn-secondary dropdown-toggle' type='button' data-bs-toggle="dropdown" aria-expanded="false" >
          Filter
        </button>
      <ul className="dropdown-menu" >
          {
            filterOptions.map((filterTypes,index) => {
              return (
                <>
                <li><a className="dropdown-item" onClick={()=>handleFilterClick(index)}  > {filterTypes} </a></li>
                
                </>
              )
            })
          }
      </ul>
      </div>


    <>
      {filterResponse?.map((vehicle, index) => (
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
    <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
    </div>
  )
}

export default VehicleList
