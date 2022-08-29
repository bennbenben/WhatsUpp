import React from "react";
import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';

import "./Chat.css";

export default function Chat() {
  const [seedString, setSeedString] = useState("");
  const [input, setInput] = useState("")

  useEffect(() => {
    setSeedString(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("message sent", input)
    setInput("")
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/personas/${seedString}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
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
          <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message..." />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
