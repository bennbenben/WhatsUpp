import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";

function SidebarChat( {addNewChat} ) {

    // useEffect and useState to generate random string
    // to get random profile pic from the avatar API
    const [seedString, setSeedString] = useState('')

    useEffect(() => {
        setSeedString(Math.floor(Math.random()*5000))
    }, [])

    const createChat = () => {
        // creating room for chat - can consider using modal instead of prompt
        const roomName = prompt("Please enter name for chat");

        if (roomName) {
            // do some database stuff here...
        }
    }

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/personas/${seedString}.svg`} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
        <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
