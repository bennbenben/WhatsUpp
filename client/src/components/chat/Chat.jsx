// Import libraries
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";

// Import internal components
import { Store } from "../../data/Store";
import "./Chat.css";

const Chat = ({ chatroomId, currentSocket }) => {
  const [seedString, setSeedString] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [globalState, dispatch] = useContext(Store);
  const { currentUser } = globalState;

  useEffect(() => {

    // fetch chatroom details: the chatroom_name
    const fetchShowChatRoom = async () => {
      if (chatroomId) {
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        };
        const response = await axios.get(`http://localhost:4000/api/v1/chat/${chatroomId}`, axiosConfig);
        console.log("fetchShowChatRoom response is: ", response);
        setRoomName(response.data.chatroom.chatroom_name);
      }
    };

    // fetch the messages
    const fetchListMessages = async () => {
      if (chatroomId) {
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        };
        const response = await axios.get(`http://localhost:4000/api/v1/chat/${chatroomId}/message`, axiosConfig);
        console.log("fetchListMessages response is: ", response);
        setMessages(response.data.messages);
      }
      currentSocket.emit("join chat", chatroomId);
    };

    fetchShowChatRoom();
    fetchListMessages();

    return () => {
      currentSocket.emit("leave chat", chatroomId);
      console.log(`chatroomId: ${chatroomId}`);
    }

  }, [chatroomId]);

  useEffect(() => {
    // real-time fetch messages
    currentSocket.on("message received", (newMessageReceived) => {
      // console.log(`[FE] JSON.stringify=>newMessageReceived: ${JSON.stringify(newMessageReceived)}`);
      // console.log(`messages before setMessages: ${JSON.stringify(messages)}`);
      setMessages(prevMsgs => {
        return [...prevMsgs, newMessageReceived]
      });
      // console.log(`messages after setMessages: ${JSON.stringify(messages)}`);
    });

  }, []);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    // Post request to DB
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    const messageData = {
      "chatId": chatroomId,
      "sender": {
        "userId": currentUser.userId,
        "username": currentUser.username,
      },
      "message": input,
    };
    
    const response = await axios.post(`http://localhost:4000/api/v1/chat/${chatroomId}/message`, messageData, axiosConfig);
    console.log("response is: ", response);
    
    setMessages([...messages, response.data.message]);
    currentSocket.emit("new message", response.data);
    
    setInput("");
  };

  useEffect(() => {
    setSeedString(Math.floor(Math.random() * 5000));
  }, [chatroomId]);

  const displayMessages = (messages.length!=0) ? 
  
  messages?.map((message) => (
    <p key={message._id} className={`chat__message ${message.sender.username == currentUser.username && "chat__receiver"}`}>
      <span className="chat__name">{message.sender.username}</span>
      {message.message}
      <span className="chat__timestamp">{message.timestamp}</span>
    </p>
  )) : 

  <>
    <p className={`chat__message ${false && "chat__receiver"}`}>
      <span className="chat__name">Tan, Gina</span>
      Hey Guys
      <span className="chat__timestamp">5.53pm</span>
    </p>
    <p className={`chat__message ${true && "chat__receiver"}`}>
      <span className="chat__name">Bobo Tan</span>
      This is a sample message
      <span className="chat__timestamp">6.01pm</span>
    </p>
  </>;

  return (
    <div className="chat">

      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/personas/${seedString}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName || "Room name"}</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton><SearchOutlined /></IconButton>
          <IconButton><AttachFile /></IconButton>
          <IconButton><MoreVert /></IconButton>
        </div>
      </div>

      <div className="chat__body">
        {displayMessages}
        
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />

        <form>
          {/* May need to change to useRef, otherwise input state keep changing, heavy on database? */}
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message..." />
          <button type="submit" onClick={sendMessageHandler}>Send a message</button>
        </form>

        <MicIcon />

      </div>

    </div>
  );
}

export default Chat;