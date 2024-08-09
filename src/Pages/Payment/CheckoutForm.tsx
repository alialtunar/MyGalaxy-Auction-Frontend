import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Storage/store';
import { useCreatePaymentHistoryMutation } from '../../api/paymentHistory';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [createPaymentHistory] = useCreatePaymentHistoryMutation();
    const vehicleId:string = useSelector((state:RootState) => state.vehicleStore.vehicleId);
    const orderStore = useSelector((state:RootState) => state.orderStore);
    const [isProcessing,setIsProcessing] = useState(false);
  
    const handleSubmit = async (event:React.ChangeEvent<HTMLFormElement>) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      setIsProcessing(true);
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect:"if_required"
      });
  
      if (result.error) {
      
        setIsProcessing(false);
      } 

      if(result.paymentIntent?.status ==="succeeded"){
        console.log(orderStore,"orderstore");
        const response = createPaymentHistory({
         clientSecret:orderStore.clientSecret,
         stripePaymentIntentId:orderStore.StripePaymentIntentId,
         userId:orderStore.userId,
         vehicleId:orderStore.vehicleId

        })

          navigate(`/Vehicle/VehicleId/${vehicleId}`)
      }
      setIsProcessing(false);

    };
  
    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div className='text-center mt-2'>
        <button disabled={!stripe || isProcessing} type='submit' className='btn btn-primary'> {
                isProcessing ? "Processing ...." : "Submit Pay"
             }</button>
            
        </div>
      </form>
    )
}

export default CheckoutForm
