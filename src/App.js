import React,{useState} from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm";

  const stripe = loadStripe(
    "pk_test_51Mazo6SF1aAlqLpth6vxbpGsbCBMg97wMcOKQOomGj81j9FYB7GJjglcPwG7eV1VzZnbVjLXFQEQXkqwDXtfgunn00enyecd1T"
  );

const App = () => { 

  const [clientSecret, setclientsecret] = useState("")
  
  const getdata = async () => {
    const response = await axios.post("http://localhost:5000/create-payment");
     setclientsecret(response.data.clientSecret)
  };

const options = {
  clientSecret,
  appearance:{
     theme:"stripe"
  }
} 

  return (
    <div>
      <h1>Data</h1>
      <button onClick={getdata}>Click</button>
      {
        clientSecret && (
          <Elements options={options} stripe={stripe}>
            <CheckoutForm Secretkey={clientSecret}/>
          </Elements>
        )
        
      }
    </div>
  );
};

export default App;
