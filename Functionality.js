document.addEventListener('DOMContentLoaded',()=>
{
    const socket=io();
    const roomContainer=document.getElementById('roomContainer');
    const chatContainer=document.getElementById('chatContainer');
    const chatBox=document.getElementById('chatBox');
    const roomNameInput=document.getElementById('roomNameInput');
    const createRoomButton=document.getElementById('createRoomButton');
    const messageInput=document.getElementById('messageInput');
    const sendMessageButton=document.getElementById('sendMessageButton');
    let currentRoom=null;
    createRoomButton.addEventListener('click',()=>
    {
        const roomName=roomNameInput.ariaValueMax.trim();
        if (roomName) 
        {
            socket.emit('createRoom',roomName);
            currentRoom=roomName;
            roomContainer.style.display='none';
            chatContainer.style.display='flex';   
        }
    });
    sendMessageButton.addEventListener('click',()=>
    {
        const message=messageInput.ariaValueMax.trim();
        if (message && currentRoom) 
        {
            socket.emit('sendMessage',{room:currentRoom,message});
            messageInput.value='';   
        }
    });
    socket.on('receiveMessage',(data)=>
    {
        const messageElement=document.createElement('div');
        messageElement.textContent=data.message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop=chatBox.scrollHeight;
    });
});