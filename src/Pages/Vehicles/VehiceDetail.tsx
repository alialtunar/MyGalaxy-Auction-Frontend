import { useParams } from "react-router-dom"
import { useGetVehiclesByIdQuery } from "../../api/vehicleApi";
import { Loader } from "../../Helper";
import "./Styles/VehicleDetail.css"
import BidsDetail from "../Bid/BidsDetail";

function VehiceDetail() {
    const {vehicleId} = useParams();
  const {data,isLoading} = useGetVehiclesByIdQuery(vehicleId);
   var highBid = 0;
  const safeVehicleId = vehicleId || "";

  if(data){
   const valueResponse =  data.result.bids.slice().sort((a:any,b:any) => a - b);
   
   const higherBid = valueResponse[valueResponse.length-1]?.bidAmount
    highBid = higherBid;
  }

  if(!data){
    return ( <Loader></Loader>)
  
  }
  return (
    <>
    <div className="auction-item text-center">
<img className="container" src={data.result.image} alt="" />
<h2>Brand Model:{data.result.brandAndModel}</h2>
<p>Descrciption:{data.result.additionalInformation}</p>
<p>Current Bid:{highBid}</p>
    </div>
    <BidsDetail vehicleId={safeVehicleId}></BidsDetail>
    </>
  )
}

export default VehiceDetail
