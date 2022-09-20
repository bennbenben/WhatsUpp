// Import libraries
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

// Import internal components
import "./SidebarLayout.css";
import SidebarChat from "./SidebarChat";
import { Store } from "../../data/Store";
import { setLoadingFalse, setLoadingTrue, userLogout } from "../../data/Actions";
import AddChatroom from "./AddChatroom";

const SidebarLayout = ({ currentSocket }) => {
  const [globalState, dispatch] = useContext(Store);
  const { currentUser, updateSenderChatroom } = globalState;
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
      const response = await axios.post("/api/v1/chat/listchatroom", data, axiosConfig);
      if (response.data.chatrooms) {
        // From API response data, map it into array and set into the chatrooms state
        const numOfChatrooms = response.data.chatrooms.length;
        let chatroomArray = [];

        for (let i = 0; i<numOfChatrooms; i++) {
          const { _id, chatroom_name, avatar } = response.data.chatrooms[i];
          let latest_message;
          if (!response.data.latestMessage[i]) {
            latest_message = null;
          } else {
            latest_message = response.data.latestMessage[i].lastMsg;
          };

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
  }, [updateSenderChatroom]);

  useEffect(() => {
    // real-time update chatrooms
    // console.log('SOCKET useEffect running')
    currentSocket.on("update latest message", (newMessageReceived) => {
      console.log("Update Latest Message signal received");
      // console.log("this is the initial state of chatrooms: ", chatrooms);
      const chatroomId = newMessageReceived.chatId;
      //cannot do forEach - temporary ,if wwe change here - it doesnt modify
      let updatedChatrooms = chatrooms.map((chatroomObject) => {
        if (chatroomObject.id == chatroomId) {
          chatroomObject.latestMessage = newMessageReceived.message;
        }
        return chatroomObject
      })
      setChatrooms(updatedChatrooms);
      // console.log("this is the after state of chatrooms: ", chatrooms);
    });
  });

  // console.log('chatroom messages',chatrooms)

  const logoutHandler = (e) => {
    e.preventDefault()
    console.log('user clicked logout!')

    let text = "Confirm Logout?"
    if (window.confirm(text) == true) {
     //dispatchContext
    dispatch(userLogout())

    //remove token from localstorage
    localStorage.removeItem("authToken")
    alert("Logout successful, redirecting to login")
    window.location.reload() 
    }
    
  }

  const displayChatrooms = chatrooms.map((room) => (
    <SidebarChat key={room.id} id={room.id} name={room.name} lastMessage={room.latestMessage} />
  ));

  return (
    <>
      <div className="sidebar__main">
        <div className="sidebar__header">
          <Avatar src={currentUser ? currentUser.avatar : null} />
          <div className="sidebar__headerRight">
            <AddChatroom />
            <IconButton onClick={logoutHandler}><LogoutIcon /></IconButton>
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
