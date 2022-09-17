// Import libraries
import { useEffect, useState, useContext } from "react";
import { Avatar } from "@mui/material";

// Import internal components
import "./SidebarChat.css";
import AddChatroom from "./AddChatroom";
import { Store } from "../../data/Store";
import { setChatroomId } from "../../data/Actions";

const SidebarChat = ({ id, name, lastMessage }) => {
  const [globalState, dispatch] = useContext(Store);
  const [seedString, setSeedString] = useState("");

  const handleChatroomId = (e) => {
    // dont need event default - only apply to onSubmit
    // get the chatroomId and set into Store
    dispatch(setChatroomId(id));
  };

  useEffect(() => {
    setSeedString(Math.floor(Math.random() * 5000));
  }, []);

  return (
      <div onClick={handleChatroomId} className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/personas/${seedString}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{lastMessage || "Click to start chatting"}</p>
        </div>
      </div>
    // </Link>
  );
};

export default SidebarChat;
