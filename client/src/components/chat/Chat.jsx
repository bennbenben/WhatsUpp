import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useStateValue } from "../../StateProvider";
import { DateTime } from "luxon";

import "./Chat.css";

export default function Chat() {
  const [seedString, setSeedString] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      const fetchShowChatRoom = async () => {
        const res = await fetch(`http://localhost:4000/api/v2/chats/${roomId}`);
        const data = await res.json();
        setRoomName(data.name);
      };
      const fetchListMessages = async () => {
        const res = await fetch(
          `http://localhost:4000/api/v2/chats/${roomId}/message`
        );
        const data = await res.json();
        setMessages(data);
      };

      fetchShowChatRoom();
      fetchListMessages();
    }
  }, [roomId]);

  useEffect(() => {
    setSeedString(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const displayMessages = messages?.map((message) => (
    <p className={`chat__message ${message.name == user.name && "chat__receiver"}`}>
      <span className="chat__name">{message.name}</span>
      {message.message}
      <span className="chat__timestamp">{message.timestamp}</span>
    </p>
  ));

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("message sent", input);
    setInput("");
    let data = {
      chatId: roomId,
      name: user.name,
      message: input,
      timestamp: DateTime.now().toUnixInteger(),
    }

    fetch(`http://localhost:4000/api/v2/chats/${roomId}/message`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/personas/${seedString}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName || "Room name"}</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {displayMessages}
        <p className={`chat__message ${false && "chat__receiver"}`}>
          <span className="chat__name">Tan, Gina</span>
          Hey Guys
          <span className="chat__timestamp">5.53pm</span>
        </p>
        <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name">Bobo Tan</span>
          This is message with p tag and class chat__message
          <span className="chat__timestamp">6.01pm</span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          {/* May need to change to useRef, otherwise input state keep changing, heavy on database? */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
