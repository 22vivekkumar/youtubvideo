const nodemailer= require('nodemailer');
const otpStorage=new Map();//In-memory storage for OTPs(use a perstage in production)
function generateOtp()
{
    return Math.floor(100000+Math.random()*900000).toString();
}
function sendOtp(email)
{
    const otp=generateOtp();
    otpStorage.set(email,otp);
    const transporter=nodemailer.createTransport({
        srevice: 'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });
    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:'Your OTP Code',
        text:'Your OTP code is ${otp}'
    };
    return transporter.sendMail(mailOptions);
}
function verifyOtp(email,otp)
{
    const storedOtp=otpStorage.get(email);
    if (storedOtp===otp) 
    {
        otpStorage.delete(email);
        return true;   
    }
    return false;
}
module.exports={sendOtp,verifyOtp};