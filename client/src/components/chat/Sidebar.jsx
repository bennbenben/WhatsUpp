import React from "react";
import SidebarChat from "./SidebarChat";
import { useEffect, useState } from "react";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "./Sidebar.css";
import { useStateValue } from "../../StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    // list all the chats in DB
    const fetchAPI = async () => {
      const res = await fetch("http://localhost:4000/api/v2/chats");
      const data = await res.json();
      // setRooms(data)
      setRooms(
        data.map((room) => {
          return {
            id: room._id,
            name: room.name,
          };
        })
      );
    };
    fetchAPI();
  }, []);

  const displayRooms = rooms.map((room) => (
    <SidebarChat key={room.id} id={room.id} name={room.name} />
  ));

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {displayRooms}
      </div>
    </div>
  );
}

export default Sidebar;
