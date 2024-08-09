import React, { useState } from 'react'
import { useCreateBidMutation } from '../../api/bidApi'
import { bidModel } from '../../interfaces/bidModel';
import { useSelector } from 'react-redux';
import userModel from '../../interfaces/userModel';
import { RootState } from '../../Storage/store';

function CreateBid(props:{vehicleId:number}) {
  const [CreateBid] = useCreateBidMutation();
  const userStore:userModel = useSelector((state:RootState) => state.authenticationStore);
  const [bidAmount,setBidAmount] = useState("");

  const bidModel:bidModel = {
    bidAmount:parseInt(bidAmount),
    userId:userStore.nameid!,
    vehicleId:props.vehicleId
  }

  const handleCreateBid = () =>{
  CreateBid(bidModel).then((response) =>{
    console.log(response);
  });

  }
  return (
    <div className='container'>
      <form>
        <label htmlFor="bidAmount">Bid Amount</label>
        <input onChange={(e)=> setBidAmount(e.target.value)} type="number" className='form-control' id='bidAmount' name='bidAmount' />
        <div className='text-center mb-3'>
            <button type='button' onClick={() => handleCreateBid()}>Place Bid</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBid
