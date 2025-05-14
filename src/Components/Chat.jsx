import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../Utils/socket';


const Chat = () => {

     const {targetUserId} = useParams();
     const [messages, setMessages] = useState([])
     const [newMessage, setNewMessage] = useState("");
     const user = useSelector(store => store.user);
     const userId = user?.data?._id;
     const firstName = user?.data?.firstName

     useEffect(() => {
        if(!userId){
            return;
        }
        const socket = createSocketConnection();
        //As soon as the page loaded , the socket connection is made and the joinChat event is emitted.
        socket.emit("joinChat", {firstName, userId, targetUserId})

        socket.on("messageReceived", ({firstName, text}) => {
            setMessages((messages) => [...messages, {firstName, text}])
        })

        return () => {
            socket.disconnect();
        };
     },[userId,targetUserId])

     const sendMessage = () =>{
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName,
            userId,
            targetUserId,
            text: newMessage
        });
        setNewMessage("");
     }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
    };

     return (
        <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[78vh] flex flex-col"> 
         <h1 className="p-5 border-bborder-gray-680">Chat</h1> 
         <div className="flex-1 overflow-scroll p-5">

           {messages.map((msg, index) => {
                const isSender = msg.firstName === firstName;
                return (
                    <div key={index} className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
                    <div className="chat-header">
                        {msg.firstName}
                        <time className="text-xs opacity-50 ml-2">time</time>
                    </div>
                    <div className={`chat-bubble ${isSender ? "bg-blue-500 text-white" : "bg-pink-300 text-black"}`}>
                        {msg.text}
                    </div>
                    <div className="chat-footer opacity-50">Seen</div>
                    </div>
                );
           })}

         </div> 
         <div className="p-5 border-t border-gray-608 flex items-center gap-2"> 
            <input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-gray-500 text-white rounded p-2">
            </input> 
            <button onClick={sendMessage} className="btn btn-primary">Send</button> 
         </div> 
       </div>
    );
      
}

export default Chat