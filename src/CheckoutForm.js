import React,{useState,useEffect} from 'react'
import {PaymentElement,useElements,useStripe} from '@stripe/react-stripe-js'

const CheckoutForm = ({Secretkey}) => {
   
    const stripe =useStripe()
    const elements = useElements()

    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if(!stripe){
        return
      }
      if(!clientSecret){
        return
      }

      stripe.retrievePaymentIntent(clientSecret).then(({PaymentIntent})=>{
        switch(PaymentIntent.status){
            case "succeeded":
                setMessage("Payment Succeeded!")
                break;
             case "Processing":
                setMessage("Your payment is processing.")
                break;
            case "requires_payment_method":
                setMessage("Your payment was not successful, please try again.")
                break;   
            default:
                setMessage("Something went wrong")                 
            }   
      })
     
    }, [stripe,clientSecret])
    
    const handlesubmit = async (event)=>{
      event.preventDefault()
      if(!stripe || !elements){
        return
      }
 
      setIsLoading(true)


      const{response} = await stripe.confirmPayment({
        elements,
        confirmParams:{
          return_url:"http://localhost:5000"
        }
      })

     

      if(response.type === "card-error"  || response.type === "validation-error"){
        setMessage(response.message)
      }else{
        setMessage(" Unexpected error occured ")
      }
      setIsLoading(false)
    }
    
    
  return (
    <div id='paymentform'>
        <PaymentElement id='paymentelement'/>
        <button onClick={handlesubmit} type='submit'  disabled={isLoading  || !stripe  || !elements}>
          <span className='button-root'>
            {isLoading ? <div className='spinner' id='spinner'></div>: "Pay Now"}
          </span>
        </button>
        {message && <div id='paymentmessage'>{message}</div>}
    </div>
  )
}

export default CheckoutForm