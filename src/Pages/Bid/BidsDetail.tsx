import { useGetBidByVehicleIdQuery } from "../../api/bidApi"
import { Loader } from "../../Helper"
import "./Styles/bid.css"
import { useCheckStatusAuctionPriceMutation } from "../../api/paymentHistory"
import userModel from "../../interfaces/userModel";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/store";
import { checkStatus } from "../../interfaces/checkStatus";
import { useEffect, useState } from "react";
import CreateBid from "./CreateBid";
import { useGetVehiclesByIdQuery } from "../../api/vehicleApi";
import { useNavigate } from "react-router-dom";
import { bidModel } from "../../interfaces/bidModel";

function BidsDetail(props:{vehicleId:string}) {

    const {data,isLoading} = useGetBidByVehicleIdQuery(parseInt(props.vehicleId));
    const userStore:userModel = useSelector((state:RootState) => state.authenticationStore);
    const [checkStatusAuction] = useCheckStatusAuctionPriceMutation();
    const [result,setResultState] = useState(); 
    var model:any ={}
    const response_data = useGetVehiclesByIdQuery(parseInt(props.vehicleId));
    const navigate = useNavigate();


useEffect(()=>{

},[data])

useEffect(()=>{

    const checkModel : checkStatus = {
        userId:userStore.nameid!,
        vehicleId:parseInt(props.vehicleId)
    } 

checkStatusAuction(checkModel).then((response:any) =>{
  setResultState(response!.data?.isSuccess);
}).catch((error) =>{
    console.error(error);
})
    

},[props.vehicleId,userStore.nameid,checkStatusAuction,userStore])
   

const handleBidCheckout = (props:any) => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
    }
    navigate(`/Vehicle/BidCheckout/${props}`)
}
  


if(!data){
    return (
        <Loader></Loader>
    )
}

  return (
    <>
    {
        result ? (
            <div className="container mb-5"> <CreateBid vehicleId={parseInt(props.vehicleId)}></CreateBid></div>) : (
                <div className='container mb-5'  >
                <button className='btn btn-warning' type='button' onClick={()=>handleBidCheckout(props.vehicleId)} >Pay PreAuction Price ${response_data.currentData?.result.auctionPrice} </button>
            </div>
        )
    }
   
    <div className="bid-list">
    
        {
            data.result.slice().sort((a:bidModel,b:bidModel) =>b.bidAmount - a.bidAmount).map((bid:any,key:any) => {return (
                <div className="mt-4" key={key}>
                <div className="bid">
                <span className="bid-number">{key}</span>
                <span className="bid-date">{bid.bidDate}</span>
                <span className="bid-amount">{bid.bidAmount} $</span>
             
            </div>
               <br />
               </div>
            )})
        }
       
     
    </div>
    </>
  )
}

export default BidsDetail
