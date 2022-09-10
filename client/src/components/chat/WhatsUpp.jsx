// Import libraries
import { useContext } from "react";
// Import internal components
import SidebarLayout from "./SidebarLayout";
import Chat from "./Chat";
import { Store } from "../../data/Store";
import Private from "../../common/Private";

const WhatsUpp = () => {
  const [globalState, dispatch] = useContext(Store);
  const { chatroomId } = globalState;
  console.log("chatroomId is: ", chatroomId);

  console.log("chatroom boolean", chatroomId === true);

  return (
    <>
      <SidebarLayout />
      {chatroomId && <Chat chatroomId={chatroomId}/>}
      {/* <Private /> */}
    </>
  );
};

export default WhatsUpp;
