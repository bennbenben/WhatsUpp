// Import libraries
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
// Import internal components
import SidebarLayout from "./SidebarLayout";
import Chat from "./Chat";
import { Store } from "../../data/Store";
import Private from "../../common/Private";

const WhatsUpp = () => {
  const [globalState, dispatch] = useContext(Store);
  const { currentUser, chatroomId } = globalState;
  const [currentSocket, setCurrentSocket] = useState(false);

  useEffect(() => {
    let socket = io("/api/socket");
    console.log('currentUser is :', currentUser)
    socket.emit("setup", currentUser.userId);
    socket.on("connected", () => {
      console.log("connected socket event is received");
    });

    setCurrentSocket(socket);
    return () => { socket.disconnect(true) }
  }, [currentUser]);


  return (
    <>
      {currentSocket && <SidebarLayout currentSocket={currentSocket} />}
      {currentSocket && chatroomId && <Chat chatroomId={chatroomId} currentSocket={currentSocket} />}
      {/* <Private /> */}
    </>
  );
};

export default WhatsUpp;
