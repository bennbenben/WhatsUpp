// Import libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

// Import libraries for SideDrawer
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Input from "@mui/material/Input";

// Import libraries for Checkbox
import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Import internal components

const AddChatroom = () => {
  // For SideDrawer - adding chats
  const [displayUsers, setDisplayUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState("");
  const [state, setState] = useState({
    left: false,
  });

  // useEffectAPI call - Fetch all available users
  useEffect(() => {
    const listAvailableUsers = async () => {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const response = await axios.get(
        `/api/v1/chat/listUsers`,
        axiosConfig
      );
      // console.log("listAvailableUsers response is: ", response.data.usersList);
      response.data.usersList.map((userObject) => {
        setDisplayUsers((prevList) => {
          return [
            ...prevList,
            { userId: userObject._id, username: userObject.username },
          ];
        });
      });
    };
    listAvailableUsers();
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    console.log('toggle drawer happened')
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });

    if (open == false) {
      setSelectedUsers((prevState) => {
        return [];
      });
    }
  };

  const handleChecked = (e) => {
    // console.log('e.target.value', e.target.value)
    // console.log('e.target.checked', e.target.checked)
    
    // if user is checked
    if (e.target.checked) {
      console.log(`add ${e.target.value} to selectedList`)
      setSelectedUsers(prevList => {
        const userIndex = displayUsers.findIndex( object => object.username == e.target.value);
        console.log(`userIndex: ${userIndex}`);

        const userId = displayUsers[userIndex].userId
        console.log(`userId: ${userId}`);


        return [...prevList, {"userId": userId,"username": e.target.value}]
      })
    }
    
    // if user is unchecked
    if (!e.target.checked) {
      setSelectedUsers(prevList => {
        const deleteIndex = prevList.findIndex( object => object.username == e.target.value)
        console.log('Delete person index: ',deleteIndex)
        return prevList.filter( (person, index) => index !==deleteIndex )
      })
    }
  }

  const handleCreateChat = async (e) => {
    // Close drawer
    // Todo: Troubleshoot - why is SideDrawer not closing? stat is not updating
    toggleDrawer('left', false)(e)

    console.log('create chat request sent!')

    // Post request - to create Chat
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    const chatData = {
      "chatroom_name": chatName,
      "participants": selectedUsers
    };
    
    const response = await axios.post(`/api/v1/chat/`, chatData, axiosConfig);
    console.log("response is: ", response);
    
    // setInput("");
  }

  const list = () => (
    <Box
      sx={{ width: 270 }}
      role="presentation"
      // onClick={toggleDrawer('left', false)}
      // onKeyDown={toggleDrawer('left', false)}
    >
      <div>Selected Users: </div>
      {selectedUsers.map((user) => (
        <div key={user.username}>{user.username}</div>
      ))}
      <input
        placeholder="Enter group chat name"
        onChange={(event) => setChatName(event.target.value)}
      />
      <Button
        color="inherit"
        onClick={handleCreateChat}
        onKeyDown={toggleDrawer("left", false)}
      >
        Create Chat
      </Button>
      <Divider />
      <List>
        {displayUsers.map((text, index) => (
          <ListItem key={text.username} disablePadding>
            <ListItemButton>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label={text.username}
                  value={text.username}
                  onChange={handleChecked}
                />
              </FormGroup>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  // Todo: Search bar

  return (
    <>
      <IconButton onClick={toggleDrawer("left", true)}>
        <ChatIcon />
      </IconButton>
      <React.Fragment key={"left"}>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default AddChatroom;
