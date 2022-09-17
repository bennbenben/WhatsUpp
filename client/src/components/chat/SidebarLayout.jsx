// Import libraries
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

// Import internal components
import "./SidebarLayout.css";
import SidebarChat from "./SidebarChat";
import { Store } from "../../data/Store";
import { setLoadingFalse, setLoadingTrue } from "../../data/Actions";
import AddChatroom from "./AddChatroom";

const SidebarLayout = ({ currentSocket }) => {
  const [globalState, dispatch] = useContext(Store);
  const { currentUser } = globalState;
  console.log("this is currentUser: ", currentUser);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    dispatch(setLoadingTrue());

    // Make API call to fetch chatrooms
    const fetchChatrooms = async () => {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const data = { "userId": currentUser.userId };

      const response = await axios.post("http://localhost:4000/api/v1/chat/listchatroom", data, axiosConfig);

      console.log(`response.data: ${JSON.stringify(response.data)}`);

      if (response.data.chatrooms) {
        console.log(`responseData.chatrooms are available\nchatrooms are: ${response.data.chatrooms}`);
        
        // From API response data, map it into array and set into the chatrooms state
        const numOfChatrooms = response.data.chatrooms.length;
        let chatroomArray = [];

        for (let i = 0; i<numOfChatrooms; i++) {
          const { _id, chatroom_name, avatar } = response.data.chatrooms[i];
          const latest_message = response.data.latestMessage[i].lastMsg;
          console.log("latestmsg is :::::: ", latest_message)
          chatroomArray.push({
            "id": _id,
            "name": chatroom_name,
            "avatar": avatar,
            "latestMessage": latest_message,
          });
        };
        
        setChatrooms(chatroomArray);

      } else {
        console.log("responseData.chatrooms are not available");
      };
    };

    fetchChatrooms();
    dispatch(setLoadingFalse());
  }, []);

  console.log("chatroomsis:",chatrooms)
  
  const displayChatrooms = chatrooms.map((room) => (
    <SidebarChat key={room.id} id={room.id} name={room.name} lastMessage={room.latestMessage} />
  ));

  return (
    <>
      <div className="sidebar__main">
        <div className="sidebar__header">
          <Avatar src={currentUser ? currentUser.avatar : null } />
          <div className="sidebar__headerRight">
            <IconButton><DonutLargeIcon /></IconButton>
            <AddChatroom />
            <IconButton><MoreVertIcon /></IconButton>
          </div>
        </div>
      

        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlinedIcon />
            <input type="text" placeholder="Search or start a new chat" />
          </div>
        </div>

        <div className="sidebar__chats">
          {displayChatrooms}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default SidebarLayout;
