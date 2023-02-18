const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Mazo6SF1aAlqLptvObExFsBWJlfiXfDtD76z5tjNfAIVZCGKeWCQmXd3azJraAhoMOsAbFwC4brjceh0oylYmha00uD8P9PO1"
);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is working ");
});

app.post("/create-payment",async(req,res)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount:100*100,
        currency:"inr",
        description:"Test Custom Payment"
    })
   res.json({clientSecret:paymentIntent.client_secret});
})

app.listen(5000, (req, res) => {
  console.log("Server is up and running ");
});
