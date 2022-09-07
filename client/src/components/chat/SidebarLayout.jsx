// Import libraries
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

// Import internal components
import "./SidebarLayout.css";
import SidebarChat from "./SidebarChat";
import { Store } from "../../data/Store";
import { setLoadingFalse, setLoadingTrue } from "../../data/Actions";

const SidebarLayout = () => {
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
        },
      };
      const response = await axios.get("http://localhost:4000/api/v1/chat", axiosConfig);
      console.log(`response.data: ${JSON.stringify(response.data)}`);

      // From API response data, map it into array and set into the chatrooms state
      setChatrooms(
        response.data.map((room) => {
          return {
            chatroomId: room._id,
            name: room.chatroom_name,
            avatar: room.avatar,
          };
        })
      );
    };

    fetchChatrooms();
    dispatch(setLoadingFalse());
  }, []);
  

  return (
    <>
      <div className="sidebar__main">
        <div className="sidebar__header">
          <Avatar src={currentUser ? currentUser.avatar : null } />
          <div className="sidebar__headerRight">
            <IconButton><DonutLargeIcon /></IconButton>
            <IconButton><ChatIcon /></IconButton>
            <IconButton><MoreVertIcon /></IconButton>
          </div>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>

      <div className="sidebar__chats">

      </div>
      <Outlet />
    </>
  );
};

export default SidebarLayout;
