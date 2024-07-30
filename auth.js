const express =require('express');
const {sendOtp,verifyOtp}=require('../otpService');
const router =express.Router();
router.post('/send-otp',(req,res)=>
{
    const {email}=req.body;
    sendOtp(email)
    .then(()=>res.json({sucess:true}))
    .catch(error=>{
        console.error('Error sending OTP:',error);
        res.status(500).json({sucess:false, message:'Failed to send OTP'});
    });
});
router.post('/verify',(req,res)=>{
    const {email,otp}=req.body;
    if (verifyOtp(email,otp)) 
    {
        res.json({sucess:true});   
    }
});