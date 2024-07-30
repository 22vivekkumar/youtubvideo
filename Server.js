const { Socket } = require('dgram');
const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const app=express();
const server=http.createServer(app);
const io=socketIo(server);
const PORT=process.env.PORT||3000;
const chatbotRoutes=require('./routes/chatbot');
const authRoutes=require('./routes/auth');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/api/chatbot',chatbotRoutes);
app.use('/api/auth',authRoutes);
app.use(express.static('public'));
const rooms={};
io.on('connection',(Socket)=>
{
    console.log('New client connected');
    Socket.on('createRoom',(roomName)=>
    {
        if (!rooms[roomName]) 
        {
            rooms[roomName]=[];   
        }
        Socket.join(roomName);
        rooms[roomName].push(Socket.id);
        console.log('Room ${roomName} created');
    });
    Socket.on('disconnect',()=>
    {
        for(const roomName in rooms)
            {
                rooms[roomName]=rooms[roomName].filter(id=> id!==Socket.id);
                if (rooms[roomName].length===0) 
                {
                    delete rooms[roomName];
                    console.log('Room ${roomName} delete');   
                }
            }
            console.log('client disconnected');
    });
});
server.listen(300,()=>
{
    console.log('Listening on port 3000');
});
app.listen(PORT,()=>
{
    console.log('Server is running on port ${PORT}');
});
require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
let comment=[];//For simplicity, storing comments in memory
let users=[{username:'alice'},{username:'bob'}];//Mock users
//Function to extract mentions from text
function extractMentions(text)
{
    const mentionRegex=/@(\w+)/g;
    const mentions=[];
    let match;
    while ((match=mentionRegex.exec(text))!==null) {
        mentions.push(match[1]);
    }
    return mentions;
}
//Function to notify mentioned users (mock implemention)
function notifyUsers(mentions){
    mentions.forEach(username=>{
        console.log('Notify user:${username}');
        //Implement actual notification logic here (e.g.,email,in-app notification)
    });
}
//Endpoint to submit a comment
app.post('/submit-comment',(req,res)=>{
    const {comment}=req.body;
    const mentions=extractMentions(comment);
    notifyUsers(mentions);
    customElements.push(comment);
    res.json({success:true,comment});
});
app.listen(PORT,()=>{
    console.log('Server is running on port ${PORT}');
});