import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";

function SidebarChat({ id, name, addNewChat }) {
  // useEffect and useState to generate random string
  // to get random profile pic from the avatar API
  const [seedString, setSeedString] = useState("");

  useEffect(() => {
    setSeedString(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    // creating room for chat - can consider using modal instead of prompt
    const roomName = prompt("Please enter name for chat");

    const data = { name: roomName };

    fetch(`http://localhost:4000/api/v2/chats`, {
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

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/personas/${seedString}.svg`}
        />
        <div className="sidebarChat__info">
          <h2>Room name : {name}</h2>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
