import { useParams } from "react-router-dom"
import { useGetVehiclesByIdQuery } from "../../api/vehicleApi";
import { Loader } from "../../Helper";
import "./Styles/VehicleDetail.css"
import BidsDetail from "../Bid/BidsDetail";

function VehiceDetail() {
    const {vehicleId} = useParams();
  const {data,isLoading} = useGetVehiclesByIdQuery(vehicleId);
   
  const safeVehicleId = vehicleId || "";

  if(!data){
    return ( <Loader></Loader>)
  
  }
  return (
    <>
    <div className="auction-item text-center">
<img className="container" src={data.result.image} alt="" />
<h2>Brand Model:{data.result.brandAndModel}</h2>
<p>Descrciption:{data.result.additionalInformation}</p>
<p>Current Bid</p>
<p>Last Bider</p>
    </div>
    <BidsDetail vehicleId={safeVehicleId}></BidsDetail>
    </>
  )
}

export default VehiceDetail
