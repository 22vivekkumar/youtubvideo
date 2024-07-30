const { response } = require("express");

document.addEventListener('DOMContentLoaded',()=>
{
    const requestCodeButton=document.getElementById('requestCodeButton');
    requestCodeButton.addEventListener('click',()=>
    {
        const questionId=/*logic to get the question ID*/
        fetch('/request-code',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({questionId}),
        })
        .then(response=>response.json())
        .then(data=>{
            if (data.success) {
                alert('Request sent successfully');
            }
            else{
                alert('Failed to sendrequest');
            }
        })
        .catch(error=>{
            console.error('Error:',error);
            alert('Error sending request');
        });
    });
}); 
const express=require('express');
const app=express();
app.use(express.json());
app.post('/request-cost',(req,res)=>
{
    const {questionId}=req.body;
    //Logic to send notification to the question poster
    sendNotificationToPoster(questionId)
    .then(()=>res.json({success:true}))
    .catch(error=>res.json({success:false,error}));
});
function sendNotificationToPoster(questionId)
{
    return new Promise((resolve,reject)=>
    {
        const questionPoster=/*Logic to get question poster info from questionId*/ getQuestionPoster(questionId);
        const message='A reviewer has requested you to provide the piece of code for question ID ${questionId}';
        sendEmail(questionPoster.email,'Code Request',message)
        .then(resolve)
        .catch(reject);
    });
}
function sendEmail(to,subject,body)
{
    return new Promise((resolve)=>
{
    console.log('Email send to ${to} with subject "${subject}" and body "${body}"');
    resolve();
});
}
app.listen(3000, ()=>
{
    console.log('Server is running on port 3000');
});
function sendNotificationToPoster(questionId)
{
    return new Promise((resolve,reject)=>
    {
        //Get the question poster's information from the database
        const questionPoster=/* logic to get question poster info from questionId */ getQuestionPoster(questionId);
        //Create a notification
        const notification=
        {
            userId:questionPoster.id,
            message:'A reviewer has requested you to provide the the piece of code for question ID ${questionId}',
            timestamp: new Date(),
        };
        //Save notification to the database or send it via your notification system
        saveNotification(notification)
        .then(resolve)
        .catch(reject);
    });
}
function saveNotification(notification)
{
    //Mock save notification function
    return new Promise((resolve)=>
    {
        console.log('Notification saved:',notification);
        resolve();
    });
}
document.addEventListener('DOMContentLoaded',()=>
{
    const chatBox=document.getElementById('chatBox');
    const messageInput=document.getElementById('messageInput');
    const sendMessageButton=document.getElementById('sendMessageButton');
    const otpInput=document.getElementById('otpInput');
    const verifyOtpButton=document.getElementById('verifyOtpButton');
    const otpContainer=document.getElementById('otpContainer');
    const chatContainer=document.getElementById('chatContainer');
    let isAuthenticated=false;
    sendMessageButton.addEventListener('click',()=>
    {
        const message=messageInput.value.trim();
        if (message && isAuthenticated) 
        {
            fetch('/api/chatbot',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({message}),
            }) 
            .then(response=>response.json())
            .then(data=>{
                appendMessage('User:${message}');
                appendMessage('Bot:${data.response}');
                messageInput.value=' ';
            })  
            .catch(error=>{
                console.error('Error:',error);
            });
        }
        else if (!isAuthenticated) 
        {
            alert('You need to authenticate first.');   
        }
    });
    verifyOtpButton.addEventListener('click',()=>
    {
        const otp=otpInput.value.trim();
        fetch('/api/auth/verify',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({otp}),
        })
        .then(response=>response.json())
        .then(data=>{
            if (data.success) 
            {
                isAuthenticated=true;
                otpContainer.style.display='none';
                chatContainer.style.display='flex';   
            }
            else
            {
                alert('Invalid OTP');
            }
        })
        .catch(error=>{
            console.error('Error:',error);
        });
    });
    function appendMessage(message)
    {
        const messageElement=document.createElement('div');
        messageElement.textContent=message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop=chatBox.scrollHeight;
    }
});
document.addEventListener('DOMContentLoaded',()=>
{
    const questionsContainer=document.getElementById('questions-container');
    //Sample data for questions 
    const questions=[
        "How to integration OTP authentication?",
        "What is the best way to learn JavaScript?",
        "How to style components in React?",
        "What are JavaScript closures?",
        "How to implement a linked list in Python?",
        "What is the difference between SQL and NoSQL database?",
        "How to optimize website perfomance?",
        "What are the new features in ES2021?",
        "How to handle async/await in JavaScript?",
        "What are RESTful APIs?",
    ];
    //Function to create an ad item element
    function createAdItem(text)
    {
        const div =document.createElement('div');
        div.className='ad-item';
        div.textContent=text;
        return div;
    }
    //Insert questions and ads into the container
    questions.forEach((question,index)=>
    {
        questionsContainer.appendChild(createQuestionItem(question));
        //Insert an ad after every 3 questions
        if ((index+1)%3===0 && ads.length>0) 
        {
            const adText=ads.shift();//GEt the next ad text
            questionsContainer.appendChild(createAdItem(adText));   
        }
    });
}) ;
document.addEventListener('DOMContentLoaded',()=>{
    const commentInput=document.getElementById('comment-input');
    const submitCommentButton=document.getElementById('submit-comment');
    const commentsContainer=document.getElementById('comments-container');
    submitCommentButton.addEventListener('click',()=>{
        const commentText=commentInput.value.trim();
        if (commentText) {
            fetch('/submit-comment',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'  
                },
                body:JSON.stringify({Comment:commentText})
            })
            .then(response=>response.json())
            .then(data=>{
                if (data.success) {
                    displayComment(data.comment);
                    commentInput.value='';
                }
                else{
                    alert('Failed to submit comment');
                }
            })
            .catch(error=>{
                console.error('Error:',error);
                alert('Error submittingncomment');
            });
        }
    });
    function displayComment(comment){
        const div=document.createElement('div');
        div.className='comment';
        div.innerHTML=highlightMentions(comment);
        commentsContainer.appendChild(div);
    }
    function highlightMentions(text)
    {
        const mentionRegex=/@(\w+)/g;
        return text.replace(mentionRegex,'<spanclass="mention">@$1</span>');
    }
});