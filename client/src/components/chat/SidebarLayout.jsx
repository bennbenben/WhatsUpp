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

const SidebarLayout = () => {
  const [globalState, dispatch] = useContext(Store);
  const { currentUser } = globalState;
  console.log("this is currentUser: ", currentUser)

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
